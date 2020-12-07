// 判断浏览器是否支持对图片进行回正操作
// 一张 2x1 的 JPEG 图片, EXIF Orientation: 6
const testAutoOrientationImageURL =
	'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAA' +
	'AAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBA' +
	'QEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE' +
	'BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/x' +
	'ABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAA' +
	'AAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q=='
let isImageAutomaticRotation

export function judgeAutoCorrectionSync() {
	return new Promise((resolve) => {
		if (isImageAutomaticRotation === undefined) {
			const img = new Image()
			img.onload = () => {
				// 如果图片变成 1x2，说明浏览器对图片进行了回正
				isImageAutomaticRotation = img.width === 1 && img.height === 2
				resolve(isImageAutomaticRotation)
			}
			img.src = testAutoOrientationImageURL
		} else {
			resolve(isImageAutomaticRotation)
		}
	});
}

function getImageInfoSync(src) {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src,
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

function canvasToTempFilePathSync(canvasId) {
	return new Promise((resolve, reject) => {
		console.log(canvasId);

		uni.canvasToTempFilePath({
			canvasId,
			fileType: 'jpg',
			success: (res) => {
				console.log(res)
				resolve(res)
			},
			fail: (err) => {
				console.log(err);
				reject(err)
			},
			complete: (e) => {
				console.log(e);
			}
		})
	})
}

import {
	EXIF
} from "exif-js"

//imgFile 为 文件类型
const rotateImg = (imgFile, percentage) => {
	return new Promise((resolve, reject) => {
		try {
			EXIF.getData(imgFile, function() {
				let exifTags = EXIF.getAllTags(imgFile);
				let reader = new FileReader();
				reader.readAsDataURL(imgFile);
				reader.onload = async e => {
					let imgData = e.target.result;
					judgeAutoCorrectionSync().then(res => {
						//res为true时。浏览器支持对带 EXIF 信息的图片进行自动回正
						if (res) {
							const img = new Image();
							img.src = imgData;
							img.onload = function() {
								let cvs = document.createElement('canvas');
								let ctx = cvs.getContext('2d');

								const {
									width,
									height
								} = img

								cvs.width = width;
								cvs.height = height;

								ctx.drawImage(img, 0, 0, width, height);
								
								const base64Data = cvs.toDataURL('image/jpeg', percentage / 100);
								resolve(base64Data);
							}
						}

						//res为false时。执行js，对带 EXIF 信息的图片进行回正
						// 8 表示 顺时针转了90
						// 3 表示 转了 180
						// 6 表示 逆时针转了90
						if (
							exifTags.Orientation == 8 ||
							exifTags.Orientation == 3 ||
							exifTags.Orientation == 6
						) {
							//翻转
							//获取原始图片大小
							const img = new Image();
							img.src = imgData;
							img.onload = function() {
								let cvs = document.createElement('canvas');
								let ctx = cvs.getContext('2d');
								//如果旋转90
								if (
									exifTags.Orientation == 8 ||
									exifTags.Orientation == 6
								) {
									cvs.width = img.height;
									cvs.height = img.width;
								} else {
									cvs.width = img.width;
									cvs.height = img.height;
								}
								if (exifTags.Orientation == 6) {
									//原图逆时针转了90, 所以要顺时针旋转90
									ctx.rotate(Math.PI / 180 * 90);
									ctx.drawImage(
										img,
										0,
										0,
										img.width,
										img.height,
										0,
										-img.height,
										img.width,
										img.height
									);
								}
								if (exifTags.Orientation == 3) {
									//原图逆时针转了180, 所以顺时针旋转180
									ctx.rotate(Math.PI / 180 * 180);
									ctx.drawImage(
										img,
										0,
										0,
										img.width,
										img.height,
										-img.width,
										-img.height,
										img.width,
										img.height
									);
								}
								if (exifTags.Orientation == 8) {
									//原图顺时针旋转了90, 所以要你时针旋转90
									ctx.rotate(Math.PI / 180 * -90);
									ctx.drawImage(
										img,
										0,
										0,
										img.width,
										img.height,
										-img.width,
										0,
										img.width,
										img.height
									);
								}

								// ctx.font = "30px Microsoft YaHei";
								// ctx.fillStyle = "#FFC82C";
								// ctx.textAlign = 'right';
								// ctx.fillText("Hello World", img.width - 20, img.height - 20);

								const base64Data = cvs.toDataURL('image/jpeg', percentage / 100);
								resolve(base64Data);
							}
						} else {
							// resolve(imgData)
						}
					})
				}
			});
		} catch (e) {
			console.log(e)
		}
	});
}

export default rotateImg
