import Editor from 'src/editor/editor';
import { getPage } from 'src/helper/doc';

class KeyEvent {
  constructor(private editorElement: HTMLElement, private editor: Editor) {
    this.bindEvent();
  }

  private handleKeydown = (evt: KeyboardEvent) => {
    const { key } = evt;
  
    switch (key) {
      case 'Enter':
        
        break;
      case 'Backspace':
        this.handleBackspace();
        break;
      case 'Delete':
        
        break;
      default:
        break;
    }
  }

  private handleBeforeInput = (evt: InputEvent) => {
    // evt.preventDefault();
    console.log('logllp handleBeforeInput', evt.data, this.editor.selection.getSelection());
  }
  
  private handleInput = (evt: InputEvent) => {
    // evt.preventDefault();
    if (evt.isComposing) {
      return;
    }
    
    console.log('logllp handleInput', evt.data);

    this.handleInputText(evt.data || '');
  }
  
  private handleCompositionEnd = (evt: CompositionEvent) => {  
    console.log('logllp handleCompositionEnd', evt.data);

    this.handleInputText(evt.data || '');
  }
  
  private bindEvent() {
    this.editorElement.addEventListener('keydown', this.handleKeydown);
  
    this.editorElement.addEventListener('beforeinput', this.handleBeforeInput);

    this.editorElement.addEventListener('input', this.handleInput);
  
    this.editorElement.addEventListener('compositionend', this.handleCompositionEnd);
  }

  private handleInputText(content: string) {
    const page = getPage(this.editor.doc);
    const text = page.get('text')!;
  
    // TODO 选区
    const { start, end } = this.editor.selection.getSelection();
    if (start !== end) {
      text.delete(start, end - start);
    }

    text.insert(start, content);
  }

  private handleBackspace() {
    const page = getPage(this.editor.doc);
    const text = page.get('text')!;
  
    // TODO 选区
    const { start, end } = this.editor.selection.getSelection();
    text.delete(start, end - start + 1);
  }
}

export default KeyEvent;
