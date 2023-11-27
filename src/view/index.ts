import Editor from 'src/editor/editor';


function handleCreateClick() {
  const container = document.querySelector<HTMLElement>('#container');
  const editorElement = document.createElement('div');
  editorElement.className = 'editor';
  editorElement.contentEditable = 'true';
  container?.appendChild(editorElement);
  
  const editor = new Editor(editorElement);
}

export function runView() {
  const createButton = document.querySelector<HTMLElement>('#createButton');

  createButton?.addEventListener('click', handleCreateClick);
}

handleCreateClick();
