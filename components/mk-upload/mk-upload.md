
## 特别提醒
- 默认样式可能无法满足你，如果修改样式,变量样式必须放在最外层`app.vue`里面，当然你可以直接修改插件
- 组件使用less编译，HBuilderX需要安装less插件 【工具-插件安装-搜索less】
- 所有数据交互,组件不做任何处理,请自行使用`onChoose`，`onDelete`事件处理完毕后返回给组件`imglist`, 注意使用了两级反转,`index`也是正序的,和`原imglist`数组对应,不要参考看见的视图index
- 上传成功后，`imglist`更新条数，只需要使用数组方法`push`即可，两级反转只是视图更新，和数据不关联
- 页面使用`flex`布局，理论上只要支持`flex`布局，就不会存在问题
- 如果使用中，有任何问题，欢迎留言

### 在页面script中引入组件，并注册组件
```
import mkUpload from "@/components/mk-upload/mk-upload.vue"
export default {
   components: {
	  mkUpload
   },
}
```

### 页面中使用
```
<mk-upload :imgList="imgList" />
```

### 下面是一个完整示例
```
<template>
	<view class="test">
		<view class="demo-title">修改皮肤样式</view>
		<mk-upload :imgList="imgList" />
		
		<view class="demo-title">删除位置左上</view>
		<mk-upload :imgList="imgList" deletePosition="topLeft" />
		
		<view class="demo-title">删除位置左下</view>
		<mk-upload :imgList="imgList" deletePosition="bottomLeft" />
		
		<view class="demo-title">删除位置右下</view>
		<mk-upload :imgList="imgList" deletePosition="bottomRight" /> 
		
		<view class="demo-title">显示4个</view>
		<mk-upload :imgList="imgList" column="4" />
		
		<view class="demo-title">显示5个</view>
		<mk-upload :imgList="imgList" column="5" />
		
		
		<view class="demo-title">两级反转</view>
		<mk-upload
			reverse
			:imgList="imgList"
		/>
		
		<view class="demo-title">事件接管,看console控制台</view>
		<mk-upload 
			:imgList="imgList"
			@onDeleteTake="onDeleteTake" 
			@onPreviewTake="onPreviewTake"
		/>
		
		<view class="demo-title">只展示</view>
		<mk-upload
			:deleteShow="false"
			:controlShow="false"
			:imgList="imgList"
		/>
		
		
		
		
	</view>
</template>

<script>
	import mkUpload from "@/components/mk-upload/mk-upload.vue"
	export default {
		components: {
			mkUpload
		},
		data() {
			return {
				imgList: [
					'../../static/1.jpeg',
					'../../static/2.jpeg',
					'../../static/2.jpeg',
					'../../static/2.jpeg'
				]
			}
		},
		onLoad(){
			
		},
		methods: {
			onDelete(index){
				console.log(index)
			},
			onChoose(e){
				console.log(e)
			},
			onPreviewTake(index){
				console.log(index)
			},
			onDeleteTake(index){
				console.log(index)
			}
		}
	}
</script> 

<style lang="less" scoped>
page{
	// --mk-upload-img-height: 200upx;
	// --mk-upload-item-margin: 30upx;
	// --mk-upload_remove_color: #D1372C;
	// --mk-upload_remove_size: 50upx;
	// --mk-upload-add-size: 60upx;
	// --mk-upload-add-bgcolor: #f1f1f1;
}
.demo-title{
	padding: 15upx 0 0 30upx;
}
</style>

```



### 属性介绍
| 名称                         | 类型             | 默认值                      | 描述       |
| ----------------------------| --------------- | ---------------------------- | ------------
| imgList                     | Array           | []                         | 图片数组列表 |
| column                      | Number, String  | 3                          | 一行显示几个,可选址`2,3,4,5` |
| reverse                     | Boolean         | false                      | 两级反转,对列表进行反转,添加符号在上面 |
| controlShow                 | Boolean         | true                       | 是否显示上传按钮 |
| deleteShow                  | Boolean         | true                       | 是否显示删除按钮 |
| deletePosition              | String          | topRight                   | 删除按钮位置, 可选值`topLeft`,`topRight`,`bottomLeft`,`bottomRight`|
| sourceType                  | Array           | ['camera', 'album']        | `album` 从相册选图，`camera` 使用相机, H5不支持 |
| sizeType                    | Array           | ['original', 'compressed'] | `original` 原图，`compressed` 压缩图 |
| maxChooseCount              | Number          | 9                          | 最大一次可以选择数量，最高为9 |
| maxCount                    | Number          | 100                        | 列表最大数量，超出将不在展示新增按钮 |




### 事件介绍
| 名称                 | 说明            |
| ------------------  |------------------
| onDelete            | 删除图片的下标index|
| onChoose            | 选择图片后返回的值：选择文件的所有信息 |
| onPreviewTake       | 接管自定义图片预览，如果想点击图片做其他事情,可以添加此事件，接管后，默认预览事件会失效，返回当前图片下标index|
| onDeleteTake        | 接管自定义删除图片，如果想点击删除做其他事情，可以添加此事件， 接管后，默认删除事件失效，返回当前图片下标index|

> 注意使用了两级翻转,index也是正序的,和原imglist数组对应,不要参考看见的视图index




### 修改尺寸和自定义样式
如果默认尺寸默认无法达到你的需求，那么自定义样式你可以自由配置。根据需求添加即可
注意样式变量需要放在 `app.vue`里面全部公用。为全局变量样式，不会影响其他样式

```
page{
	--mk-upload-img-height: 200upx;
	--mk-upload-img-width: 100%;
	--mk-upload-item-margin: 30upx;
	--mk-upload_remove_color: #D1372C;
	--mk-upload_remove_size: 50upx;
	--mk-upload-add-size: 60upx;
	--mk-upload-add-bgcolor: #f1f1f1;
}
```

| 名称                 | 说明            |
| ------------------  |------------------
| --mk-upload-img-height            | 图片的宽度 |
| --mk-upload-item-margin       | 图片列与列之间的间距|
| --mk-upload_remove_color        | 删除按钮的颜色|
| --mk-upload_remove_size        | 删除按钮的大小|
| --mk-upload-add-size        | 上传图标的大小|
| --mk-upload-add-bgcolor        | 上传图片的背景色|



