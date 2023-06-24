import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Ititle } from '../type/Ititle';

const initialState: Ititle = {
	title: '제목없는 설문지',
	detail: '설문지 설명',
};

const userInfoSlice = createSlice({
	name: 'title',
	initialState,
	reducers: {
		UPDATE: (state: Ititle, action: PayloadAction<Ititle>): Ititle => {
			return { ...state, ...action.payload };
		},
	},
});

export const { UPDATE } = userInfoSlice.actions;
export default userInfoSlice.reducer;
