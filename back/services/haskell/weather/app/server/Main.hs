module Main where

import Database.MongoDB
import Control.Monad.Trans (liftIO)
import System.Environment (lookupEnv)

import Server (start)

main :: IO ()
main = do
    dbHost <- getDbHost
    pipe <- connect (host dbHost)
    start pipe
    close pipe

getDbHost :: IO (String)
getDbHost = do
    let dbHostEnvName = "DB_HOST"
    mbStr <- lookupEnv dbHostEnvName
    case mbStr of 
      Just str -> return str
      Nothing -> do
          putStrLn $ mconcat [dbHostEnvName, " env variable does not exists, falling back to localhost"]
          return "localhost"
