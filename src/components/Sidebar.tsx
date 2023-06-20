import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: white;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 10px;
	box-shadow: 0px 1px 2px 0 rgba(0, 0, 0, 0.4);
	.color {
		color: rgba(0, 0, 0, 0.6);
	}
`;

function Sidebar() {
	return (
		<Main>
			<AddCircleOutlineOutlinedIcon className="color" />
		</Main>
	);
}

export default Sidebar;
