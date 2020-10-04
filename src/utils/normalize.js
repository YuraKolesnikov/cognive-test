export const normalize = obj => {
	for (let key in obj) {
		if (typeof +obj[key] == 'number' && !isNaN(+obj[key])) {
			obj[key] = +obj[key]
		}
	}

	return obj
}