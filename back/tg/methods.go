package tg

import (
	"log"

	"gopkg.in/telegram-bot-api.v4"
)

func notifyNewDockerBuild(projectName string) {
	var (
		msg tgbotapi.MessageConfig
		err error
	)

	msg = tgbotapi.NewMessage(int64(chatID), "New docker build from "+projectName+"!")

	if _, err = botAPI.Send(msg); err != nil {
		log.Print(err)
		return
	}
}

// notify error log
func notifyErrorLog(e string) {
	var (
		msg tgbotapi.MessageConfig
		err error
	)

	msg = tgbotapi.NewMessage(int64(chatID), e)

	if _, err = botAPI.Send(msg); err != nil {
		log.Println(err)
		return
	}
}
