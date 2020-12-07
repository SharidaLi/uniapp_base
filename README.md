## CSS

使用 `less` 规范 `css` 样式 , 使用 `scoped` 私有化样式

```css
<style scoped lang="scss">
</style>
```

## 项目目录
```
uniapp_base
 ├── App.vue
 ├── components
 │   ├── cv-field
 │   ├── evan-form
 │   ├── evan-form-item
 │   ├── jp-select
 │   ├── lv-select
 │   ├── mk-upload
 │   └── uni-icons
 ├── docs
 │   └── upload.md
 ├── main.js
 ├── manifest.json
 ├── node_modules
 │   ├── async-validator
 │   ├── dayjs
 │   ├── exif-js
 │   └── uview-ui
 ├── package-lock.json
 ├── package.json
 ├── pages
 │   ├── components
 │   └── index
 ├── pages.json
 ├── README.md
 ├── static
 │   ├── iconfont
 │   └── images
 ├── uni.scss
 ├── unpackage
 │   └── dist
 ├── utils
 │   ├── ajax.js
 │   ├── config.js
 │   ├── dict.js
 │   ├── filters.js
 │   ├── tool.js
 │   └── u-upload
 └── yarn.lock

```

## 注意
使用前 `u-upload` 前，参考 `docs/upload.md`


## TODO

- [ ] 表单组件模板
- [ ] 下拉刷新上拉加载封装
- [x] 图片上传组件封装(压缩，兼容性处理旋转问题, EXIF.js)
- [ ] 图片组件添加水印功能
- [ ] 单选多选组件（JP select）
- [ ] wxsdk方法封装/常用utils工具方法封装
- [ ] 小程序，公众号， 钉钉相关正规操作的流程模板
- [ ] 头部导航
- [ ] 适配h5端、微信/支付宝小程序、安卓 (条件编译)
- [ ] 常用UI布局模板/常用功能项模板
- [ ] 凸型底部栏

