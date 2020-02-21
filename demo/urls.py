from django.urls import include, path

urlpatterns = [path("storybook/", include("demo.storybook.urls"))]
