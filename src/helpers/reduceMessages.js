export default function reduceMessages(messages, parseNameFunc = name => name) {
	return messages.reduce((acc, elem) => {
		if (elem.targetField) acc[parseNameFunc(elem.targetField)] = elem.message;
		return acc;
	}, {});
}
