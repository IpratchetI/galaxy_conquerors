import dotenv from 'dotenv';
dotenv.config();

export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@models/(.*)$': '<rootDir>/src/models/$1',
		'\\.(css|scss)$': 'identity-obj-proxy'
	},
	globals: {
		__SERVER_PORT__: process.env.SERVER_PORT || 3001
	},
	transform: {
		'^.+\\.svg$': '<rootDir>/svgTransform.js'
	}
};
