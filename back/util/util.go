package util

import (
	"log"
	"net/http"
	"time"
)

// HTTPLogger http requests
func HTTPLogger(h http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf("%s %s\n", r.Method, r.URL.Path)
		h.ServeHTTP(rw, r)
		log.Printf("%s\n", time.Since(start))
	})
}

func httpCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Add("Access-Control-Allow-Origin", "*")
		h.ServeHTTP(rw, r)
	})
}
