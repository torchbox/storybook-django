from django.conf import settings
from django.urls import path, re_path
from django.views.static import serve

from . import views

DOC_ROOT = settings.STORYBOOK_DIR

urlpatterns = [
    path(
        "api/v1/pattern-library/",
        views.RenderPatternView.as_view(),
        name="render_pattern_api",
    ),
    re_path(r"^$", serve, {"path": "index.html", "document_root": DOC_ROOT}),
    re_path(r"^(?P<path>.*)$", serve, {"document_root": DOC_ROOT}),
]
