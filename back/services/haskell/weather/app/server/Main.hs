module Main where

import Database.MongoDB
import Control.Monad.Trans (liftIO)

import Server (start)
import Config

main :: IO ()
main = do
    dbHost <- getDbHost
    pipe <- connect (host dbHost)
    start pipe
    close pipe

