import { BlockType } from 'src/constants';
import { PageSnapshot } from 'src/typing/editor';
import * as Y from 'yjs';
import { TypedMap } from 'yjs-types';

export function getPage(doc: Y.Doc) {
  // ts issue： https://github.com/yjs/yjs/issues/352
  const page = doc.getMap(BlockType.Page) as TypedMap<PageSnapshot>;

  return page;
}