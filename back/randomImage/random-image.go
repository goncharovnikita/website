package randomImage

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"

	w "github.com/goncharovnikita/wallpaperize/api"

	u "../util"
)

// Handler handler
func Handler() http.Handler {
	return http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		var (
			imageName = "__rnd_img.png"
			result    []byte
			err       error
			file      *os.File
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

			if file, err = os.OpenFile("./.cache/"+imageName, os.O_CREATE|os.O_RDWR, 0666); err != nil {
				log.Print(err)
				return
			}

			defer file.Close()

			if _, err = file.Write(result); err != nil {
				log.Print(err)
				return
			}
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
