/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

import { renderPattern, simulateLoading } from './storybook-django';

export { generateDocs } from './storybook-django';

const getTemplateName = (template, filename) => {
  if (template) {
    return template;
  }

  if (filename) {
    return filename
      .replace(/.+\/templates\//, '')
      .replace(/\.stories\..+$/, '.html')
      .toLowerCase();
  }

  return 'Template not found!';
};

/**
 * Renders a Django pattern library pattern via the API.
 * @param {object} props Props
 * @param {string} props.element Which element (tag name) to render the template inside of.
 * @param {string} props.endpoint API endpoint to fetch the HTML.
 * @param {string} props.template For example `patterns/components/icon/icon.html`.
 * @param {string} props.filename For example `./core/templates/patterns/components/icon/icon.stories.js`.
 * @param {object} props.context Context for the Django template partial.
 * @param {object} props.tags Tags overrides for django-pattern-library.
 */
export const Pattern = ({
  element = 'div',
  endpoint = '/pattern-library/api/v1/render-pattern',
  template,
  filename,
  context,
  tags,
}) => {
  const ref = useRef(null);
  const template_name = getTemplateName(template, filename);

  useEffect(() => {
    /* eslint-disable arrow-body-style */
    renderPattern(endpoint, template_name, context, tags)
      .catch((err) => simulateLoading(ref.current, err))
      .then((res) => res.text())
      .then((html) => simulateLoading(ref.current, html));
  });

  return React.createElement(element, { ref });
};
