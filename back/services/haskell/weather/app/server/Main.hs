module Main where

import Database.MongoDB
import Control.Monad.Trans (liftIO)
import System.IO (hSetBuffering, stdout, BufferMode(NoBuffering))
import Configuration.Dotenv (loadFile, defaultConfig)

import Server (start)
import Config

main :: IO ()
main = do
    hSetBuffering stdout NoBuffering

    -- Load dotenv
    loadFile defaultConfig

    dbHost <- getDbHost
    pipe <- connect (host dbHost)
    start pipe
    close pipe

