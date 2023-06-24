import '../Global.css';

import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ALLDELETE } from '../reducer/QuestionReducer';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 50px;
	button {
		background: #673ab7;
		color: white;
		border-radius: 5px;
		padding: 10px 20px;
	}
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.color {
		color: rgba(0, 0, 0, 0.6);
		margin-right: 10px;
		&:hover {
			cursor: pointer;
		}
	}
	div {
		font-size: 13px;
		color: #673ab7;
		font-weight: bold;
		&:hover {
			cursor: pointer;
		}
	}
`;

function Submit() {
	const dispatch = useDispatch();

	const deleteHandler = () => {
		dispatch(ALLDELETE());
	};

	return (
		<Main>
			<Link to="/submit">
				<button>제출</button>
			</Link>
			<Content>
				<div onClick={deleteHandler}>양식지우기</div>
			</Content>
		</Main>
	);
}

export default Submit;
