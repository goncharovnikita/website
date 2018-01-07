package tg

import (
	"log"
	"os"
	"strconv"

	"gopkg.in/telegram-bot-api.v4"
)

var (
	tgToken      = os.Getenv("TG_TOKEN")
	chatIDString = os.Getenv("TG_CHAT_ID")
	chatID       int
	botAPI       *tgbotapi.BotAPI
	updates      tgbotapi.UpdatesChannel
)

func init() {
	go initialize()
}

func initialize() {
	var err error
	if botAPI, err = tgbotapi.NewBotAPI(tgToken); err != nil {
		log.Print(err)
		return
	}

	if chatID, err = strconv.Atoi(chatIDString); err != nil {
		log.Print(err)
		return
	}

	log.Printf("Bot started!\n")
	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	if updates, err = botAPI.GetUpdatesChan(u); err != nil {
		log.Print(err)
		return
	}
}

func echo() {
	var (
		msg tgbotapi.MessageConfig
	)

	msg = tgbotapi.NewMessage(int64(chatID), "Echo")

	botAPI.Send(msg)
}
