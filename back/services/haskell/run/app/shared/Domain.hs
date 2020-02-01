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
data RunStat = RunStat {
        totalKm :: Int
      } deriving (Show)

createWeather :: Int -> Int -> Bool -> IO (Weather)
createWeather tInt tFl upZero = do
    wId <- genObjectId
    dt <- getCurrentTime
    return $ Weather wId tInt tFl upZero dt

instance FromJSON Weather where
    parseJSON = withObject "Weather" $ \v -> Weather
        <$> v .: "id"
        <*> v .: "tInt"
        <*> v .: "tFl"
        <*> v .: "upZero"
        <*> v .: "dt"

instance ToJSON Weather where
    toJSON (Weather wId tInt tFl upZero dt) = object ["id" .= show wId, "tInt" .= tInt, "tFl" .= tFl, "upZero" .= upZero, "dt" .= dt]

    toEncoding (Weather wId tInt tFl upZero dt) = pairs ("id" .= show wId <> "tInt" .= tInt <> "tFl" .= tFl <> "upZero" .= upZero <> "dt" .= dt)

encodeWeather :: Weather -> ByteString
encodeWeather = encode
-- End Weather

-- VendorWeather
data VendorWeather = VendorWeather {
    nowDt :: UTCTime
  , fact :: WeatherFact
                                   } deriving (Show, Generic)

instance ToJSON VendorWeather where
    toEncoding = genericToEncoding defaultOptions

instance FromJSON VendorWeather where
    parseJSON = withObject "VendorWeather" $ \v -> VendorWeather
        <$> v .: "now_dt"
        <*> v .: "fact"

data WeatherFact = WeatherFact {
    temp :: Int
                               } deriving (Show, Generic)


instance ToJSON WeatherFact where
    toEncoding = genericToEncoding defaultOptions

instance FromJSON WeatherFact
-- End VendorWeather

weatherFromVendor :: VendorWeather -> IO (Weather)
weatherFromVendor (VendorWeather nowDt (WeatherFact temp)) = do
    wId <- genObjectId
    let tInt = abs temp
        upZero = temp > 0
        tFl = 0
    return $ Weather wId tInt tFl upZero nowDt
