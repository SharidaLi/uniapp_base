function getDict() {
	const dict = uni.getStorageSync('dict')
	if (!dict || !Object.keys(dict).length) {
		uni.reLaunch({
			url: '/pages/login/index'
		})		
		return
	}
	return dict
}

export const getValueByKey = (key, value) => {
	const dict = getDict() || []
	let res = ''
	dict.map((item) => {
		if (item.type === key && item.k == value) {
			res = item.v
		}
	})
	if (res) {
		return res
	} else {
		return '未知变量'
	}
}

export const getTypeList = (type) => {
	const dict = getDict() || []
	const list = []
	dict.map(function(ele) {
		if (ele.type === type) {
			list.push(ele)
		}
	})
	return list
}
