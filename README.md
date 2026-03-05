# GitHub MCP Server

TypeScript MCP server for automating GitHub repository operations from AI agents.

## What this server does

- Lists repositories for the authenticated user
- Fetches repository details
- Creates repositories
- Updates repository settings
- Lists repository contents
- Deletes repositories
- Returns authenticated user profile data

## Tech stack

- Node.js
- TypeScript
- `@modelcontextprotocol/sdk`
- `@octokit/rest`
- Zod

## Quick start

```bash
git clone https://github.com/canburakyol/github-mcp-server.git
cd github-mcp-server
npm ci
```

Set your token:

```bash
# Linux/macOS
export GITHUB_TOKEN=your_personal_access_token

# Windows PowerShell
$env:GITHUB_TOKEN="your_personal_access_token"
```

Build and run:

```bash
npm run build
npm run start
```

## MCP configuration example

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

## Development commands

- `npm run dev`: TypeScript watch mode
- `npm test`: Compile and run unit tests
- `npm run check`: Full local verification

## Quality signals

- Unit tests for repository output mapping
- CI workflow on push and pull request (`.github/workflows/ci.yml`)
- `node_modules` and `build` excluded from version control
- MIT license included

## Security note

Use a minimum-scope GitHub PAT and rotate it regularly. Never commit tokens to source control.

## License

MIT