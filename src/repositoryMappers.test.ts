import assert from "node:assert/strict";
import test from "node:test";
import { mapRepositoryDetails, mapRepositoryListItem } from "./repositoryMappers.js";

test("mapRepositoryListItem keeps client-facing fields stable", () => {
  const input = {
    id: 42,
    name: "demo",
    full_name: "can/demo",
    description: "Demo repository",
    private: false,
    html_url: "https://github.com/can/demo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
    pushed_at: "2026-01-03T00:00:00Z",
    language: "TypeScript",
    stargazers_count: 7,
    forks_count: 2,
    open_issues_count: 1,
    visibility: "public",
  } as any;

  assert.deepEqual(mapRepositoryListItem(input), {
    id: 42,
    name: "demo",
    full_name: "can/demo",
    description: "Demo repository",
    private: false,
    html_url: "https://github.com/can/demo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
    pushed_at: "2026-01-03T00:00:00Z",
    language: "TypeScript",
    stargazers_count: 7,
    forks_count: 2,
    open_issues_count: 1,
    visibility: "public",
  });
});

test("mapRepositoryDetails returns the expected detail surface", () => {
  const input = {
    id: 99,
    name: "mcp",
    full_name: "can/mcp",
    description: "MCP server",
    private: true,
    html_url: "https://github.com/can/mcp",
    homepage: "https://example.com",
    language: "JavaScript",
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-02T00:00:00Z",
    pushed_at: "2026-02-03T00:00:00Z",
    stargazers_count: 3,
    watchers_count: 5,
    forks_count: 1,
    open_issues_count: 0,
    default_branch: "main",
    visibility: "private",
    topics: ["mcp", "github"],
    has_issues: true,
    has_projects: false,
    has_wiki: true,
    archived: false,
    disabled: false,
  } as any;

  assert.deepEqual(mapRepositoryDetails(input), {
    id: 99,
    name: "mcp",
    full_name: "can/mcp",
    description: "MCP server",
    private: true,
    html_url: "https://github.com/can/mcp",
    homepage: "https://example.com",
    language: "JavaScript",
    created_at: "2026-02-01T00:00:00Z",
    updated_at: "2026-02-02T00:00:00Z",
    pushed_at: "2026-02-03T00:00:00Z",
    stargazers_count: 3,
    watchers_count: 5,
    forks_count: 1,
    open_issues_count: 0,
    default_branch: "main",
    visibility: "private",
    topics: ["mcp", "github"],
    has_issues: true,
    has_projects: false,
    has_wiki: true,
    archived: false,
    disabled: false,
  });
});
