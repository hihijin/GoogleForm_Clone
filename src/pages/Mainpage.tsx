import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import Question from '../components/Question';
import Questions from '../components/Questions';
import Sidebar from '../components/Sidebar';
import Submit from '../components/Submit';
import Title from '../components/Title';

const Main = styled.div`
	width: 100%;
	height: auto;
	padding: 50px 0;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background: #f0ebf8;
`;

const Content = styled.div`
	margin-left: 50px;
	width: 850px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	padding-bottom: 50px;
	@media (max-width: 925px) {
		width: 80%;
	}
`;

const Side = styled.div`
	margin-top: 162px;
	margin-left: 10px;
	height: 80vh;
`;

function Mainpage() {
	return (
		<Main>
			<Content>
				<Title />
				<Question />
				<Questions />
				<Submit />
			</Content>
			<Side>
				<Sidebar />
			</Side>
		</Main>
	);
}

export default Mainpage;
