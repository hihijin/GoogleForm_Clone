import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import SubmitTitle from '../components/SubmitTitle';

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
	height: 100vh;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	padding-bottom: 50px;
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

function SubmitPage() {
	return (
		<Main>
			<Content>
				<SubmitTitle />
			</Content>
		</Main>
	);
}

export default SubmitPage;
