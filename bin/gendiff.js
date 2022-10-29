#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import _ from 'lodash';
import printDiff from '../actions/print-diff.js';

const program = new Command;
program
    .description('Usage: gendiff [options] <filepath1> <filepath2>\n' +
        'Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the current version')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(printDiff)
    .parse();