module Main where

import Database.MongoDB
import Control.Monad.Trans (liftIO)
import System.IO (hSetBuffering, stdout, BufferMode(NoBuffering))
import Configuration.Dotenv (loadFile, onMissingFile, defaultConfig)

import Server (start)
import Config

main :: IO ()
main = do
    hSetBuffering stdout NoBuffering

    dbHost <- getDbHost
    pipe <- connect (host dbHost)
    start pipe
    close pipe

loadDotenv = do
    onMissingFile (loadFile defaultConfig) $ do
        putStrLn "No .env file found"
        return []
