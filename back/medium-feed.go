package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

const (
	rssURL       = "https://medium.com/feed/@cashalot"
	rssToJSONURL = "https://api.rss2json.com/v1/api.json"
)

type mediumFeedUnit struct {
	Title       string `json:"title"`
	PubDate     string `json:"pubDate"`
	Description string `json:"description"`
	Link        string `json:"link"`
}

type mediumFeed struct {
	Status string           `json:"status"`
	Items  []mediumFeedUnit `json:"items"`
}

func getMediumFeed() (result mediumFeed, err error) {
	var (
		response *http.Response
		body     []byte
	)

	if response, err = http.Get(rssToJSONURL + "?rss_url=" + rssURL); err != nil {
		log.Print(err)
		return
	}

	defer response.Body.Close()

	if body, err = ioutil.ReadAll(response.Body); err != nil {
		log.Print(err)
		return
	}

	if err = json.Unmarshal(body, &result); err != nil {
		log.Print(err)
		return
	}

	return
}
