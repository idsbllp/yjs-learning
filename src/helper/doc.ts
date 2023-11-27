import { BlockType } from 'src/constants';
import { PageBlockSnapshot } from 'src/typing/editor';
import { TypedMap } from 'src/typing/yjs';
import * as Y from 'yjs';

export function getPage(doc: Y.Doc) {
  // ts issue： https://github.com/yjs/yjs/issues/352
  const page = doc.getMap(BlockType.Page) as TypedMap<PageBlockSnapshot>;

  return page;
}