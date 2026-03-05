# GitHub MCP Server 🤖

A Model Context Protocol (MCP) server that empowers AI Agents (like Cursor, Claude, and Copilot) to seamlessly interact with GitHub repositories.

This server provides tools to list, view, create, update, and completely manage GitHub infrastructure directly through semantic LLM prompts.

## Features

- 📂 **Manage Repositories:** Create, delete, and list repositories dynamically.
- 📝 **Content Retrieval:** Read file structures and content directly from GitHub branches.
- ⚙️ **Project Configuration:** Manage repository settings, visibility, and features.
- 🔒 **Type-Safe:** Fully typed with TypeScript and Zod schema validation.

## Prerequisites

- Node.js >= 18.0.0
- A GitHub Personal Access Token (PAT) with repository scopes.

## Installation

```bash
# Clone the repository
git clone https://github.com/canburakyol/github-mcp-server.git
cd github-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

Set your `GITHUB_TOKEN` environment variable before running the server:

```bash
export GITHUB_TOKEN=your_personal_access_token
```

To run the MCP server:
```bash
node build/index.js
```

### Integration with Cursor

To use this with Cursor's MCP features, add the following to your MCP configuration:

```json
{
  "github-server": {
    "command": "node",
    "args": ["/absolute/path/to/github-mcp-server/build/index.js"],
    "env": {
      "GITHUB_TOKEN": "your_personal_access_token"
    }
  }
}
```

## Available Tools

The server exposes the following MCP tools to your AI agent:

- `list_repositories`: Filter, sort, and search your GitHub repos.
- `get_repository`: Fetch detailed metadata for a specific repository.
- `create_repository`: Initialize new projects with templates.
- `update_repository`: Change repository settings dynamically.
- `list_contents`: Read files and directory structures.
- `delete_repository`: Completely remove a repository.
- `get_authenticated_user`: Retrieve profile data context.

## License

MIT
