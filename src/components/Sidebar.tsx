import '../Global.css';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { ADD } from '../reducer/QuestionReducer';
import { RootState } from '../store/Store';
import { Iquestion, Iquestions } from '../type/Iquestion';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: white;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 10px;
	box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.4);
	&:hover {
		cursor: pointer;
		background: rgba(255, 255, 255, 0.5);
	}
	.color {
		color: rgba(0, 0, 0, 0.6);
	}
`;

function Sidebar() {
	const dispatch = useDispatch();
	const nowQuestion = useSelector(
		(state: RootState) => state.nowQuestion,
	) as Iquestion;

	const questions = useSelector(
		(state: RootState) => state.question,
	) as Iquestions;

	const addHandler = () => {
		//현재 질문을 질문목록에 추가
		dispatch(ADD({ ...nowQuestion, id: questions.length + 1 }));
	};
	return (
		<Main>
			<AddCircleOutlineOutlinedIcon onClick={addHandler} className="color" />
		</Main>
	);
}

export default Sidebar;
