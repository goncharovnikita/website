module RunGetter (requestRunActivity) where

import Control.Monad.IO.Class
import Network.HTTP.Req
import qualified Network.HTTP.Req as R
import Data.ByteString.Char8 (pack)
import qualified Data.Text as T
import Text.URI (mkURI)

import Domain

type RequestActivityUrl = String

requestRunActivity :: RequestActivityUrl -> IO (GetActivitiesResponse)
requestRunActivity requestActivityUrl = do
    either (\(u, opt) -> reqActivity u opt) (\(u, opt) -> reqActivity u opt) (getUrlFromStringUnsafe requestActivityUrl)

reqActivity :: Url (scheme) -> Option scheme -> IO (GetActivitiesResponse)
reqActivity url opt = do
    runReq defaultHttpConfig $ do
        r <- req GET
            url
            (NoReqBody)
            jsonResponse
            (mconcat [opt])
        return $ (responseBody r :: GetActivitiesResponse)

getUrlFromStringUnsafe url =
    case (mkURI $ T.pack url) of
      Nothing -> error $ mconcat ["Url ", url, " is invalid"]
      Just uri -> case (R.useURI uri) of
                      Nothing -> error $ mconcat ["Url ", url, " is invalid"]
                      Just eiRes -> eiRes
