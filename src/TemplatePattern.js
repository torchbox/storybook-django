import React, { useState, useRef, useEffect } from 'react';

/**
 * Inserts HTML into an element, executing embedded script tags.
 * @param {Element} element
 * @param {string} html
 */
const insertHTMLWithScripts = (element, html) => {
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

/**
 * Renders a Django pattern library pattern via the API.
 * @param {object} props Props
 * @param {string} props.apiPath e.g. /api/v1/pattern-library/
 * @param {string} props.template e.g. patterns/atoms/icons/icon.html
 * @param {object} props.context Context for the Django template partial.
 * @param {object} props.tags Tags overrides for Django pattern library.
 */
const TemplatePattern = ({ element, apiPath, template, context, tags }) => {
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const url = apiPath || window.PATTERN_LIBRARY_API;
    let template_name = window.PATTERN_LIBRARY_TEMPLATE_DIR
        ? template.replace(window.PATTERN_LIBRARY_TEMPLATE_DIR, '')
        : template;
    template_name = template_name.replace('.stories.js', '.html');

    useEffect(() => {
        window
            .fetch(url, {
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
            })
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
                    let errName = serverError.split('\n')[0];
                    let stack = serverError;

                    if (serverError.includes('TemplateSyntaxError')) {
                        try {
                            let templateError;
                            templateError = serverError.split(
                                'Template error:',
                            )[1];
                            templateError = templateError.split(
                                'Traceback:',
                            )[0];
                            templateError = templateError
                                .split('\n')
                                .filter((l) => l.startsWith('   '))
                                .map((l) => l.replace(/^\s\s\s/, ''))
                                .join('\n');

                            const errCleanup = document.createElement('div');
                            errCleanup.innerHTML = templateError;
                            stack = errCleanup.innerText;

                            let location = serverError
                                .split('\n')
                                .find((l) => l.startsWith('In template'));
                            errName = `TemplateSyntaxError ${
                                location ? location : ''
                            }`;
                        } catch {}
                    }

                    const error = new Error(errName);
                    error.stack = stack;

                    setError(error);

                    return 'Server error';
                });
            })
            .then((html) => {
                if (ref.current) {
                    insertHTMLWithScripts(ref.current, html);
                }
            });
    });

    useEffect(() => {
        if (error) {
            throw error;
        }
    }, [error]);

    return React.createElement(element, { ref });
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
