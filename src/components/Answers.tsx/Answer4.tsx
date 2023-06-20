import '../../Global.css';

import React from 'react';

import styled from 'styled-components';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	margin-bottom: 50px;
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
	.color {
		color: rgba(0, 0, 0, 0.4);
	}
`;

function Answer4() {
	return (
		<Main>
			<Option>
				<CheckBoxOutlineBlankOutlinedIcon className="color" />

				<input type="text" value="옵션1" />
				<CloseOutlinedIcon />
			</Option>
			<Option>
				<CheckBoxOutlineBlankOutlinedIcon className="color" />
				<input type="text" value="옵션2" />
				<CloseOutlinedIcon />
			</Option>
		</Main>
	);
}

export default Answer4;

//import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
//<CheckBoxOutlinedIcon/>
