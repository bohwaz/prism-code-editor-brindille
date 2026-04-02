import { languageMap } from 'prism-code-editor';
import 'prism-code-editor/languages/twig';

const brindille_lang = (languageMap.brindille = { ...languageMap.twig });

brindille_lang.comments = {
  block: ['{{*', '*}}'],
};

import { languages, tokenize } from 'prism-code-editor/prism';
import { embeddedIn } from 'prism-code-editor/prism/utils';
//import 'prism-code-editor/prism/languages/markup';

var expression: { pattern: RegExp; inside?: any } = {
  pattern: /[\s\S]+/,
};

var brindille = (expression.inside = {
  string: [
    {
      pattern: /"(?:\\.|[^\\\n"])*"/g,
      //greedy: true,
      inside: {
        interpolation: {
          pattern: /\{\{[^{}]*\}\}|`[^`]*`/,
          inside: {
            'interpolation-punctuation': {
              pattern: /^[{`]|[`}]$/,
              alias: 'punctuation',
            },
            expression: expression,
          },
        },
        variable: /\$\w+/,
      },
    },
    {
      pattern: /'(?:\\.|[^\\\n'])*'/g,
      //greedy: true,
    },
  ],
  keyword: {
    pattern: /(^\{\{\/?)[:#]?[a-z_]\w*\b(?!\()/gi,
    lookbehind: true,
    //greedy: true,
  },
  delimiter: {
    pattern: /^\{\{\/?|\}\}$/g,
    //greedy: true,
    alias: 'punctuation',
  },
  number: /\b0x[a-fA-F\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  variable: [
    /\$(?!\d)\w+/,
    /#(?!\d)\w+#/,
    {
      pattern: /(\.|->|\w\s*=)(?!\d)\w+\b(?!\()/,
      lookbehind: true,
    },
    {
      pattern: /(\[)(?!\d)\w+(?=\])/,
      lookbehind: true,
    },
  ],
  function: {
    pattern: /(\|\s*)@?[a-z_]\w*|\b[a-z_]\w*(?=\()/i,
    lookbehind: true,
  },
  'attr-name': /\b[a-z_]\w*(?=\s*=)/i,
  boolean: /\b(?:false|true|no|off|on|yes)\b/,
  punctuation: /[()[\]{}.,:`]|->/,
  operator: [
    /[%/*+-]|===|[!=<>]=?|&&|\|\|?/,
    /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
    /\b(?:and|eq|[gl][te]|[gl]te|mod|neq?|not|or)\b/,
  ],
});

languages.brindille = {
  'ignore-literal': {
    pattern:
      /(\{\{literal\}\})(?!\{\{\/literal\}\})[\s\S]+?(?=\{\{\/literal\}\})/g,
    lookbehind: true,
    //greedy: true,
  },
  'brindille-comment': {
    pattern: /\{\{\*[\s\S]*?\*\}\}/g,
    //greedy: true,
    alias: 'comment',
  },
  brindille: {
    pattern: RegExp(
      '<>|<>|<>)*})*})*}'.replace(
        /<>/g,
        `{(?:[^{}"']|"(?:\\\\.|[^\\\\\n"])*"|'(?:\\\\.|[^\\\\\n'])*'`
      ),
      'g'
    ),
    //greedy: true,
    alias: 'language-brindille',
    inside: brindille,
  },
  [tokenize]: embeddedIn('html'),
};
