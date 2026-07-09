import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const pairs = [
  ["storage-report.example.json", "storage-report.schema.json"],
  ["classification-report.example.json", "classification-report.schema.json"],
  ["recommendation-report.example.json", "recommendation-report.schema.json"],
  ["decision-report.example.json", "decision-report.schema.json"],
  ["simulation-report.example.json", "simulation-report.schema.json"],
  ["audit-report.example.json", "audit-report.schema.json"]
];

const expectedExamples = new Set(pairs.map(([exampleName]) => exampleName));

function formatPath(filePath) {
  return path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
}

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  if (Number.isInteger(value)) return "integer";
  return typeof value;
}

function resolveRef(schemaRoot, ref) {
  if (!ref.startsWith("#/")) {
    throw new Error(`Unsupported external schema reference: ${ref}`);
  }

  return ref
    .slice(2)
    .split("/")
    .reduce((current, segment) => current?.[segment], schemaRoot);
}

function validate(value, schema, schemaRoot, location = "$") {
  const errors = [];
  const activeSchema = schema.$ref ? resolveRef(schemaRoot, schema.$ref) : schema;

  if (!activeSchema) {
    return [`${location}: unresolved schema reference`];
  }

  if (activeSchema.type) {
    const actualType = typeOf(value);
    if (actualType !== activeSchema.type) {
      return [`${location}: expected ${activeSchema.type}, got ${actualType}`];
    }
  }

  if (activeSchema.enum && !activeSchema.enum.includes(value)) {
    errors.push(`${location}: expected one of ${activeSchema.enum.join(", ")}`);
  }

  if (activeSchema.type === "integer" && activeSchema.minimum !== undefined && value < activeSchema.minimum) {
    errors.push(`${location}: must be >= ${activeSchema.minimum}`);
  }

  if (activeSchema.type === "string" && activeSchema.format === "date-time") {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      errors.push(`${location}: expected date-time string`);
    }
  }

  if (activeSchema.type === "array") {
    if (activeSchema.minItems !== undefined && value.length < activeSchema.minItems) {
      errors.push(`${location}: must contain at least ${activeSchema.minItems} item(s)`);
    }

    if (activeSchema.items) {
      value.forEach((item, index) => {
        errors.push(...validate(item, activeSchema.items, schemaRoot, `${location}[${index}]`));
      });
    }
  }

  if (activeSchema.type === "object") {
    const required = activeSchema.required ?? [];
    for (const property of required) {
      if (!Object.hasOwn(value, property)) {
        errors.push(`${location}.${property}: missing required property`);
      }
    }

    const properties = activeSchema.properties ?? {};
    for (const [property, propertyValue] of Object.entries(value)) {
      if (properties[property]) {
        errors.push(...validate(propertyValue, properties[property], schemaRoot, `${location}.${property}`));
      } else if (activeSchema.additionalProperties === false) {
        errors.push(`${location}.${property}: additional property is not allowed`);
      }
    }
  }

  return errors;
}

let hasFailure = false;

const examplesDir = path.join(repoRoot, "examples");
const discoveredExamples = (await readdir(examplesDir)).filter((name) => name.endsWith(".example.json"));

for (const exampleName of discoveredExamples) {
  if (!expectedExamples.has(exampleName)) {
    const schemaName = exampleName.replace(".example.json", ".schema.json");
    pairs.push([exampleName, schemaName]);
  }
}

for (const [exampleName, schemaName] of pairs) {
  const examplePath = path.join(repoRoot, "examples", exampleName);
  const schemaPath = path.join(repoRoot, "schemas", schemaName);

  if (!existsSync(examplePath)) {
    hasFailure = true;
    console.error(`Missing example: ${formatPath(examplePath)}`);
    continue;
  }

  if (!existsSync(schemaPath)) {
    hasFailure = true;
    console.error(`Missing schema: ${formatPath(schemaPath)}`);
    continue;
  }

  try {
    const [example, schema] = await Promise.all([readJson(examplePath), readJson(schemaPath)]);
    const errors = validate(example, schema, schema);

    if (errors.length === 0) {
      console.log(`PASS ${exampleName} -> ${schemaName}`);
    } else {
      hasFailure = true;
      console.error(`FAIL ${exampleName} -> ${schemaName}`);
      for (const error of errors) {
        console.error(`  - ${error}`);
      }
    }
  } catch (error) {
    hasFailure = true;
    console.error(`FAIL ${exampleName} -> ${schemaName}`);
    console.error(`  - ${error.message}`);
  }
}

process.exitCode = hasFailure ? 1 : 0;
