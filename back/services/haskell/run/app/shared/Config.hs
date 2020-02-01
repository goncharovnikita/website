module Config (getDbHost, getEnvVarSafe) where

import System.Environment (lookupEnv)

type DefaultValue = String
type Key = String

getEnvVarSafe :: Key -> DefaultValue -> IO (String)
getEnvVarSafe key defVal = do
    mbStr <- lookupEnv key
    case mbStr of 
      Just str -> return str
      Nothing -> do
          putStrLn $ mconcat [key, " env variable does not exists, falling back to ", defVal]
          return defVal

getDbHost :: IO (String)
getDbHost = getEnvVarSafe "DB_HOST" "localhost"

