import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Iquestion, Iquestions } from '../type/Iquestion';

/*
const initialState: Iquestions = [
	{
		id: 1,
		title: '제목없는 질문',
		type: '단답형',
		isNecessary: false,
		radio: [
			{
				id: 1,
				option: '옵션1',
			},
		],
		checkbox: [
			{
				id: 1,
				option: '',
			},
		],
		select: [
			{
				id: 1,
				option: '',
			},
		],
	},
];
*/

const initialState: Iquestions = [];

const userInfoSlice = createSlice({
	name: 'questionList',
	initialState,
	reducers: {
		ADD: (state: Iquestions, action: PayloadAction<Iquestion>): Iquestions => {
			return [...state, { ...action.payload }];
		},
		EDIT: (
			state: Iquestions,
			action: PayloadAction<Iquestions>,
		): Iquestions => {
			return [...action.payload];
		},
		ALLDELETE: (): Iquestions => {
			return [...initialState];
		},
	},
});

export const { ADD, EDIT, ALLDELETE } = userInfoSlice.actions;
export default userInfoSlice.reducer;
