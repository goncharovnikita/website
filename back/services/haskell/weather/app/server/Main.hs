module Main where

import Database.MongoDB
import Control.Monad.Trans (liftIO)

import Server (start)

main :: IO ()
main = do
    pipe <- connect (host "localhost")
    start pipe
    close pipe
