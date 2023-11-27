import { BlockType } from 'src/constants';
import { PageBlockSnapshot } from 'src/typing/editor';
import { TypedMap } from 'src/typing/yjs';

class PageView {
  private type = BlockType.Page;

  constructor(private map: TypedMap<PageBlockSnapshot>) {}

  update() {
    return this.render();
  }

  render() {
    const text = this.map.get('text');
    const pageText = text?.toJSON();
    const div = document.createElement('div');
    div.className = this.type;
    div.innerText = pageText || '';

    return div.outerHTML;
  }
}

export default PageView;
