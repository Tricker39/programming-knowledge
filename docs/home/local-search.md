# 本地文档搜索

> 基于 minisearch，VitePress 支持使用浏览器内的索引进行模糊的全文搜索。

## 启用本地搜索

要启用这一功能，只需在你的 `.vitepress/config.ts` 文件中把 `themeConfig.search.provider` 选项设置为`'local'`：

```JavaScript
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

## 中文提示语配置

如果你想要使用中文提示词，那么你可以做一下配置

```JavaScript
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                displayDetails: '显示详情',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            }
          }
        }
      }
    }
  }
})
```

## 国际化配置

如果你想要使用中文提示词，那么你可以做一下配置

```JavaScript
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en',
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: 'Chinese',
      lang: 'zh',
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                displayDetails: '显示详情',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            }
          }
        }
      }
    }
  }
})
```

## 本地搜索全部配置

```TypeScript
interface LocalSearchTranslations {
  button?: ButtonTranslations
  modal?: ModalTranslations
}

interface ButtonTranslations {
  buttonText?: string
  buttonAriaLabel?: string
}

interface ModalTranslations {
  displayDetails?: string
  resetButtonTitle?: string
  backButtonTitle?: string
  noResultsText?: string
  footer?: FooterTranslations
}

interface FooterTranslations {
  selectText?: string
  selectKeyAriaLabel?: string
  navigateText?: string
  navigateUpKeyAriaLabel?: string
  navigateDownKeyAriaLabel?: string
  closeText?: string
  closeKeyAriaLabel?: string
}
```

## 默认配置值

```JavaScript
{
  modal: {
    displayDetails: 'Display detailed list',
    resetButtonTitle: 'Reset search',
    backButtonTitle: 'Close search',
    noResultsText: 'No results for',
    footer: {
      selectText: 'to select',
      selectKeyAriaLabel: 'enter',
      navigateText: 'to navigate',
      navigateUpKeyAriaLabel: 'up arrow',
      navigateDownKeyAriaLabel: 'down arrow',
      closeText: 'to close',
      closeKeyAriaLabel: 'escape'
    }
  }
}
```
