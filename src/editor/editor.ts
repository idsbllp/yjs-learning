import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { getPage } from 'src/helper/doc';
import KeyEvent from './key-event';
import { ViewMap } from 'src/view/config';
import { BlockType } from 'src/constants';
import EditorSelection from './selection';

let index = 1;

class Editor {
  doc = new Y.Doc();

  selection = new EditorSelection();

  keyEvent: KeyEvent;

  constructor(private editorElement: HTMLDivElement) {
    this.createWs(this.doc).then(this.handleDocSynced);
    
    (window as any)[`editor${index++}`] = this;

    this.keyEvent = new KeyEvent(this.editorElement, this);
  }

  private createWs(doc: Y.Doc) {
    return new Promise<void>(resolve => {
      const provider = new WebsocketProvider('ws://localhost:1234', 'my-roomname1', doc);
      
      provider.on('status', (event: { status: 'connected' | 'disconnected' }) => {
        if (event.status === 'connected') {
          resolve?.();
        }
      });
    
      (doc as any).provider = provider;
    
      provider.ws!.onclose = (...args: any[]) => {
        console.log('on close', ...args);
        this.createWs(doc);
      }
    });
  }

  private handleDocSynced = () => {
    const page = getPage(this.doc);
    let text = page.get('text');

    const PageBlock = ViewMap[BlockType.Page];
  
    if (!text) {
      text = new Y.Text();
      page.set('text', text)
    }
  
    const view = new PageBlock.View(page);
  
    const pageHTML = view.render();

    this.editorElement.innerHTML = pageHTML;
  
    text.observe((event, tr) => {
      console.log('logllp 变化了 event, tr', tr);
      if (!tr.local) {
        this.editorElement.innerHTML = view.update();
      }
    });
  
    page.observe(function(event, tr) {
      console.log('logllp 变化了 event, tr');
    });
  
    console.log('pageText', pageHTML);
  }
}

export default Editor;
