#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Octokit } from "@octokit/rest";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is required');
}
const octokit = new Octokit({
    auth: GITHUB_TOKEN,
});
// Create an MCP server
const server = new McpServer({
    name: "github-server",
    version: "1.0.0"
});
// Tool: List user repositories
server.tool("list_repositories", {
    type: z.enum(["owner", "member", "all"]).optional().describe("Filter by ownership"),
    sort: z.enum(["created", "updated", "pushed", "full_name"]).optional().describe("Sort field"),
    direction: z.enum(["asc", "desc"]).optional().describe("Sort direction"),
    per_page: z.number().min(1).max(100).optional().describe("Results per page (1-100)"),
}, async ({ type = "owner", sort = "updated", direction = "desc", per_page = 30 }) => {
    try {
        const { data } = await octokit.rest.repos.listForAuthenticatedUser({
            type,
            sort,
            direction,
            per_page,
        });
        const repos = data.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            private: repo.private,
            html_url: repo.html_url,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            pushed_at: repo.pushed_at,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            open_issues_count: repo.open_issues_count,
            visibility: repo.visibility,
        }));
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(repos, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Tool: Get repository details
server.tool("get_repository", {
    owner: z.string().describe("Repository owner"),
    repo: z.string().describe("Repository name"),
}, async ({ owner, repo }) => {
    try {
        const { data } = await octokit.rest.repos.get({
            owner,
            repo,
        });
        const repoDetails = {
            id: data.id,
            name: data.name,
            full_name: data.full_name,
            description: data.description,
            private: data.private,
            html_url: data.html_url,
            homepage: data.homepage,
            language: data.language,
            created_at: data.created_at,
            updated_at: data.updated_at,
            pushed_at: data.pushed_at,
            stargazers_count: data.stargazers_count,
            watchers_count: data.watchers_count,
            forks_count: data.forks_count,
            open_issues_count: data.open_issues_count,
            default_branch: data.default_branch,
            visibility: data.visibility,
            topics: data.topics,
            has_issues: data.has_issues,
            has_projects: data.has_projects,
            has_wiki: data.has_wiki,
            archived: data.archived,
            disabled: data.disabled,
        };
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(repoDetails, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Tool: Create a repository
server.tool("create_repository", {
    name: z.string().describe("Repository name"),
    description: z.string().optional().describe("Repository description"),
    private: z.boolean().optional().describe("Whether the repository is private"),
    auto_init: z.boolean().optional().describe("Initialize with a README"),
    gitignore_template: z.string().optional().describe("Gitignore template name"),
    license_template: z.string().optional().describe("License template"),
}, async ({ name, description, private: isPrivate = false, auto_init, gitignore_template, license_template }) => {
    try {
        const { data } = await octokit.rest.repos.createForAuthenticatedUser({
            name,
            description,
            private: isPrivate,
            auto_init,
            gitignore_template,
            license_template,
        });
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        id: data.id,
                        name: data.name,
                        full_name: data.full_name,
                        html_url: data.html_url,
                        clone_url: data.clone_url,
                        ssh_url: data.ssh_url,
                    }, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Tool: Update a repository
server.tool("update_repository", {
    owner: z.string().describe("Repository owner"),
    repo: z.string().describe("Repository name"),
    name: z.string().optional().describe("New repository name"),
    description: z.string().optional().describe("New description"),
    private: z.boolean().optional().describe("Change visibility"),
    homepage: z.string().optional().describe("Homepage URL"),
    has_issues: z.boolean().optional().describe("Enable/disable issues"),
    has_wiki: z.boolean().optional().describe("Enable/disable wiki"),
    archived: z.boolean().optional().describe("Archive/unarchive repository"),
}, async ({ owner, repo, ...updates }) => {
    try {
        const { data } = await octokit.rest.repos.update({
            owner,
            repo,
            ...updates,
        });
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        id: data.id,
                        name: data.name,
                        full_name: data.full_name,
                        description: data.description,
                        private: data.private,
                        html_url: data.html_url,
                    }, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Tool: List repository contents
server.tool("list_contents", {
    owner: z.string().describe("Repository owner"),
    repo: z.string().describe("Repository name"),
    path: z.string().optional().describe("Path to list (default: root)"),
    ref: z.string().optional().describe("Branch, tag, or commit SHA"),
}, async ({ owner, repo, path = "", ref }) => {
    try {
        const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref,
        });
        const contents = Array.isArray(data)
            ? data.map(item => ({
                name: item.name,
                path: item.path,
                type: item.type,
                size: item.size,
                html_url: item.html_url,
                download_url: item.download_url,
            }))
            : {
                name: data.name,
                path: data.path,
                type: data.type,
                size: data.size,
                content: 'content' in data ? data.content : undefined,
                html_url: data.html_url,
                download_url: data.download_url,
            };
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(contents, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Tool: Get authenticated user info
server.tool("get_authenticated_user", {}, async () => {
    try {
        const { data } = await octokit.rest.users.getAuthenticated();
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({
                        login: data.login,
                        id: data.id,
                        avatar_url: data.avatar_url,
                        html_url: data.html_url,
                        name: data.name,
                        company: data.company,
                        blog: data.blog,
                        location: data.location,
                        email: data.email,
                        bio: data.bio,
                        public_repos: data.public_repos,
                        public_gists: data.public_gists,
                        followers: data.followers,
                        following: data.following,
                        created_at: data.created_at,
                    }, null, 2),
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Tool: Delete a repository
server.tool("delete_repository", {
    owner: z.string().describe("Repository owner"),
    repo: z.string().describe("Repository name"),
}, async ({ owner, repo }) => {
    try {
        await octokit.rest.repos.delete({
            owner,
            repo,
        });
        return {
            content: [
                {
                    type: "text",
                    text: `Repository ${owner}/${repo} has been deleted successfully.`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `GitHub API error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('GitHub MCP server running on stdio');
//# sourceMappingURL=index.js.map