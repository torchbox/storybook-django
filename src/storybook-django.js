/**
 * Inserts HTML into an element, executing embedded script tags.
 * @param {HTMLElement} element
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
    if (script.parentNode) {
      script.parentNode.replaceChild(newScript, script);
    }
  });
};

/**
 * Inserts HTML into an element, executing embedded script tags,
 * firing default loading events and custom ones.
 * @param {HTMLElement|null} element
 * @param {string} html
 */
export const simulateLoading = (element, html) => {
  if (!element) {
    return;
  }

  insertHTMLWithScripts(element, html);

  // Indicate the element has loaded at least once.
  element.dataset.testid = 'storybook-django';
  element.dataset.state = 'loaded';

  window.document.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }),
  );
  window.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }),
  );
  window.dispatchEvent(
    new Event('load', {
      bubbles: true,
      cancelable: true,
    }),
  );
};

/**
 * Fetches a template’s HTML via the API.
 * @param {string} endpoint API endpoint to fetch the HTML.
 * @param {string} template_name -For example `patterns/components/icon/icon.html`.
 * @param {object} context Context for the Django template partial.
 * @param {object} tags Tags overrides for django-pattern-library.
 */
export const renderPattern = (endpoint, template_name, context, tags) => {
  const config = {};
  if (context) {
    config.context = context;
  }
  if (tags) {
    config.tags = tags;
  }

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
      config,
    }),
  });
};

/**
 * Generates / extracts documentation from a template’s source.
 * @param {string} template The Django Template source.
 */
export const extractDocsComment = (template) => {
  const comments = template.match(
    /{% comment "text\/markdown" %}\n*((.|\n)+){% endcomment %}/m,
  );

  if (comments && comments[1]) {
    return comments[1].replace(/(\n|^) {4}/g, '\n');
  }

  return null;
};

/**
 * Generates / extracts documentation from a template’s source.
 * @param {string|null} comment A Django Template `{% comment %}` block.
 */
const generateArgTypes = (comment) => {
  if (!comment) {
    return {};
  }

  const props = comment.match(/(-|\*) `([^`]+)`.+/g);

  if (props) {
    const argTypes = Object.fromEntries(
      props.map((item) => {
        const data = item.match(/`([^`]+)`([^a-zA-Z([]+)(.+)/);
        const name = data ? data[1] : '';
        const description = data ? data[3] : '';
        return [name, { description }];
      }),
    );
    return argTypes;
  }

  return {};
};

/**
 * Generates / extracts documentation from a template’s source.
 * @param {string} template The Django Template source.
 */
export const generateDocs = (template) => {
  const description = extractDocsComment(template);

  const output = {
    docs: {
      source: { code: template },
      extractComponentDescription: () => description,
    },
    argTypes: generateArgTypes(description),
  };

  return output;
};
