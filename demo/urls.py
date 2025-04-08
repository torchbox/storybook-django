from django.urls import include, path

urlpatterns = [
    path("pattern-library/", include("pattern_library.urls")),
    path("", include("demo.storybook.urls")),
]
