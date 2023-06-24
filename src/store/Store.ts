// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { persistReducer } from 'redux-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import storage from 'redux-persist/lib/storage/session';

import { configureStore, Store } from '@reduxjs/toolkit';

import nowQuestionReducer from '../reducer/nowQuestionReducer';
import QuestionReducer from '../reducer/QuestionReducer';
import TitleReducer from '../reducer/TitleReducer';
import { Iquestion, Iquestions } from '../type/Iquestion';
import { Ititle } from '../type/Ititle';

const reducers = combineReducers({
	question: QuestionReducer,
	title: TitleReducer,
	nowQuestion: nowQuestionReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['question', 'title', 'nowQuestion'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export type RootState = {
	question: Iquestions;
	title: Ititle;
	nowQuestion: Iquestion;
};

const store: Store<RootState> = configureStore({
	reducer: persistedReducer,
});

export default store;
