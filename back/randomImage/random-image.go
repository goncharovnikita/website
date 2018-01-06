package randomImage

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"

	w "github.com/goncharovnikita/wallpaperize/api"

	u "../util"
)

var imageName = "__rnd_img.png"

// Handler handler
func Handler() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		var (
			result []byte
			err    error
			file   *os.File
		)

		rw.Header().Add("Access-Control-Allow-Origin", "*")

		if err = u.CreateDir(".cache"); err != nil {
			rw.WriteHeader(500)
			log.Print(err)
			return
		}

		if file, err = os.OpenFile("./.cache/"+imageName, os.O_RDONLY, 0666); err != nil {
			if _, ok := err.(*os.PathError); !ok {
				rw.WriteHeader(500)
				log.Print(err)
				return
			}

			var (
				unsplashAPI w.UnsplashAPI
			)

			if result, err = unsplashAPI.GetRandomImage(); err != nil {
				rw.WriteHeader(500)
				log.Print(err)
				return
			}

			rw.Write(result)

			writeCache(result)
			return
		}

		defer file.Close()

		if result, err = ioutil.ReadAll(file); err != nil {
			rw.WriteHeader(500)
			log.Print(err)
			return
		}

		rw.Write(result)
	})
}

// RefreshHandler refreshHandler
func RefreshHandler() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		var (
			result      []byte
			err         error
			unsplashAPI w.UnsplashAPI
		)
		rw.Header().Add("Access-Control-Allow-Origin", "*")
		if result, err = unsplashAPI.GetRandomImage(); err != nil {
			rw.WriteHeader(500)
			log.Print(err)
			return
		}

		if err = writeCache(result); err != nil {
			rw.WriteHeader(500)
			log.Print(err)
			return
		}

		rw.WriteHeader(http.StatusNoContent)
	})
}
