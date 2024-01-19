import { classnames } from '.';

describe('classnames', () => {
	test('classnames with default class', () => {
		expect(classnames('defaultClass')).toBe('defaultClass');
	});

	test('classnames with additional classes', () => {
		const result = 'defaultClass class1 class2';

		expect(classnames('defaultClass', {}, ['class1', 'class2'])).toBe(result);
	});

	test('classnames with mods', () => {
		const result = 'defaultClass class1 class2 hovered scrolled';

		expect(
			classnames('defaultClass', { hovered: true, scrolled: true }, ['class1', 'class2'])
		).toBe(result);
	});

	test('classnames with disabled mod', () => {
		const result = 'defaultClass class1 class2 hovered';

		expect(
			classnames('defaultClass', { hovered: true, scrolled: false }, ['class1', 'class2'])
		).toBe(result);
	});

	test('classnames with undefined mod', () => {
		const result = 'defaultClass class1 class2 hovered';

		expect(
			classnames('defaultClass', { hovered: true, scrolled: undefined }, ['class1', 'class2'])
		).toBe(result);
	});
});
