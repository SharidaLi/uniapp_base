<template>
	<view class="">
		<u-upload ref="imgUpload" :size-type="['compressed']" :action="action" :compressionRatio="10"></u-upload>
		<u-button @click="submit">确认</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action: 'https://ycdz.codvision.com/api/v6/oss/upload/file'
			}
		},
		methods: {
			submit() {
				console.log(this.$refs.imgUpload)
			}
		}
	}
</script>

<style>
</style>
