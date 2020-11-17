import dayjs from "dayjs"

export const timeFormat = (time, type = 'YYYY-MM-DD HH:mm:ss') => {
	return dayjs(time).format(type)
}
