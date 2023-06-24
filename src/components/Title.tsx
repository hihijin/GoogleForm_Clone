import '../Global.css';

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { UPDATE } from '../reducer/TitleReducer';
import { RootState } from '../store/Store';
import { Ititle } from '../type/Ititle';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	background: white;
	margin-bottom: 10px;
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	.topLine {
		background: #673ab7;
		width: 100%;
		height: 10px;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
	}
	.blueLine {
		border-bottom-left-radius: 5px;
		border-left: 6px solid #4285f4;
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;
	input {
		padding-bottom: 5px;
		width: 92%;
		border: none;
		outline: none;

		&:focus {
			border-bottom: 2px solid #673ab7;
		}
	}
	.title {
		font-size: 30px;
		margin-bottom: 20px;
		margin: 0 30px;
		padding-top: 20px;
	}
	.description {
		margin: 30px;
		color: rgba(0, 0, 0, 0.6);
	}
`;

function Title() {
	const dispatch = useDispatch();
	const title = useSelector((state: RootState) => state.title) as Ititle;

	const titleHandler = (e: { target: { value: any } }) => {
		dispatch(
			UPDATE({
				title: e.target.value,
			}),
		);
	};

	const detailHandler = (e: { target: { value: any } }) => {
		dispatch(
			UPDATE({
				detail: e.target.value,
			}),
		);
	};

	//수정모드 활성화/비활성화 핸들러들
	const editHandler = () => {
		dispatch(
			UPDATE({
				editMode: true,
			}),
		);
	};

	const notEditHandler = () => {
		dispatch(
			UPDATE({
				editMode: false,
			}),
		);
	};

	return (
		<Main onFocus={editHandler} onBlur={notEditHandler}>
			<div className="topLine" />
			<Container className={title.editMode ? 'blueLine' : undefined}>
				<input
					onChange={titleHandler}
					className="title"
					type="text"
					value={title.title}
				/>
				<input
					onChange={detailHandler}
					className="description"
					type="text"
					value={title.detail}
				/>
			</Container>
		</Main>
	);
}

export default Title;
