import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import PreSubmit from '../components/preview/PreSubmit';
import PreviewQuestion from '../components/preview/PreviewQuestion';
import PreviewTitle from '../components/preview/PreviewTitle';

const Main = styled.div`
	width: 100%;
	padding: 50px 0;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	background: #f0ebf8;
`;

const Content = styled.div`
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

function Preview() {
	return (
		<Main>
			<Content>
				<PreviewTitle />
				<PreviewQuestion />
				<PreSubmit />
			</Content>
		</Main>
	);
}

export default Preview;
