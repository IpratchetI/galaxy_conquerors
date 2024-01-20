import { ErrorContent, ErrorType } from '../types';

export const errorContent: Record<ErrorType, ErrorContent> = {
	'500': {
		title: '500',
		description: 'we already fix it'
	},
	'404': {
		title: '404',
		description: 'wrong way, turn around'
	},
	common: {
		title: 'Oops',
		description: 'Radar broken, so do not get lost, start over'
	}
};
