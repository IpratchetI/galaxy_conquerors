import { createAction } from '@reduxjs/toolkit';

export const setSounds = createAction<boolean>('ui/setSounds');
export const setMusic = createAction<boolean>('ui/setMusic');
