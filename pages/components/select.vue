<template>
	<view>
		<lv-select @handleSearch="handleSearch" @change="change" placeholder="请输入信息" :infoList="infoList" :showValue="showValue"
		 v-model="searchValue" :loading="loading" type="primary" :uniShadow="true" />
	</view>

</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				showValue: 'name', // 需要显示的数据，必须与infoList中的name对应
				searchValue: '',
				infoList: [],
				infoLists: [{
					name: '吕星辰1'
				}, {
					name: '吕星辰2'
				}, {
					name: '吕星辰3'
				}, {
					name: '吕星辰4'
				}]
			}
		},
		methods: {
			handleSearch() {
				this.loading = true
				setTimeout(() => {
					this.loading = false
					this.infoList = this.infoLists
				}, 2000)
			},
			change(val) {
				console.log(val)
			}
		}
	}
</script>

<style>
</style>
