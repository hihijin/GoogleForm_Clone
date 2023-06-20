import '../../Global.css';

import React from 'react';

import styled from 'styled-components';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	margin-bottom: 50px;
	input {
		padding: 10px 0;
		width: 80%;
		background: none;
		border: none;
		border-bottom: 1px dotted rgba(0, 0, 0, 0.3);
	}
`;

function Answer2() {
	return (
		<Main>
			<input placeholder="장문형 텍스트" disabled />
		</Main>
	);
}

export default Answer2;
