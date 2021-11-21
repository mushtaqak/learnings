# Commands

## shell

- `scrapy shell 'http://quotes.toscrape.com/page/1/'`

### Spiders

### 1 - basic spider

- `scrapy crawl quotes`

### 2 - start_urls

- `scrapy crawl quotes`

### 3 - store data

- `scrapy crawl quotes -O quotes.json`
- `scrapy crawl quotes -o quotes.jl`

### 4 - follow links (pagination)

- `scrapy crawl quotes -o quotes.jl`

### 5 - response.follow (pagination)

- `scrapy crawl quotes -o quotes.jl`

### 6 - store authors data

- `scrapy crawl authot -o authors.jl`

### 6 - using argument

- `scrapy crawl quotes -O quotes-humor.json -a tag=humor`

## Disclaimer

- Samples taken from (Scrapy Official Tutorial)[<https://docs.scrapy.org/en/latest/intro/tutorial.html>)
