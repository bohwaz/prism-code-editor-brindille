//import 'prism-code-editor/prism/languages/css-extras';
import 'prism-code-editor/languages/css';
import 'prism-code-editor/languages/html';
import 'prism-code-editor/prism/languages/markup';
import 'prism-code-editor/prism/languages/javascript';
import './brindille/language.ts';
import 'prism-code-editor/prism/languages/markdown';
import 'prism-code-editor/prism/languages/json';
import 'prism-code-editor/prism/languages/sql';

import { createEditor } from 'prism-code-editor';
import { matchBrackets } from 'prism-code-editor/match-brackets';
import { indentGuides } from 'prism-code-editor/guides';

import 'prism-code-editor/layout.css';
import 'prism-code-editor/scrollbar.css';
import 'prism-code-editor/guides.css';
import 'prism-code-editor/themes/github-dark.css';

import {
  searchWidget,
  highlightSelectionMatches,
  showInvisibles,
} from 'prism-code-editor/search';
import { defaultCommands, editHistory } from 'prism-code-editor/commands';
import { cursorPosition } from 'prism-code-editor/cursor';
import { highlightBracketPairs } from 'prism-code-editor/highlight-brackets';
import { matchTags } from 'prism-code-editor/match-tags';

import 'prism-code-editor/search.css';
import 'prism-code-editor/invisibles.css';

import { fuzzyFilter, autoComplete } from 'prism-code-editor/autocomplete';
import './autocomplete';

// @ts-expect-error
window.createEditor = (container, options, ...extensions) => {
  return createEditor(
    container,
    options,
    matchBrackets(),
    indentGuides(),
    defaultCommands(),
    editHistory(),
    highlightSelectionMatches(),
    searchWidget(),
    showInvisibles(),
    matchTags(),
    highlightBracketPairs(),
    cursorPosition(),
    autoComplete({ filter: fuzzyFilter }),
    ...extensions
  );
};
