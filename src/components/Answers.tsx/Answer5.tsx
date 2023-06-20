import '../../Global.css';

import React from 'react';

import styled from 'styled-components';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
`;

const Option = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	input {
		padding: 10px 0;
		border: none;
		outline: none;
		width: 90%;
		&:hover {
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		}
		&:focus {
			border-bottom: 2px solid #673ab7;
		}
	}
`;

function Answer5() {
	return (
		<Main>
			<Option>
				<div>1</div>
				<input type="text" value="옵션1" />
				<CloseOutlinedIcon />
			</Option>
			<Option>
				<div>2</div>
				<input type="text" value="옵션1" />
				<CloseOutlinedIcon />
			</Option>
		</Main>
	);
}

export default Answer5;
