import { ValueOf } from '@models/common';

import { routerPaths } from '@/constants/routerPaths';

export type NavLink = {
	id: number;
	text: string;
	path: ValueOf<typeof routerPaths>;
};
