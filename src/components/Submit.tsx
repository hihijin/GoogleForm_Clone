import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		background: #673ab7;
		color: white;
		border-radius: 5px;
		padding: 10px 20px;
	}
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.color {
		color: rgba(0, 0, 0, 0.6);
		margin-right: 10px;
		&:hover {
			cursor: pointer;
		}
	}
	div {
		font-size: 13px;
		color: #673ab7;
		font-weight: bold;
		&:hover {
			cursor: pointer;
		}
	}
`;

function Submit() {
	const submitHandler = () => {
		console.log('제출완료');
	};

	const previewHandler = () => {
		console.log('미리보기');
	};

	const deleteHandler = () => {
		console.log('삭제완료');
	};
	return (
		<Main>
			<button onClick={submitHandler}>제출</button>
			<Content>
				<RemoveRedEyeOutlinedIcon className="color" onClick={previewHandler} />
				<div onClick={deleteHandler}>양식지우기</div>
			</Content>
		</Main>
	);
}

export default Submit;
