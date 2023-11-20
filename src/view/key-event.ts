import { getPage } from 'src/helper/doc';
import * as Y from 'yjs';

function handleKeydown(evt: KeyboardEvent, doc: Y.Doc) {
  const { key } = evt;

  switch (key) {
    case 'Enter':
      
      break;
    case 'Backspace':
      
      break;
  
    default:
      break;
  }
}

function handleInput(evt: InputEvent, doc: Y.Doc) {
  if (evt.isComposing) {
    return;
  }
  const page = getPage(doc);
  const text = page.get('text');

  const index = 0;

  text?.insert(index, evt.data || '');

  console.log('logllp', evt.data, evt.isComposing)
}

function handleCompositionEnd(evt: CompositionEvent, doc: Y.Doc) {
  console.log('logllp 1111111111', evt.data)
}

export function bindEvent(editorElement: HTMLElement, doc: Y.Doc) {
  editorElement.addEventListener('keydown', evt => {
    handleKeydown(evt, doc)
  });

  editorElement.addEventListener('input', (evt: InputEvent) => {
    handleInput(evt, doc)
  });

  editorElement.addEventListener('compositionend', evt => {
    handleCompositionEnd(evt, doc);
  });
}
