module Server where

import Web.Scotty
import Database.MongoDB (Pipe)
import Control.Monad.Trans (liftIO)

import Domain
import Repo

start :: Pipe -> IO ()
start pipe = scotty 3000 $
    get "/" $ getWeather pipe

getWeather :: Pipe -> ActionM ()
getWeather pipe = do
    w <- liftIO $ getLastWeather pipe
    case w of
      Just weather -> json weather
      Nothing -> html "500. Could not get weather"
