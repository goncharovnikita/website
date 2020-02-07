{-# LANGUAGE ExtendedDefaultRules #-}
module Repo () where

import Database.MongoDB
import Control.Monad.Trans (liftIO, MonadIO)

import Domain

withPipe :: (MonadIO m) => Pipe -> Action m a -> m a
withPipe pipe act = do
    access pipe master "website-run" act

