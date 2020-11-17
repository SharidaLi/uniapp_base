let baseUrl = '/api'

const api = {
	login: `${baseUrl}/auth/login`,
	getDict: `${baseUrl}/dict`, // 获取字典接口
	imgPath: `${baseUrl}/image/files?path=`, // 图片前缀
	uploadFile: `${baseUrl}/upload/index`, //上传文件
}

export default api
