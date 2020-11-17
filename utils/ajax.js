import api from "./config.js"

let hasClick = false

const http = (method, url, data, mask = true) => {
	if (hasClick) {
		return {
			message: ''
		}
	}
	hasClick = true
	if (mask) {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}

	return new Promise((resolve, reject) => {
		uni.request({
			method,
			url: `${url}`,
			data,
			header: {
				// "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
			},
			success: function(res) {
				resolve(res.data)
			},
			fail: function(error) {
				reject(error)
			},
			complete: res => {
				if (mask) {
					uni.hideLoading()
				}
				hasClick = false
			}
		})
	})
}

// 文件上传接口
const file = (filePath) => {
	uni.showLoading({
		title: '上传中...',
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: api.uploadFile,
			filePath,
			name: 'file',
			success(res) {
				if (res.statusCode === 200) {
					resolve(JSON.parse(res.data))
				} else {
					resolve(res.errMsg)
				}
			},
			fail(error) {
				reject(error)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}

const ajax = {
	get: (url, data) => http('GET', url, data),
	post: (url, data) => http('POST', url, data),
	put: (url, data) => http('PUT', url, data),
	delete: (url, data) => http('DELETE', url, data),
	file: (path) => file(path),
}

export default ajax
