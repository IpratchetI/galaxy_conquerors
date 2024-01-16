export const abbreviateNumber = (number: number, decPlaces: number): string => {
	decPlaces = Math.pow(10, decPlaces);

	const abbrev = ['K', 'M', 'B', 'T'];
	const abbreviateThreshold = 1000;

	if (number < abbreviateThreshold) {
		return number.toLocaleString('ru-RU');
	}

	for (let i = abbrev.length - 1; i >= 0; i--) {
		const size = Math.pow(10, (i + 1) * 3);

		if (size <= number) {
			number = Math.round((number * decPlaces) / size) / decPlaces;

			if (number === abbreviateThreshold && i < abbrev.length - 1) {
				number = 1;
				i++;
			}

			return number.toLocaleString('ru-RU') + abbrev[i];
		}
	}
	return number.toLocaleString('ru-RU');
};
