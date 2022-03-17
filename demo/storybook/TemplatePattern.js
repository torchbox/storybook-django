/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

import { renderPattern, simulateLoading } from '../../src/storybook-django';

/**
 * Renders a Django pattern library pattern via the API.
 * @param {object} props Props
 * @param {string} props.apiPath e.g. /pattern-library/api/v1/render-pattern
 * @param {string} props.template e.g. patterns/components/icon/icon.html
 * @param {object} props.context Context for the Django template partial.
 * @param {object} props.tags Tags overrides for Django pattern library.
 */
export const TemplatePattern = ({ element, template, context, tags }) => {
    const ref = useRef(null);

    const template_name = template
        .replace(/^.*demo\/core\/templates\//, '')
        .replace('.stories.js', '.html');
    useEffect(() => {
        /* eslint-disable arrow-body-style */
        renderPattern(
            '/pattern-library/api/v1/render-pattern',
            template_name,
            context,
            tags,
        )
            .catch((err) => simulateLoading(ref.current, err))
            .then((res) => res.text())
            .then((html) => simulateLoading(ref.current, html));
    });

    return React.createElement(element, { ref });
};

TemplatePattern.defaultProps = {
    element: 'div',
    context: null,
    tags: null,
};

export const Pattern = ({ element, filename, tags, ...props }) => {
    return React.createElement(TemplatePattern, {
        element,
        template: filename,
        tags,
        context: props,
    });
};
