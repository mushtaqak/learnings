# Commands

## shell

- `scrapy shell 'http://quotes.toscrape.com/page/1/'`

### Spiders

### 1 - basic quotes

- `scrapy crawl basic_quotes`

### 2 - start_urls quotes version

- `scrapy crawl start_urls_quotes`

### 3 - store feed quotes in differnt formats

- `scrapy crawl store_feed_quotes -O quotes.json`
- `scrapy crawl store_feed_quotes -o quotes.jl`

### 4 - paginate quotes

- `scrapy crawl paginate_quotes -o quotes.jl`

### 5 - follow paginate quotes (pagination version extended)

- `scrapy crawl follow_paginate_quotes -o quotes.jl`

### 6 - author quotes

- `scrapy crawl author_quotes -o authors.jl`

### 6 - tag_quotes using argument

- `scrapy crawl author_quotes -O quotes-humor.json -a tag=humor`

## Disclaimer

- Samples taken from (Scrapy Official Tutorial)[<https://docs.scrapy.org/en/latest/intro/tutorial.html>)
