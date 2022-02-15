import React, { useState, useRef, useEffect } from 'react';

/**
 * Inserts HTML into an element, executing embedded script tags.
 * @param {Element} element
 * @param {string} html
 */
export const insertHTMLWithScripts = (element, html) => {
    element.innerHTML = html;

    Array.from(element.querySelectorAll('script')).forEach((script) => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach((attr) =>
            newScript.setAttribute(attr.name, attr.value),
        );

        newScript.appendChild(document.createTextNode(script.innerHTML));
        script.parentNode.replaceChild(newScript, script);
    });
};

export const renderPattern = (apiPath, template, context, tags) => {
    const endpoint = apiPath || window.PATTERN_LIBRARY_API;

    let template_name = window.PATTERN_LIBRARY_TEMPLATE_DIR
        ? template
              .replace(window.PATTERN_LIBRARY_TEMPLATE_DIR, ';;;')
              .replace(/^.*;;;/, '')
        : template;
    template_name = template_name.replace('.stories.js', '.html');

    return window.fetch(endpoint, {
        method: 'POST',
        mode: 'same-origin',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            template_name,
            config: {
                context,
                tags,
            },
        }),
    });
};

/**
 * Renders a Django pattern library pattern via the API.
 * @param {object} props Props
 * @param {string} props.apiPath e.g. /pattern-library/api/v1/render-pattern
 * @param {string} props.template e.g. patterns/components/icon/icon.html
 * @param {object} props.context Context for the Django template partial.
 * @param {object} props.tags Tags overrides for Django pattern library.
 */
const TemplatePattern = ({ element, apiPath, template, context, tags }) => {
    const [error, setError] = useState(null);
    const ref = useRef(null);
    useEffect(() => {
        renderPattern(apiPath, template, context, tags)
            .catch(() => {
                if (ref.current) {
                    insertHTMLWithScripts(ref.current, 'Network error');
                }
            })
            .then((res) => {
                if (res.ok) {
                    setError(null);

                    return res.text();
                }

                return res.text().then((serverError) => {
                    setError(serverError);
                });
            })
            .then((html) => {
                if (ref.current) {
                    insertHTMLWithScripts(ref.current, html);
                    window.document.dispatchEvent(
                        new Event('DOMContentLoaded', {
                            bubbles: true,
                            cancelable: true,
                        }),
                    );
                }
            });
    }, []);

    return React.createElement(element, {
        ref,
        dangerouslySetInnerHTML: { __html: error },
    });
};

TemplatePattern.defaultProps = {
    element: 'div',
    apiPath: null,
    context: null,
    tags: null,
};

export const Pattern = ({ element, filename, tags, ...props }) => {
    return React.createElement(TemplatePattern, {
        element: element,
        template: filename,
        tags,
        context: props,
    });
};

export default TemplatePattern;
