declare type mediumFeed = {
  status: string;
  items: mediumFeedUnit[];
}

declare type mediumFeedUnit = {
  title: string;
  pubDate: string;
  description: string;
  link: string;
}