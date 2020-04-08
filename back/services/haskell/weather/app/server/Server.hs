module Server where

import Web.Scotty
import Database.MongoDB (Pipe)
import Control.Monad.Trans (liftIO)
import Data.Time.Clock (getCurrentTime, addUTCTime, nominalDay)

import Domain
import qualified Repo

start :: Pipe -> IO ()
start pipe = scotty 3000 $ do
    get "/" $ getLastWeather pipe
    get "/history" $ getWeather pipe

getLastWeather :: Pipe -> ActionM ()
getLastWeather pipe = do
    w <- liftIO $ Repo.getLastWeather pipe
    case w of
      Just weather -> json weather
      Nothing -> html "500. Could not get weather"


getWeather :: Pipe -> ActionM ()
getWeather pipe = do
    dtTo <- liftIO $ getCurrentTime
    let dtFrom = addUTCTime (-nominalDay * 6) dtTo
        dts = (dtFrom, dtTo)
    w <- liftIO $ Repo.getWeather pipe dts

    json w
