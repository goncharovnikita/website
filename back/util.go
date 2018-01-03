package main

import (
	"log"
	"net/http"
	"time"
)

func httpLogger(h http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf("%s %s\n", r.Method, r.URL.Path)
		h.ServeHTTP(rw, r)
		log.Printf("%s\n", time.Since(start))
	})
}
