module Domain where

import Data.Bson (ObjectId, genObjectId)
import Data.Time (UTCTime, getCurrentTime)
import Data.Aeson
import Data.ByteString.Lazy (ByteString)

import qualified Data.Text as T

-- Common
instance FromJSON ObjectId where
    parseJSON = withText "ObjectId" $ (return . read . T.unpack)

-- Weather
data Weather = Weather {
        wId    :: ObjectId
      , tInt   :: Int
      , tFl    :: Int
      , upZero :: Bool
      , dt     :: UTCTime
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
