package main

import (
	"log"

	_ "./tg"
)

func init() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
}

func main() {
	serve(":8080")
}
