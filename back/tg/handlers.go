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
		notifyNewDockerBuild()

		rw.WriteHeader(http.StatusNoContent)
	})
}
