/** @module autocomplete/brindille */

import { type PrismEditor } from 'prism-code-editor';
import { getClosestToken } from 'prism-code-editor/utils';
import {
  type AttributeConfig,
  type Completion,
  type CompletionContext,
  type CompletionSource,
  type TagConfig,
} from 'prism-code-editor/autocomplete';

const completionsFromRecords = (
  records: (Record<string, unknown> | undefined)[],
  icon?: Completion['icon']
): Completion[] => {
  const names = new Set<string>();

  records.forEach((tags) => {
    for (let key in tags) names.add(key);
  });

  return Array.from(names, (name) => ({
    label: name,
    icon: icon,
  }));
};

const tagPattern =
  /\{\{$|\{\{(?!\*)([^\s=}${%]+)(?:\s(?:\s*([^\s/"'=}]+)(?:\s*=\s*(?!\s)(?:"[^"]*(?:"|$)|'[^']*(?:'|$)|[^\s"'=}]+(?!\S))?|(?![^\s=])))*\s*)?$/;

/**
 * `false` is returned if completion shouldn't happen at the current position.
 * `null` is returned if the cursor isn't in a tag.
 *
 * If completion should happen and the cursor is in a tag, a match array is
 * returned. The match has two capturing groups; the tag's name and the last attribute's
 * name.
 *
 * @param pattern Regular expression used to check if there's a partial tag before the
 * cursor.
 */
const getTagMatch = (
  { explicit, before, pos }: CompletionContext,
  editor: PrismEditor,
  pattern = tagPattern
) => {
  return getClosestToken(editor, '.comment', 0, 0, pos) ||
    (!explicit && /\s/.test(before.slice(-1)))
    ? false
    : pattern.exec(before);
};

/**
 * Completion source that adds auto completion for specified tags.
 * @param namespaces Array of different namespaces of tags you want to provide
 * completions for. The `tags` property maps tag names in that namespace to completable
 * attributes for that tag. The optional `globals` property allows you to override the
 * global attributes shared by all tags in the namespace. If omitted, the
 * `globalAttributes` parameter is used.
 * @param globalAttributes Default global attributes. Used by unrecognized tags or when
 * the `globals` property is omitted.
 *  @param nestedSource Completion source that will be used whenever the completion isn't
 * happening inside a tag. Can be used to provide completions for snippets for example.
 * @returns A Completion source.
 */
const brindilleCompletion = (
  namespaces: {
    tags: TagConfig;
    globals?: AttributeConfig;
  }[],
  globalAttributes?: AttributeConfig,
  nestedSource?: CompletionSource
): CompletionSource => {
  return (context, editor) => {
    const tagMatch = getTagMatch(context, editor);

    if (tagMatch) {
      let [tag, tagName, lastAttr] = tagMatch;
      let start = tagMatch.index;
      let from = start + 2;
      let options: Completion[] | undefined;

      if (/\s/.test(tag)) {
        let inAttrValue = /=\s*(?:"[^"]*|'[^']*|[^\s"'=]*)$/.test(tag);
        let i = 0;

        for (; ; i++) {
          let tags = namespaces[i]?.tags;
          let globals = namespaces[i]?.globals || globalAttributes;
          let tagAttrs = tags?.[tagName];

          if ((!tags && globals) || tagAttrs) {
            if (inAttrValue) {
              var attributes = tagAttrs?.[lastAttr] ?? [];

              // Make sure we don't suggest true/false/null values if there are quotes (string)
              if (attributes.indexOf('true') >= 0 && !tag.match(/=\s*$/)) {
                attributes = [];
              }

              options = attributes.map((val) => ({
                label: val,
                icon: 'unit',
              }));
            } else {
              options = completionsFromRecords([tagAttrs, globals], 'enum');
            }
            break;
          }
        }

        from = start + tag.search(/[^\s"'=]*$/);
      } else {
        options = completionsFromRecords(
          namespaces.map((n) => n.tags),
          'property'
        );
      }

      if (options) {
        return {
          from,
          options,
        };
      }
    }

    if (tagMatch != false) return nestedSource?.(context, editor);
  };
};

export { brindilleTags } from './data.ts';
export { brindilleCompletion, getTagMatch };
