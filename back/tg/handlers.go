package tg

import (
	"encoding/json"
	"log"
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

		if r.Method != http.MethodPost {
			w.WriteHeader(405)
			return
		}

		var params struct{ ErrorMessage string `json:"error_message"` }
		var err error

		defer r.Body.Close()

		if err = json.NewDecoder(r.Body).Decode(&params); err != nil {
			w.WriteHeader(500)
			log.Println(err)
			return
		}

		notifyErrorLog(params.ErrorMessage)

		w.WriteHeader(204)
	})
}
