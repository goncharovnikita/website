package main

import (
	"encoding/json"
	"log"
	"net/http"

	feed "./feed"
	rnd "./randomImage"
	util "./util"
)

func serve(port string) {
	var (
		mux *http.ServeMux
	)

	log.Printf("Server listening on %s\n", port)

	mux = http.NewServeMux()
	mux.Handle("/api/v1/", util.HTTPCORS(util.HTTPLogger(http.StripPrefix("/api/v1", apiHandler()))))

	log.Print(http.ListenAndServe(port, mux))
}

func apiHandler() (result http.Handler) {
	mux := http.NewServeMux()
	mux.Handle("/get/medium/feed", handleGetMediumFeed())
	mux.Handle("/get/git/repos", handleGetGitRepos())
	mux.Handle("/get/random/image", rnd.Handler())
	mux.Handle("/refresh/random/image", rnd.RefreshHandler())

	result = mux

	return
}

func handleGetMediumFeed() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		rw.Header().Add("Access-Control-Allow-Origin", "*")
		var status int
		if req.Method != http.MethodGet {
			status = http.StatusMethodNotAllowed
			rw.WriteHeader(status)
			return
		}

		var (
			err      error
			result   feed.MediumFeed
			response []byte
		)

		if result, err = feed.GetMediumFeed(); err != nil {
			log.Print(err)
			status = http.StatusInternalServerError
			rw.WriteHeader(status)
			return
		}

		if response, err = json.Marshal(result); err != nil {
			log.Print(err)
			status = http.StatusInternalServerError
			rw.WriteHeader(status)
			return
		}

		rw.Header().Add("content-type", "application/json")

		rw.Write(response)
	})
}

func handleGetGitRepos() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		rw.Header().Add("Access-Control-Allow-Origin", "*")
		var status int
		if req.Method != http.MethodGet {
			status = http.StatusMethodNotAllowed
			rw.WriteHeader(status)
			return
		}

		var (
			err      error
			result   []feed.GitRepo
			response []byte
		)

		if result, err = feed.GetGitRepos(); err != nil {
			log.Print(err)
			status = http.StatusInternalServerError
			rw.WriteHeader(status)
			return
		}

		if response, err = json.Marshal(result); err != nil {
			log.Print(err)
			status = http.StatusInternalServerError
			rw.WriteHeader(status)
			return
		}

		rw.Header().Add("content-type", "application/json")

		rw.Write(response)
	})
}
