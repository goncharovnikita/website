package tg

import (
	"log"

	"gopkg.in/telegram-bot-api.v4"
)

func notifyNewDockerBuild() {
	var (
		msg tgbotapi.MessageConfig
		err error
	)

	msg = tgbotapi.NewMessage(int64(chatID), "New docker build!")

	if _, err = botAPI.Send(msg); err != nil {
		log.Print(err)
		return
	}
}
