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
import qualified Data.Text as T
import Web.Scotty

import Domain
import Repo
import WeatherGetter
import Config

main = do
    hSetBuffering stdout NoBuffering
    apiKey <- getEnv "YANDEX_API_KEY"
    dbHost <- getDbHost
    requestWeatherUrl <- getEnvVarSafe "REQUEST_WEATHER_URL" "http://localhost:8080/weather.dump.json"
    cronRaw <- fmap T.pack $ getEnvVarSafe "CRON_RAW" "* * * * *"
    pipe <- connect (host dbHost)
    tids <- execSchedule $ do
        addJob (updateWeatherJob pipe apiKey requestWeatherUrl) cronRaw
    scotty 3000 $
        get "/healthcheck" $ html "ok"

neverEnd = neverEnd

updateWeatherJob :: Pipe -> APIKey -> RequestWeatherURL -> IO ()
updateWeatherJob pipe apiKey requestWeatherUrl = do
    putStrLn "Fetching weather..."
    w <- requestWeather apiKey requestWeatherUrl
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
    
