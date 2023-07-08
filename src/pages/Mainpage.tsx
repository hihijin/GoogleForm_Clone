import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import Question from '../components/question/Question';
import Questions from '../components/question/Questions';
import QuestionTitle from '../components/question/QuestionTitle';
import Sidebar from '../components/sidebar/Sidebar';
import SubmitBtn from '../components/submit/SubmitBtn';

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
				<QuestionTitle />
				<Question />
				<Questions />
				<SubmitBtn />
			</Content>
			<Side>
				<Sidebar />
			</Side>
		</Main>
	);
}

export default Mainpage;
