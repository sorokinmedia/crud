'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function insertIntoStr(str, pos, toIn) {
	return str.substr(0, pos) + toIn + str.substr(pos, str.length);
}

function replaceInStr(str, begin, start, subj) {
	return str.slice(0, begin) + subj + str.slice(start, str.length);
}

function stripTags(str) {
	return str.replace(/<[^>]*>/gi, '');
}

function parseAllATags(str) {
	var res = str.match(/<a href=[^>]+>(.+?)<\/a>/g);
	return res ? res : [];
}

function stripATags(str) {
	return str.replace(/<a[^>]*>/gi, '').replace(/<[^>]*a>/gi, '');
}

function buildUrlSearch(params) {
	if (!params) return '';

	var res = Object.keys(params).reduce(function (acc, key) {
		return params[key] || params[key] === 0 || params[key] === false || params[key] === 'false' ? acc + (!acc ? '' : '&') + (key + '=' + params[key]) : acc;
	}, '');
	return res ? '?' + res : '';
}

function buildUrlSearchForArray(arr, arrName) {
	return arr.reduce(function (acc, elem) {
		return acc + (acc ? '&' : '') + (arrName + '[]=' + elem);
	}, '');
}

exports.insertIntoStr = insertIntoStr;
exports.replaceInStr = replaceInStr;
exports.stripTags = stripTags;
exports.parseAllATags = parseAllATags;
exports.stripATags = stripATags;
exports.buildUrlSearch = buildUrlSearch;
exports.buildUrlSearchForArray = buildUrlSearchForArray;
