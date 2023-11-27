import { BlockType } from 'src/constants';
import { YArray, YText } from 'yjs/dist/src/internals';

interface BlockSnapshot {
  type: BlockType;
  id: string;
  children?: YArray<BlockSnapshot>;
}

export interface PageBlockSnapshot extends BlockSnapshot {
  text: YText;
}

export interface TextSnapshot extends BlockSnapshot {
  text: YText;
  // children: YArray<YText>;
}
