import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import Question from '../components/Question';
import Sidebar from '../components/Sidebar';
import Submit from '../components/Submit';
import Title from '../components/Title';

const Main = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background: #f0ebf8;
`;

const Content = styled.div`
	margin-top: 100px;
	margin-left: 50px;
	width: 850px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	@media (max-width: 1180px) {
		width: 80%;
	}
	@media (max-width: 900px) {
		width: 90%;
	}
	@media (max-width: 800px) {
		width: 95%;
	}
`;

const Side = styled.div`
	margin-top: 100px;
	margin-left: 10px;
	height: 80vh;
`;

function Mainpage() {
	return (
		<Main>
			<Content>
				<Title />
				<Question />
				<Submit />
			</Content>
			<Side>
				<Sidebar />
			</Side>
		</Main>
	);
}

export default Mainpage;
