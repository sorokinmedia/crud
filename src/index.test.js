import {
	insertIntoStr,
	replaceInStr,
	stripTags,
	stripATags,
	buildUrlSearchForArray,
	buildUrlSearch,
	parseAllATags,
} from './index'

let str, aStr = '';

describe('string helper methods', () => {

	beforeAll(() => {
		str = 'test string';
		aStr = 'Its a <a href="https//:qwerty.com" target="_blank">link</a> for test.' +
			' Hope <a href="https//:qwerty.com">it</a> works.'
	});

	it('should insert into string', () => {
		expect(insertIntoStr(str, 5, 'word ')).toEqual('test word string')
	});

	it('should replace in string', () => {
		expect(replaceInStr(str, 5, 5, 'word ')).toEqual('test word string')
	});

	it('should replace in string', () => {
		expect(stripTags('<div>' + str + '</div>')).toEqual(str)
	});

	it('should replace a tag in string', () => {
		expect(stripATags('<a href="https//:qwerty.com">' + str + '</a>')).toEqual(str)
	});

	it('should build a part of url search string from array', () => {
		expect(buildUrlSearchForArray([1,2], 'array')).toEqual('array[]=1&array[]=2')
	});

	it('should build an url search string from object', () => {
		expect(buildUrlSearch({param1: 1, param2: 2})).toEqual(`?param1=1&param2=2`)
	});

	it('should parse all a tags', () => {
		expect(parseAllATags(aStr).map(elem => stripATags(elem))).toEqual(['link', 'it'])
	});
});
