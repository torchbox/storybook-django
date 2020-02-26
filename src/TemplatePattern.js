import React, { useRef, useEffect } from 'react';

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
const TemplatePattern = ({ apiPath, template, context, tags }) => {
    const ref = useRef(null);

    useEffect(() => {
        window
            .fetch(apiPath, {
                method: 'POST',
                mode: 'same-origin',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    template_name: template,
                    config: {
                        context,
                        tags,
                    },
                }),
            })
            .then((res) => res.text())
            .then((html) => {
                if (ref.current) {
                    insertHTMLWithScripts(ref.current, html);
                }
            });
    });

    return <div ref={ref} />;
};

TemplatePattern.defaultProps = {
    context: null,
    tags: null,
};

export default TemplatePattern;
