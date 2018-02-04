package tg

import (
	"net/http"
)

/**
* This file contains triggers
 */

// NewDockerBuildHandler handler
func NewDockerBuildHandler() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		projectName := r.URL.Query().Get("project_name")

		if len(projectName) < 1 {
			projectName = "unknown"
		}

		notifyNewDockerBuild(projectName)

		rw.WriteHeader(http.StatusNoContent)
	})
}

// ErrorLogHandler handler
func ErrorLogHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logMSG := r.URL.Query().Get("error_message")

		if len(logMSG) < 1 {
			w.WriteHeader(400)
			return
		}

		notifyErrorLog(logMSG)

		w.WriteHeader(204)
	})
}
