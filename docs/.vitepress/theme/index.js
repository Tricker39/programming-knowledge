import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Donate from './Donate.vue';
import ImagePreviewLayout from './ImagePreviewLayout.vue';
import './custom.scss';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-after': () => h(Donate),
      'doc-before': () => h(ImagePreviewLayout),
    });
  },
};
