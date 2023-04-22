import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import Donate from './Donate.vue';
import ImagePreviewLayout from './ImagePreviewLayout.vue';
import Music from '../../components/Music.vue';
import Weather from '../../components/Weather.vue';
import Comment from './Comment.vue';
import './custom.scss';

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-top': () => h(Weather),
      'aside-outline-after': () => h(Donate),
      'doc-top': () => h(ImagePreviewLayout),
      'doc-before': () => h(Music),
      'doc-after': () => h(Comment),
    });
  },
};
