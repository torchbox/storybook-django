import { storiesOf } from '@storybook/react';
import React from 'react';
import YAML from 'yaml';

import { TemplatePattern } from './TemplatePattern';

import '../core/templates/patterns/base.html';

import accordion from '../core/templates/patterns/components/accordion/accordion.yaml';
import accordionHTML from '../core/templates/patterns/components/accordion/accordion.html';
import accordion_section from '../core/templates/patterns/components/accordion/accordion_section.yaml';
import accordion_sectionHTML from '../core/templates/patterns/components/accordion/accordion_section.html';
import home_banner from '../core/templates/patterns/components/banner/home_banner.yaml';
import home_bannerHTML from '../core/templates/patterns/components/banner/home_banner.html';
import split_banner from '../core/templates/patterns/components/banner/split_banner.yaml';
import split_bannerHTML from '../core/templates/patterns/components/banner/split_banner.html';
import button from '../core/templates/patterns/components/button/button.yaml';
import buttonHTML from '../core/templates/patterns/components/button/button.html';
import call_to_action from '../core/templates/patterns/components/cta/call_to_action.yaml';
import call_to_actionHTML from '../core/templates/patterns/components/cta/call_to_action.html';
import cta_section from '../core/templates/patterns/components/cta/cta_section.yaml';
import cta_sectionHTML from '../core/templates/patterns/components/cta/cta_section.html';
import detail from '../core/templates/patterns/components/customers/customer-detail.yaml';
import detailHTML from '../core/templates/patterns/components/customers/customer-detail.html';
import table from '../core/templates/patterns/components/customers/customers-table.yaml';
import tableHTML from '../core/templates/patterns/components/customers/customers-table.html';
import next_stage_link from '../core/templates/patterns/components/pagination/next_stage_link.yaml';
import next_stage_linkHTML from '../core/templates/patterns/components/pagination/next_stage_link.html';
import pagination from '../core/templates/patterns/components/pagination/pagination.yaml';
import paginationHTML from '../core/templates/patterns/components/pagination/pagination.html';
import call_to_action_block from '../core/templates/patterns/components/streamfield/call_to_action_block.yaml';
import call_to_action_blockHTML from '../core/templates/patterns/components/streamfield/call_to_action_block.html';
import casestudy_teaser_block from '../core/templates/patterns/components/streamfield/casestudy_teaser_block.yaml';
import casestudy_teaser_blockHTML from '../core/templates/patterns/components/streamfield/casestudy_teaser_block.html';
import heading_block from '../core/templates/patterns/components/streamfield/heading_block.yaml';
import heading_blockHTML from '../core/templates/patterns/components/streamfield/heading_block.html';
import related_link from '../core/templates/patterns/components/streamfield/pop/related_link.yaml';
import related_linkHTML from '../core/templates/patterns/components/streamfield/pop/related_link.html';
import related_links from '../core/templates/patterns/components/streamfield/pop/related_links.yaml';
import related_linksHTML from '../core/templates/patterns/components/streamfield/pop/related_links.html';
import quote_block from '../core/templates/patterns/components/streamfield/quote_block.yaml';
import quote_blockHTML from '../core/templates/patterns/components/streamfield/quote_block.html';
import quote_blockMD from '../core/templates/patterns/components/streamfield/quote_block.md';

const sources = {
  'components/accordion/accordion': [accordion, accordionHTML],
  'components/accordion/accordion_section': [
    accordion_section,
    accordion_sectionHTML,
  ],
  'components/banner/home_banner': [home_banner, home_bannerHTML],
  'components/banner/split_banner': [split_banner, split_bannerHTML],
  'components/button/button': [button, buttonHTML],
  'components/cta/call_to_action': [call_to_action, call_to_actionHTML],
  'components/cta/cta_section': [cta_section, cta_sectionHTML],
  'components/customers/customer-detail': [detail, detailHTML],
  'components/customers/customers-table': [table, tableHTML],
  'components/pagination/next_stage_link': [
    next_stage_link,
    next_stage_linkHTML,
  ],
  'components/pagination/pagination': [pagination, paginationHTML],
  'components/streamfield/call_to_action_block': [
    call_to_action_block,
    call_to_action_blockHTML,
  ],
  'components/streamfield/casestudy_teaser_block': [
    casestudy_teaser_block,
    casestudy_teaser_blockHTML,
  ],
  'components/streamfield/heading_block': [heading_block, heading_blockHTML],
  'components/streamfield/pop/related_link': [related_link, related_linkHTML],
  'components/streamfield/pop/related_links': [
    related_links,
    related_linksHTML,
  ],
  'components/streamfield/quote_block': [
    quote_block,
    quote_blockHTML,
    quote_blockMD,
  ],
};

const argTypesify = (obj) => {
  const keys = Object.keys(obj);
  return keys.reduce((cont, key) => {
    const val = obj[key];
    let control;
    if (Array.isArray(val)) {
      control = val.every((v) => typeof v === 'string') ? 'array' : 'object';
    } else if (typeof val === 'string') {
      control = 'text';
    } else if (typeof val === 'number') {
      control = 'number';
    } else if (typeof val === 'boolean') {
      control = 'boolean';
    } else {
      control = 'object';
    }

    cont[key] = { control };

    return cont;
  }, {});
};

Object.entries(sources).forEach(([path, [rawYAML, source, rawMarkdown]]) => {
  const config = YAML.parse(rawYAML);
  const pathElts = path.split('/');
  const filename = pathElts.pop();

  const context = config?.context ?? {};

  const usage = Object.keys(context)
    .map((key) => {
      const val = context[key];
      let wrappedVal = val;

      if (Array.isArray(val)) {
        wrappedVal = '[array]';
      } else if (typeof val === 'string') {
        wrappedVal = `"${val}"`;
      } else if (typeof val === 'number') {
        wrappedVal = val;
      } else if (typeof val === 'boolean') {
        wrappedVal = val;
      } else if (typeof val === 'object') {
        wrappedVal = '[object]';
      }
      return `${key}=${wrappedVal}`;
    })
    .join(' ');

  const isBlock =
    Object.keys(context).length === 1 &&
    typeof Object.values(context)[0] === 'object' &&
    !Array.isArray(Object.values(context)[0]);
  const blockKey = Object.keys(context)[0];

  const folders = `Django Patterns / ${pathElts
    .join('/')
    .replace('components/', '')}`;
  const htmlPath = `patterns/${path}.html`;
  const description = `${rawMarkdown ?? ''}
### Usage

🚧 Experimental, use your own judgement before copy-pasting 🙈 🙉 🙊

\`\`\`django\n{% include "${htmlPath}" with ${usage} %}\n\`\`\`

### YAML

\`\`\`yaml\n${rawYAML}\n\`\`\``;

  storiesOf(`${folders} / ${filename}`, module).add(
    'Default',
    (args) => {
      const patternContext = isBlock ? { [blockKey]: args } : args;
      return (
        <TemplatePattern
          template={htmlPath}
          context={patternContext}
          tags={config.tags}
        />
      );
    },
    {
      args: isBlock ? context[blockKey] : context,
      argTypes: argTypesify(isBlock ? context[blockKey] : context),
      docs: {
        source: { code: source.default },
        extractComponentDescription: () => description,
      },
    },
  );
});
