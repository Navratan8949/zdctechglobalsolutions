const assert = require("node:assert/strict");
const test = require("node:test");
const registrationController = require("../src/controllers/registrationService.controller");
const RegistrationService = require("../src/models/RegistrationService");

test("RegistrationService model schema contains expected fields", () => {
  const paths = RegistrationService.schema.paths;
  assert.ok(paths.title, "Schema must have title");
  assert.ok(paths.slug, "Schema must have slug");
  assert.ok(paths.category, "Schema must have category");
  assert.ok(paths.shortDescription, "Schema must have shortDescription");
  assert.ok(paths.fullDescription, "Schema must have fullDescription");
  assert.ok(paths.governmentBody, "Schema must have governmentBody");
  assert.ok(paths.processingTime, "Schema must have processingTime");
  assert.ok(paths.fee, "Schema must have fee");
  assert.ok(paths.benefits, "Schema must have benefits");
  assert.ok(paths.documentsRequired, "Schema must have documentsRequired");
  assert.ok(paths.processSteps, "Schema must have processSteps");
  assert.ok(paths.isActive, "Schema must have isActive");
});

test("RegistrationService controller exports all CRUD methods", () => {
  assert.equal(typeof registrationController.getAll, "function");
  assert.equal(typeof registrationController.getAllAdmin, "function");
  assert.equal(typeof registrationController.getBySlug, "function");
  assert.equal(typeof registrationController.getOne, "function");
  assert.equal(typeof registrationController.create, "function");
  assert.equal(typeof registrationController.update, "function");
  assert.equal(typeof registrationController.delete, "function");
  assert.equal(typeof registrationController.seedDefaults, "function");
});

