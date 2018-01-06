package randomImage

import (
	"log"
	"os"

	u "../util"
)

func writeCache(cache []byte) (err error) {
	var (
		file *os.File
	)

	if err = u.CreateDir(".cache"); err != nil {
		log.Print(err)
		return
	}

	if file, err = os.OpenFile("./.cache/"+imageName, os.O_CREATE|os.O_RDWR, 0666); err != nil {
		log.Print(err)
		return
	}

	defer file.Close()

	if _, err = file.Write(cache); err != nil {
		log.Print(err)
		return
	}
	return
}
