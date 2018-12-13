# .values()

Returns a QuerySet that returns dictionaries, rather than model instances, when used as an iterable.

This example compares the dictionaries of values() with the normal model objects:

```python
# This list contains a Blog object.
>>> Blog.objects.filter(name__startswith='Beatles')
<QuerySet [<Blog: Beatles Blog>]>

# This list contains a dictionary.
>>> Blog.objects.filter(name__startswith='Beatles').values()
<QuerySet [{'id': 1, 'name': 'Beatles Blog', 'tagline': 'All the latest Beatles news.'}]>
```

The `values()` method takes optional positional arguments, `*fields`, which specify field names to which the SELECT should be limited.
```python
>>> Blog.objects.values('id', 'name')
<QuerySet [{'id': 1, 'name': 'Beatles Blog'}]>
```

Ref: https://docs.djangoproject.com/en/2.1/ref/models/querysets/#values
