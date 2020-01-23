{-# LANGUAGE ExtendedDefaultRules #-}
module Main where

import Control.Monad.IO.Class
import Control.Monad
import System.Environment (getEnv)
import Control.Concurrent
import System.Exit
import Data.Char (toLower)
import System.IO
import Database.MongoDB
import System.Cron

import Domain
import Repo
import WeatherGetter

main = do
    apiKey <- getEnv "YANDEX_API_KEY"
    pipe <- connect (host "localhost")
    tids <- execSchedule $ do
        addJob (updateWeatherJob pipe apiKey) "* * * * *"
    exitOnQ $ close pipe

updateWeatherJob :: Pipe -> APIKey -> IO ()
updateWeatherJob pipe apiKey = do
    putStrLn "Fetching weather..."
    w <- requestWeather apiKey
    putStrLn "Weather fetched successfully"
    putStrLn "Inserting weather to db"
    insertWeather pipe w
    putStrLn "Weather inserted successfully"


exitOnQ :: IO () -> IO ()
exitOnQ cb = do
    hSetBuffering stdin NoBuffering
    c <- getChar
    when (toLower c /= 'q') $ exitOnQ cb
    cb
    exitSuccess
    
