import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Iquestion } from '../type/Iquestion';

const initialState: Iquestion = {
	id: 1,
	title: '제목없는 질문',
	type: '단답형',
	radio: [
		{
			id: 1,
			option: '옵션',
		},
	],
	checkbox: [
		{
			id: 1,
			option: '옵션',
		},
	],
	select: [
		{
			id: 1,
			option: '옵션',
		},
	],
	isNecessary: false,
	editMode: false,
};

const userInfoSlice = createSlice({
	name: 'questionList',
	initialState,
	reducers: {
		UPDATEQUESTION: (
			state: Iquestion,
			action: PayloadAction<Iquestion>,
		): Iquestion => {
			return { ...state, ...action.payload };
		},
		DELETEQUESTION: (): Iquestion => {
			return { ...initialState };
		},
	},
});

export const { UPDATEQUESTION, DELETEQUESTION } = userInfoSlice.actions;
export default userInfoSlice.reducer;
