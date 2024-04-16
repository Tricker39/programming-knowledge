const fs = require('fs');
const path = require('path');
const emoji = require('./emoji.json');
// console.log(emoji)
let emojiStr = '';

try {
  let tempStr = '';
  Object.keys(emoji).map((item) => {
    tempStr += `<span class='emoji-item'><span class='emoji-item-icon'>:${item}:</span><span data-text='${item}' class='emoji-item-text'>${item}</span></span>`;
  });
  emojiStr = `<span class='emoji-box'>${tempStr}</span>`;
} catch (e) {
  //TODO handle the exception
  console.log(e);
}

// console.log(__dirname)
// 判断文件是否存在
const filePath = path.resolve(__dirname, './docs/emoji.md');
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  // 存在文件，则将 emoji 写入文件
  fs.writeFile(filePath, emojiStr, (err) => {
    console.log(err);
    if (err) {
      return;
    }
  });
});
