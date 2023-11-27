import { BlockType } from 'src/constants';
import PageView from './page';
import PageModel from 'src/model/page';

export const ViewMap = {
  [BlockType.Page]: {
    Model: PageModel,
    View: PageView,
  },
  [BlockType.Text]: {
    Model: PageModel,
    View: PageView,
  }
}