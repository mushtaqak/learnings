import scrapy


class TagQuotesSpider(scrapy.Spider):
    name = "tag_quotes"
    # We can also define custom spider settings here
    # custom_settings = {
    #     # specifies exported fields and order
    #     # using here just for ordering since this is a requirment to get data in json in this order
    #     'FEED_EXPORT_FIELDS': ['name', 'address'],
    # }
    # we can also define allowed_domains here

    def start_requests(self):
        url = 'http://quotes.toscrape.com/'
        tag = getattr(self, 'tag', None)
        if tag is not None:
            url = url + 'tag/' + tag
        yield scrapy.Request(url, self.parse)

    def parse(self, response):
        for quote in response.css('div.quote'):
            yield {
                'text': quote.css('span.text::text').get(),
                'author': quote.css('small.author::text').get(),
            }

        next_page = response.css('li.next a::attr(href)').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)
