import { RestEndpointMethodTypes } from "@octokit/rest";

type ListedRepository =
  RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"][number];
type RepositoryDetails = RestEndpointMethodTypes["repos"]["get"]["response"]["data"];

export function mapRepositoryListItem(repo: ListedRepository) {
  return {
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
  };
}

export function mapRepositoryDetails(data: RepositoryDetails) {
  return {
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
}
