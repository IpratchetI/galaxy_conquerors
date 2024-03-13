import dotenv from 'dotenv';

import type { Config } from 'jest';

dotenv.config();

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@pages/(.*)$': '<rootDir>/src/pages/$1',
		'^@assets/(.*)$': '<rootDir>/src/assets/$1',
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@models/(.*)$': '<rootDir>/src/models/$1',
		'^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
		'^@providers/(.*)$': '<rootDir>/src/providers/$1',
		'^@services/(.*)$': '<rootDir>/src/services/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
		'\\.(css|scss)$': 'identity-obj-proxy'
	},
	transform: {
		'^.+\\.(png|jpg|mp3|wav)$': '<rootDir>/src/test/transformers/imageTransformer.js',
		'^.+\\.svg$': 'jest-transformer-svg'
	},
	globals: {
		__SERVER_PORT__: process.env.SERVER_PORT || 3001,
		__API_SERVER_HOST__: process.env.SERVER_HOST || 'localhost'
	},
	testTimeout: 200000
};

export default config;
