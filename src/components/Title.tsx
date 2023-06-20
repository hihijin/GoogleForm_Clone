import '../Global.css';

import React from 'react';

import styled from 'styled-components';

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
	border-bottom-left-radius: 5px;
	border-left: 6px solid #4285f4;
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
	return (
		<Main>
			<div className="topLine" />
			<Container>
				<input className="title" type="text" value="제목없는 설문지" />
				<input className="description" type="text" value="설문지 설명" />
			</Container>
		</Main>
	);
}

export default Title;
