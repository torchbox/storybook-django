import React from 'react';
import YAML from 'yaml';

import { Pattern } from '../../../../../../src/react';

import './customers-table.html';
import rawConfig from './customers-table.yaml';

const config = YAML.parse(rawConfig);

const Table = (props) => <Pattern filename={__filename} context={props} />;

export default {
  component: Table,
  title: 'Customers / Table',
};

const stubProgrammes = [
  {
    get_full_name: 'Anthony Richardson',
    user_id_display: '655992',
    get_state_display: 'Pending',
  },
  {
    get_full_name: 'Benjamin Cole-Hawkins',
    user_id_display: '708993',
    get_state_display: 'Open',
  },
  {
    get_full_name: 'Charlie Nicholls',
    user_id_display: '000183',
    get_state_display: 'Closed',
  },
];

export const emptyTable = () => <Table customers={[]} />;

export const fullTable = () => <Table customers={stubProgrammes} />;

export const fromYAML = () => <Table customers={config.context.customers} />;
