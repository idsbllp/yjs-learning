import * as Y from 'yjs'
import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import { WebsocketProvider } from 'y-websocket'

let index = 1;
(window as any).decoding = decoding;

const readMessage = (provider: WebsocketProvider, buf: Uint8Array, emitSynced = true) => {
  const decoder = decoding.createDecoder(buf)
  const encoder = encoding.createEncoder()
  const messageType = decoding.readVarUint(decoder)
  const messageHandler = provider.messageHandlers[messageType]
  if (messageHandler) {
    messageHandler(encoder, decoder, provider, emitSynced, messageType)
  } else {
    console.error('Unable to compute message')
  }
  return encoder
}

export function createDoc(onConnected: (doc: Y.Doc) => void) {
  const doc = new Y.Doc();
  const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname1', doc);
  
  wsProvider.on('status', (event: { status: 'connected' | 'disconnected' }) => {
    if (event.status === 'connected') {
      onConnected(doc);
    }
  });

  wsProvider.ws!.onmessage = message => {
    console.log('on sync', message.data);
    const buffer = new Uint8Array(message.data);
    console.log('on sync 111', readMessage(wsProvider, buffer));
  };

  // wsProvider.on('')

  (window as any)[`doc${index++}`] = doc;

  return doc;
}
