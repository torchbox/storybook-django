from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path

urlpatterns = staticfiles_urlpatterns() + [
    path("storybook/", include("demo.storybook.urls")),
    path("pattern-library/", include("pattern_library.urls")),
]
