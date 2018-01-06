package util

import (
	"log"
	"net/http"
	"os"
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

// HTTPCORS cors
func HTTPCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		rw.Header().Add("Access-Control-Allow-Origin", "*")
		h.ServeHTTP(rw, r)
	})
}

// CreateDir create dir
func CreateDir(name string) (err error) {
	if err = os.Mkdir(name, 0777); err != nil {
		if _, ok := err.(*os.PathError); !ok {
			return err
		}
		err = nil
	}
	return
}
