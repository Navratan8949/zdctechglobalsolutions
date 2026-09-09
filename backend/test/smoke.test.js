const assert = require("node:assert/strict");
const test = require("node:test");
const app = require("../src/app");

test("Express app loads with the expected API route groups", () => {
  const router = app.router || app._router;
  const mountedRouters =
    router?.stack?.filter((layer) => layer.name === "router") || [];

  assert.equal(typeof app, "function");
  assert.ok(router, "Express router should be available");
  assert.equal(mountedRouters.length, 19);
});

test("registered route modules expose routes", () => {
  const routeFiles = [
    "auth",
    "testimonial",
    "contact",
    "team",
    "siteContent",
    "blog",
    "caseStudy",
    "service",
    "portfolio",
    "job",
    "jobApplication",
    "client",
    "industry",
    "technology",
    "faq",
    "subscriber",
  ];

  for (const routeFile of routeFiles) {
    const route = require(`../src/routes/${routeFile}.routes`);
    assert.ok(route.stack?.length, `${routeFile} route module has no routes`);
  }
});
