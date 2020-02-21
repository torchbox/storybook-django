import json

from django.http import HttpResponse, HttpResponseForbidden
from django.template.loader import render_to_string

from pattern_library.utils import (
    get_pattern_context_var_name,
    mark_context_strings_safe,
)
from rest_framework.views import APIView


class RenderPatternView(APIView):
    http_method_names = ("post",)

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.decoder.JSONDecodeError:
            return HttpResponseForbidden()

        template_name = data["template_name"]
        config = data["config"]

        context = config.get("context", {})

        mark_context_strings_safe(context)
        context[get_pattern_context_var_name()] = True
        rendered_pattern = render_to_string(
            template_name, request=request, context=context
        )

        return HttpResponse(rendered_pattern)
