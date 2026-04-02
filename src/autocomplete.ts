import {
  registerCompletions,
  //autoComplete,
  //fuzzyFilter,
  //completeFromList,
  TagConfig,
  AttributeConfig,
} from 'prism-code-editor/autocomplete';
import { cssCompletion } from 'prism-code-editor/autocomplete/css';
/*
import {
  completeKeywords,
  globalReactAttributes,
  jsCompletion,
  jsContext,
  jsDocCompletion,
  jsSnipets,
  jsxTagCompletion,
  reactTags,
} from 'prism-code-editor/autocomplete/javascript';
*/
import {
  markupCompletion,
  htmlTags,
  globalHtmlAttributes,
} from 'prism-code-editor/autocomplete/markup';

// Required styles for the extension
import 'prism-code-editor/autocomplete.css';
import 'prism-code-editor/autocomplete-icons.css';

/*
registerCompletions(['javascript', 'typescript', 'jsx', 'tsx'], {
  context: jsContext,
  sources: [
    jsCompletion(window),
    completeKeywords,
    jsDocCompletion,
    jsxTagCompletion(reactTags, globalReactAttributes),
    completeFromList(jsSnipets),
  ],
});
*/

registerCompletions(['css'], {
  sources: [cssCompletion()],
});

const namespaces: {
  tags: TagConfig;
  globals?: AttributeConfig;
}[] = [{ tags: htmlTags }];

// TODO: remove Brindille here
registerCompletions(['html', 'markup'], {
  sources: [markupCompletion(namespaces, globalHtmlAttributes)],
});

///*
// TODO Brindille completion
import {
  brindilleCompletion,
  brindilleTags,
} from './brindille/autocomplete.ts';
//import { brindilleTags } from './brindille/data.ts';

const bnamespaces = [{ tags: brindilleTags }];

registerCompletions(['brindille'], {
  sources: [
    markupCompletion(namespaces, globalHtmlAttributes),
    brindilleCompletion(bnamespaces),
  ],
});
//*/
