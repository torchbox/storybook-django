/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

import { renderPattern, simulateLoading } from './storybook-django';

export {
  generateDocs,
  renderPattern,
  simulateLoading,
  insertHTMLWithScripts,
} from './storybook-django';

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
 * Fetches a template’s HTML via the API.
 * @param {string} template_name -For example `patterns/components/icon/icon.html`.
 * @param {object} context Context for the Django template partial.
 * @param {object} tags Tags overrides for django-pattern-library.
 * @param {function} callback On server response.
 * @param {string} [endpoint="/pattern-library/api/v1/render-pattern"] API endpoint to fetch the HTML.
 */
export const getTemplatePattern = (
  template_name,
  context,
  tags,
  callback,
  endpoint = '/pattern-library/api/v1/render-pattern',
) =>
  renderPattern(endpoint, template_name, context, tags)
    .catch(callback)
    .then((res) => res.text())
    .then(callback);

/**
 * Renders a Django pattern library pattern via the API.
 * @param {object} props Props
 * @param {string} [props.element="div"] Which element (tag name) to render the template inside of.
 * @param {string} [props.endpoint] API endpoint to fetch the HTML.
 * @param {string} [props.template] For example `patterns/components/icon/icon.html`.
 * @param {string} [props.filename] For example `./core/templates/patterns/components/icon/icon.stories.js`.
 * @param {object} [props.context] Context for the Django template partial.
 * @param {object} [props.tags] Tags overrides for django-pattern-library.
 */
export const Pattern = ({
  element = 'div',
  endpoint,
  template,
  filename,
  context,
  tags,
}) => {
  const ref = useRef(null);
  const template_name = getTemplateName(template, filename);

  useEffect(() => {
    getTemplatePattern(
      template_name,
      context,
      tags,
      (html) => simulateLoading(ref.current, html),
      endpoint,
    );
    ref.current.dataset.state = 'loading';
  });

  return React.createElement(element, {
    ref,
    // Mark the element with its state so it can be found in automated tests.
    'data-testid': 'storybook-django',
    'data-template': template_name,
    'data-state': 'empty',
  });
};
