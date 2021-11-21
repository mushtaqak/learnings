# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

# item & item loader are helpful in pre/post processing (i.e after data has been scraped)
# these help us separate out storing/collection logic from scraping data (which spider's job)

class ScrapyTutorialItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    # author_name = Field(input_processor=MapCompose(str.strip), output_processor=TakeFirst())
    pass
