import '../Global.css';

import React from 'react';

import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
		color: black;
		font-size: 30px;
		margin-bottom: 20px;
		margin: 0 30px;
		padding-top: 20px;
	}
	div {
		font-size: 13px;
		margin: 30px;
	}
`;

function SubmitTitle() {
	const title = useSelector((state: RootState) => state.title) as Ititle;

	return (
		<Main>
			<div className="topLine" />
			<Container>
				<input disabled className="title" type="text" value={title.title} />
				<div>응답이 기록되었습니다.</div>
			</Container>
		</Main>
	);
}

export default SubmitTitle;
