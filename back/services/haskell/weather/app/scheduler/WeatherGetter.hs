module WeatherGetter (requestWeather, APIKey) where

import Control.Monad.IO.Class
import Data.Aeson
import Network.HTTP.Req
import Data.ByteString.Char8 (pack)

import Domain

type APIKey = String

requestWeather :: APIKey -> IO (Weather)
requestWeather apiKey = do
    runReq defaultHttpConfig $ do
        r <- req GET
            (http "localhost" /: "weather.dump.json")
            (NoReqBody)
            jsonResponse
            (mconcat [header "X-Yandex-API-Key" (pack apiKey), port 8080])
        w <- liftIO $ weatherFromVendor $ responseBody r
        return w

