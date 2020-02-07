{-# LANGUAGE DeriveGeneric #-}
module Domain where

import Data.Bson (ObjectId, genObjectId)
import Data.Time (UTCTime, getCurrentTime)
import Data.Aeson
import Data.ByteString.Lazy (ByteString)
import GHC.Generics

import qualified Data.Text as T

-- Common
instance FromJSON ObjectId where
    parseJSON = withText "ObjectId" $ (return . read . T.unpack)

-- RunStat
data Month = Month {
        year :: Int
      , month :: Int
      , day :: Int
      } deriving (Show, Generic)

data RunStat = RunStat {
        totalKm :: Int
      } deriving (Show, Generic)

instance FromJSON RunStat

instance ToJSON RunStat where
    toEncoding = genericToEncoding defaultOptions

instance FromJSON Month

instance ToJSON Month where
    toEncoding = genericToEncoding defaultOptions

encodeRunStat :: RunStat -> ByteString
encodeRunStat = encode
-- End RunStat

-- VendorRunStat
data GetActivitiesResponse = GetActivitiesResponse {
        activities :: [RunActivity]
       } deriving (Show, Generic)

data RunActivity = RunActivity {
        id :: String
      , actType :: String
      , startEpochMs :: Int
      , endEpochMs :: Int
      , activeDurationMs :: Int
      , summaries :: [RunActivitySummary]
       } deriving (Show)

data RunActivitySummary = RunActivitySummary {
        metric :: String
      , value :: Double
       } deriving (Show, Generic)

instance FromJSON GetActivitiesResponse

instance FromJSON RunActivity where
    parseJSON = withObject "RunActivity" $ \v -> RunActivity
        <$> v .: "id"
        <*> v .: "type"
        <*> v .: "start_epoch_ms"
        <*> v .: "end_epoch_ms"
        <*> v .: "active_duration_ms"
        <*> v .: "summaries"

instance FromJSON RunActivitySummary

-- Calculations

calculateTotalKmFromGetActivityResponse :: GetActivitiesResponse -> Double
calculateTotalKmFromGetActivityResponse (GetActivitiesResponse acts) = calculateTotalKmFromActivities acts

calculateTotalKmFromActivities :: [RunActivity] -> Double
calculateTotalKmFromActivities [] = 0
calculateTotalKmFromActivities ((RunActivity _ actType _ _ _ sum):xs) 
    | actType == "run" = (calculateTotalKmFromSummaries (sum)) + (calculateTotalKmFromActivities xs)
    | otherwise = calculateTotalKmFromActivities xs

calculateTotalKmFromSummaries :: [RunActivitySummary] -> Double
calculateTotalKmFromSummaries [] = 0
calculateTotalKmFromSummaries ((RunActivitySummary metric value):xs)
    | metric == "distance" = value + (calculateTotalKmFromSummaries xs)
    | otherwise = calculateTotalKmFromSummaries xs
