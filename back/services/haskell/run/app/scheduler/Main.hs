{-# LANGUAGE ExtendedDefaultRules #-}
module Main where

import Control.Monad.IO.Class
import Control.Monad
import System.Environment (getEnv)
import Control.Concurrent
import System.Exit
import Data.Char (toLower)
import System.IO
import Database.MongoDB
import System.Cron
import qualified Data.Text as T
import Web.Scotty

import Domain
-- import Repo
import RunGetter
import Config

main = do
    hSetBuffering stdout NoBuffering
    dbHost <- getDbHost
    requestRunUrl <- getEnvVarSafe "REQUEST_RUN_URL" "http://localhost:8080/runs.dump.json"
    r <- requestRunActivity requestRunUrl
    putStrLn $ show $ calculateTotalKmFromGetActivityResponse r

