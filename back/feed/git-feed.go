package feed

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

const (
	gitAPIURL      = "https://api.github.com/"
	getGitReposURL = "users/goncharovnikita/repos"
)

// GitRepo type
type GitRepo struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	FullName string `json:"full_name"`
	Owner    struct {
		Login     string `json:"login"`
		ID        int    `json:"id"`
		AvatarURL string `json:"avatar_url"`
	} `json:"owner"`
	HTMLURL         string `json:"html_url"`
	Description     string `json:"description"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
	PushedAt        string `json:"pushed_at"`
	Language        string `json:"language"`
	StargazersCount int    `json:"stargazers_count"`
	WatchersCount   int    `json:"watchers_count"`
}

// GetGitRepos return git repos list
func GetGitRepos() (result []GitRepo, err error) {
	var (
		httpClient = &http.Client{}
		request    *http.Request
		response   *http.Response
		body       []byte
	)

	if request, err = http.NewRequest("GET", gitAPIURL+getGitReposURL, nil); err != nil {
		return
	}

	request.Header.Add("Accept", "application/vnd.github.v3+json")

	if response, err = httpClient.Do(request); err != nil {
		return
	}

	defer response.Body.Close()

	if body, err = ioutil.ReadAll(response.Body); err != nil {
		return
	}

	if err = json.Unmarshal(body, &result); err != nil {
		return
	}

	return
}
