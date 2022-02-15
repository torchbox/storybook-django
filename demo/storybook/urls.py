from django.conf import settings
from django.urls import re_path
from django.views.static import serve

DOC_ROOT = settings.STORYBOOK_DIR

urlpatterns = [
    re_path(r"^$", serve, {"path": "index.html", "document_root": DOC_ROOT}),
    re_path(r"^(?P<path>.*)$", serve, {"document_root": DOC_ROOT}),
]
