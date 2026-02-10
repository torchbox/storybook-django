from django.apps import apps
from django.contrib.staticfiles.storage import staticfiles_storage
from django.template.context_processors import csrf
from django.template.defaultfilters import (
    cut,
    date,
    linebreaks,
    pluralize,
    slugify,
    truncatewords,
    urlencode,
    wordcount,
)
from django.urls import reverse

from jinja2 import Environment


def environment(**options):
    env = Environment(**options)
    env.globals.update(
        {
            "static": staticfiles_storage.url,
            "url": reverse,
            "csrf": csrf,
        }
    )
    env.filters.update(
        {
            "cut": cut,
            "date": date,
            "linebreaks": linebreaks,
            "pluralize": pluralize,
            "slugify": slugify,
            "truncatewords": truncatewords,
            "urlencode": urlencode,
            "wordcount": wordcount,
        }
    )
    return env
