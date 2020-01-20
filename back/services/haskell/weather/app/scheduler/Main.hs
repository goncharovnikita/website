{-# LANGUAGE ExtendedDefaultRules #-}
module Main where

import Database.MongoDB
import Control.Monad.Trans (liftIO)
import Data.Time (UTCTime, getCurrentTime)

import Domain
import Repo

main = do
    pipe <- connect (host "localhost")
    e <- access pipe master "website-weather" run
    close pipe
    print e

run :: Action IO ()
run = do
    w <- selectLastWeather
    liftIO $ print w
    return ()

getLastWeather :: Action IO ()
getLastWeather = do
    w <- liftIO $ createWeather 1 2 True
    insertWeather w
