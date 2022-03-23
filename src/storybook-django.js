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

/**
 * Inserts HTML into an element, executing embedded script tags,
 * firing a DOMContentLoaded event.
 * @param {Element} element
 * @param {string} html
 */
export const simulateLoading = (element, html) => {
  if (!element) {
    return;
  }

  insertHTMLWithScripts(element, html);

  window.document.dispatchEvent(
    new Event('DOMContentLoaded', {
      bubbles: true,
      cancelable: true,
    }),
  );
};

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

export const extractDocsComment = (template) => {
  const comments = template.match(
    /{% comment "text\/markdown" %}\n*((.|\n)+){% endcomment %}/m,
  );

  if (comments) {
    return comments[1].replace(/(\n|^) {4}/g, '\n');
  }

  return null;
};

const generateArgTypes = (descriptionComment) => {
  if (!descriptionComment) {
    return {};
  }

  const props = descriptionComment.match(/(-|\*) `([^`]+)`.+/g);

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
