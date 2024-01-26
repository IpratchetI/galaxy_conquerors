import React, { useCallback, useEffect, useRef } from 'react';
import { LeaderboardRequest } from '@models/api/leaders';
import { LoadingMeta } from '@models/common';
import { ButtonVariant } from '@components/Button';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLeaders } from '@/store/reducers/leaders/leadersActionCreator';
import { Button, Spacer, Text } from '@/components';

import s from './highscoreList.module.scss';

// todo: добавить нормальную развернутую пагинацию/фильтрацию
export const HighscoreList: React.FC = () => {
	const { leaders, error: leadersError, isLoading } = useAppSelector(state => state.leadersState);
	const dispatch = useAppDispatch();
	const filterData = useRef<LeaderboardRequest>({
		limit: 10,
		cursor: 0,
		ratingFieldName: 'winsAmount'
	});

	useEffect(() => {
		dispatch(getLeaders(filterData.current));
	}, []);

	const handleGetPage = useCallback((pageDirection: number) => {
		filterData.current = {
			...filterData.current,
			cursor: Math.max(0, filterData.current.cursor + pageDirection)
		};

		dispatch(getLeaders(filterData.current));
	}, []);

	if (isLoading === LoadingMeta.Loading) {
		return (
			<Text align="center" size="m">
				Loading...
			</Text>
		);
	}

	if (leadersError?.reason) {
		return (
			<Text size="s" variant="error">
				{leadersError?.reason}
			</Text>
		);
	}

	return (
		<Spacer justify="center" align="center" gap="26" direction="column">
			<ul className={s.highscoreList}>
				{leaders.map(({ data }, index) => (
					<li key={index}>
						<span>{data.name}:</span>
						<span>{data[filterData.current.ratingFieldName]}</span>
					</li>
				))}
			</ul>
			<Spacer justify="between" fullWidth>
				<Button
					variant={ButtonVariant.TEXT}
					disabled={filterData.current.cursor === 0}
					onClick={() => handleGetPage(-1)}>
					Prev page
				</Button>
				<Button variant={ButtonVariant.TEXT} onClick={() => handleGetPage(1)}>
					Next page
				</Button>
			</Spacer>
		</Spacer>
	);
};
