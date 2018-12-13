# .value_list()

This is similar to `values()` except that instead of returning dictionaries, it returns tuples when iterated over.
```python
>>> Entry.objects.values_list('id', 'headline')
<QuerySet [(1, 'First entry'), ...]>
```

If you only pass in a single field, you can also pass in the `flat` parameter. If `True`, this will mean the returned results are single values, rather than one-tuples. An example should make the difference clearer:
```python
>>> Entry.objects.values_list('id').order_by('id')
<QuerySet[(1,), (2,), (3,), ...]>

>>> Entry.objects.values_list('id', flat=True).order_by('id')
<QuerySet [1, 2, 3, ...]>
```

**Note**: It is an error to pass in `flat` when there is more than one field.

You can pass `named=True` to get results as a namedtuple():
```python
>>> Entry.objects.values_list('id', 'headline', named=True)
<QuerySet [Row(id=1, headline='First entry'), ...]>
```

Ref: https://docs.djangoproject.com/en/2.1/ref/models/querysets/#values-list
