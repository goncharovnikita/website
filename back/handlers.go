package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func serve(port string) {
	var (
		mux *http.ServeMux
	)

	log.Printf("Server listening on %s\n", port)

	mux = http.NewServeMux()
	mux.Handle("/api/v1/", httpCORS(httpLogger(http.StripPrefix("/api/v1/", apiHandler(mux)))))

	log.Print(http.ListenAndServe(port, mux))
}

func apiHandler(mux *http.ServeMux) (result http.Handler) {
	mux.Handle("/get/medium/feed", handleGetMediumFeed())

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
			result   mediumFeed
			response []byte
		)

		if result, err = getMediumFeed(); err != nil {
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
