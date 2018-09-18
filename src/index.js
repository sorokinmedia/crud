export function insertIntoStr(str, pos, toIn) {
	return str.substr(0, pos) + toIn + str.substr(pos, str.length)
}

export function replaceInStr(str, begin, start, subj) {
	return str.slice(0, begin)
		+ subj
		+ str.slice(start, str.length)
}

export function stripTags(str) {
	return str.replace(/<[^>]*>/gi, '');
}

export function parseAllATags(str) {
	const res = str.match(/<a href=[^>]+>(.+?)<\/a>/g);
	return res ? res : []
}

export function stripATags(str) {
	return str.replace(/<a[^>]*>/gi, '').replace(/<[^>]*a>/gi, '');
}

export function buildUrlSearch(params) {
	if(!params) return '';

	const res =
		Object
			.keys(params)
			.reduce((acc, key) => params[key] || params[key] === 0 || params[key] === false || params[key] === 'false' ?
				acc + (!acc ? '' : '&') + `${key}=${params[key]}`
			: acc, '');
	return res ? `?${res}` : ''
}

export function buildUrlSearchForArray(arr, arrName) {
	return arr.reduce((acc, elem) => acc + (acc ? '&' : '') + `${arrName}[]=${elem}`, '')
}