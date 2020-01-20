{-# LANGUAGE ExtendedDefaultRules #-}
module Repo where

import Database.MongoDB
import Control.Monad.Trans (liftIO, MonadIO)

import Domain

withPipe :: (MonadIO m) => Pipe -> Action m a -> m a
withPipe pipe act = do
    access pipe master "website-weather" act

getLastWeather :: Pipe -> IO (Maybe Weather)
getLastWeather pipe = do
    withPipe pipe $ do
        w <- findOne (select [] "weather") {
                sort = ["dt" =: -1]
              , project = ["t_int" =: 1, "t_fl" =: 1, "up_zero" =: 1, "dt" =: 1]
                                           }
        buildWeatherRecord w

buildWeatherRecord :: Maybe Document -> Action IO (Maybe Weather)
buildWeatherRecord w = do
    case w of
      Just [wId, tInt, tFl, upZero, dt] -> return $ Just $ Weather {
          wId = typed $ value wId
        , tInt = typed $ value tInt
        , tFl = typed $ value tFl
        , upZero = typed $ value upZero
        , dt = typed $ value dt }
      Just unt -> do
          liftIO $ putStrLn $ show $ unt
          return Nothing
      Nothing -> return Nothing


insertWeather :: Weather -> Action IO ()
insertWeather (Weather tId tInt tFl upZero dt) = do
    insert_ "weather" ["_id" =: tId, "t_int" =: tInt, "t_fl" =: tFl, "up_zero" =: upZero, "dt" =: dt]
