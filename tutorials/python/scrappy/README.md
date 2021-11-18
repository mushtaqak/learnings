# Commands

## qoutes 1 - run spider

- `scrapy crawl quotes`

## qoutes 2 - start_urls

- `scrapy crawl quotes`

## shell

- `scrapy shell 'http://quotes.toscrape.com/page/1/'`

## qoutes 3 - store data

- `scrapy crawl quotes -O quotes.json`
- `scrapy crawl quotes -o quotes.jl`

## qoutes 4 - follow links

- `scrapy crawl quotes -o quotes.jl`

## qoutes 5 - response.follow

- `scrapy crawl quotes -o quotes.jl`

## author

- `scrapy crawl authot -o authors.jl`

## qoutes 6 - by tag

- `scrapy crawl quotes -O quotes-humor.json -a tag=humor`
