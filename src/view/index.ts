import { createDoc } from 'src/model/editor';
import * as Y from 'yjs';
import { bindEvent } from './key-event';
import { getPage } from 'src/helper/doc';

function handleDocSynced(editorElement: HTMLElement, doc: Y.Doc) {
  const page = getPage(doc);
  const text = page.get('text');

  if (!text) {
    page.set('text', new Y.Text())
  }

  const pageText = text?.toJSON();

  if (pageText) {
    editorElement.innerText = pageText;
  }

  console.log('pageText', pageText);
}


function handleCreateClick() {
  const container = document.querySelector<HTMLElement>('#container');
  const editorElement = document.createElement('div');
  editorElement.className = 'editor';
  editorElement.contentEditable = 'true';
  container?.appendChild(editorElement);
  
  const doc = createDoc(handleDocSynced.bind(null, editorElement));

  bindEvent(editorElement, doc);
}

export function runView() {
  const createButton = document.querySelector<HTMLElement>('#createButton');

  createButton?.addEventListener('click', handleCreateClick);
}

handleCreateClick();
