import { extractDocsComment, generateDocs } from '../src/storybook-django';

describe('extractDocsComment', () => {
  it('works', () => {
    expect(
      extractDocsComment(
        `{% comment "text/markdown" %}This is a test{% endcomment %}`,
      ),
    ).toMatchInlineSnapshot(`"This is a test"`);
    expect(
      extractDocsComment(`
    {% load static wagtailcore_tags wagtailimages_tags %}
    {% comment "text/markdown" %}

    Meant for the "hero" area of the homepage only, with an image to the left and the page’s \`<h1>\` title to the right, along with a description.

    It’s based on \`split_banner\`, with slight variations for the homepage.

    It supports:

    - \`hero_image\`: displayed without alt text
    - \`hero_title\`: defaulting to \`title\` if unset
    - \`description\`: optional
    - And a CTA with:
    - \`link_text\`
    - \`link_url\` (string)

    Example usage:

    \`\`\`html
    <div class="section--grey-bg">
        {% include "patterns/components/banner/home_banner.html" with title=page.title hero_title=page.hero_title description=page.strapline hero_image=page.hero_image link_text=page.hero_link_label link_url=page.hero_link.url %}
        {# […] #}
    </div>
    \`\`\`
{% endcomment %}
<div class="split-banner split-banner--home">
`),
    ).toMatchInlineSnapshot(`
      "
      Meant for the \\"hero\\" area of the homepage only, with an image to the left and the page’s \`<h1>\` title to the right, along with a description.

      It’s based on \`split_banner\`, with slight variations for the homepage.

      It supports:

      - \`hero_image\`: displayed without alt text
      - \`hero_title\`: defaulting to \`title\` if unset
      - \`description\`: optional
      - And a CTA with:
      - \`link_text\`
      - \`link_url\` (string)

      Example usage:

      \`\`\`html
      <div class=\\"section--grey-bg\\">
          {% include \\"patterns/components/banner/home_banner.html\\" with title=page.title hero_title=page.hero_title description=page.strapline hero_image=page.hero_image link_text=page.hero_link_label link_url=page.hero_link.url %}
          {# […] #}
      </div>
      \`\`\`
      "
    `);
  });
});

describe('argTypes generation', () => {
  it('works', () => {
    expect(
      generateDocs(`
{% comment "text/markdown" %}
It supports:

- \`hero_image\`: displayed without alt text
- \`hero_title\`: defaulting to \`title\` if unset
- \`description\`: optional
- And a CTA with:
- \`link_text\`
- \`link_url\` (string)
{% endcomment %}
`).argTypes,
    ).toMatchInlineSnapshot(`
      Object {
        "description": Object {
          "control": Object {
            "type": "text",
          },
          "description": "optional",
        },
        "hero_image": Object {
          "control": Object {
            "type": "text",
          },
          "description": "displayed without alt text",
        },
        "hero_title": Object {
          "control": Object {
            "type": "text",
          },
          "description": "defaulting to \`title\` if unset",
        },
        "link_url": Object {
          "control": Object {
            "type": "text",
          },
          "description": "(string)",
        },
      }
    `);
  });
});
