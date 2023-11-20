import { YArray, YText } from 'yjs/dist/src/internals';

export type PageSnapshot = {
  text: YText;
  children?: YArray<TextSnapshot>;
}

export interface TextSnapshot {
  text: YText;
  // children: YArray<YText>;
}
