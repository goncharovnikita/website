{-# LANGUAGE ExtendedDefaultRules, DuplicateRecordFields #-}
module Repo (getWeather, getLastWeather, insertWeather, removeWeatherSince) where

import Database.MongoDB
import Control.Monad.Trans (liftIO, MonadIO)
import Data.Time.Clock (UTCTime)

import Prelude hiding (lookup)

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

getWeather :: Pipe -> (UTCTime, UTCTime) -> IO [AvgWeather]
getWeather pipe dts = withPipe pipe $ do
    w <- aggregate "weather" $ buildGetWeatherPipeline dts

    return $ fmap buildAvgWeatherRecordSafe w

buildGetWeatherPipeline :: (UTCTime, UTCTime) -> Pipeline
buildGetWeatherPipeline (dtFrom, dtTo) =
    [
        [
            "$match" =: ["dt" =: ["$gte" =: dtFrom, "$lte" =: dtTo]]
        ]
    ,   ["$group" =: ["_id" =: ["$dateToString" =: ["date" =: "$dt", "format" =: "%Y-%m-%d"]], "tAvg" =: ["$avg" =: ["$sum" =: ["$t_int", "$t_fl"]]]]]
    ,   ["$project" =: ["_id" =: ["$dateFromString" =: ["dateString" =: "$_id", "format" =: "%Y-%m-%d"]], "tAvg" =: 1]]
    ,   ["$sort" =: ["_id" =: -1]]
    ]

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


buildAvgWeatherRecordSafe :: Document -> AvgWeather
buildAvgWeatherRecordSafe doc =
    AvgWeather {
      dt = typed $ (valueAt "_id" doc)
    , tAvg = typed $ (valueAt "tAvg" doc)
    }


insertWeather :: Pipe -> Weather -> IO ()
insertWeather pipe (Weather tId tInt tFl upZero dt) = do
    withPipe pipe $ do
        insert_ "weather" ["_id" =: tId, "t_int" =: tInt, "t_fl" =: tFl, "up_zero" =: upZero, "dt" =: dt]

removeWeatherSince :: Pipe -> UTCTime -> IO ()
removeWeatherSince pipe dt = do
    withPipe pipe $ do
        delete (select (weatherSinceSelector dt) "weather")

weatherSinceSelector :: UTCTime -> Selector
weatherSinceSelector dt = [ "dt" =: [ "$lte" =: dt ] ]
