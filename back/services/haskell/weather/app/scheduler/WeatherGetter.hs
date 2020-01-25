module WeatherGetter (requestWeather, APIKey, RequestWeatherURL) where

import Control.Monad.IO.Class
import Data.Aeson
import Network.HTTP.Req
import qualified Network.HTTP.Req as R
import Data.ByteString.Char8 (pack)
import qualified Data.Text as T
import Text.URI (mkURI)

import Domain

type APIKey = String
type RequestWeatherURL = String

requestWeather :: APIKey -> RequestWeatherURL -> IO (Weather)
requestWeather apiKey requestWeatherUrl = do
    either (\(u, opt) -> reqWeather u opt apiKey) (\(u, opt) -> reqWeather u opt apiKey) (getUrlFromStringUnsafe requestWeatherUrl)

reqWeather :: Url (scheme) -> Option scheme -> APIKey -> IO (Weather)
reqWeather url opt apiKey = do
    runReq defaultHttpConfig $ do
        r <- req GET
            url
            (NoReqBody)
            jsonResponse
            (mconcat [header "X-Yandex-API-Key" (pack apiKey), opt])
        w <- liftIO $ weatherFromVendor $ responseBody r
        return w

getUrlFromStringUnsafe url =
    case (mkURI $ T.pack url) of
      Nothing -> error $ mconcat ["Url ", url, " is invalid"]
      Just uri -> case (R.useURI uri) of
                      Nothing -> error $ mconcat ["Url ", url, " is invalid"]
                      Just eiRes -> eiRes
