import '../Global.css';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { makeStyles, Switch } from '@material-ui/core';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ReorderIcon from '@mui/icons-material/Reorder';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { UPDATEQUESTION } from '../reducer/nowQuestionReducer';
import { ADD, EDIT } from '../reducer/QuestionReducer';
import { RootState } from '../store/Store';
import { Iquestion, Iquestions } from '../type/Iquestion';
import Answer1 from './Answers.tsx/Answer1';
import Answer2 from './Answers.tsx/Answer2';
import Answer3 from './Answers.tsx/Answer3';
import Answer4 from './Answers.tsx/Answer4';
import Answer5 from './Answers.tsx/Answer5';

const useStyles = makeStyles((theme) => ({
	toggle: {
		'& .Mui-checked': {
			color: '#673ab7',
		},
		'& .MuiSwitch-track': {
			backgroundColor: '#673ab7',
		},
	},
}));

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: baseline;
	align-items: flex-start;
	background: white;
	margin-bottom: 10px;
	padding-right: 20px;
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	.select_section {
		display: flex;
		justify-content: baseline;
		align-items: center;
	}
	.blueLine {
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		border-left: 6px solid #4285f4;
	}
`;

const Container = styled.div`
	width: 100%;
	padding-left: 20px;
`;

const Section1 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	margin-bottom: 10px;
	input {
		padding-left: 20px;
		width: 70%;
		height: 60px;
		background: #f8f9fa;
		border: none;
		outline: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.5);
		&::placeholder {
			font-size: 15px;
			color: rgba(0, 0, 0, 0.4);
		}
		&:focus {
			border-bottom: 3px solid #673ab7;
		}
	}
`;

const Section3 = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20px;
	padding: 20px 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	.space {
		margin-left: 25px;
	}
	.need {
		margin-left: 20px;
		padding: 10px 10px 10px 20px;
		color: rgba(0, 0, 0, 0.7);
		font-size: 14px;
		border-left: 1px solid rgba(0, 0, 0, 0.2);
	}
	.color {
		color: rgba(0, 0, 0, 0.6);
	}
	.click {
		&:hover {
			cursor: pointer;
		}
	}
`;

function Question() {
	const dispatch = useDispatch();
	const nowQuestion = useSelector(
		(state: RootState) => state.nowQuestion,
	) as Iquestion;

	const questions = useSelector(
		(state: RootState) => state.question,
	) as Iquestions;

	const classes = useStyles();
	const [checked, setChecked] = useState(false);

	const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
		dispatch(
			UPDATEQUESTION({
				isNecessary: event.target.checked,
			}),
		);
	};

	const [menu, setMenu] = useState('단답형');

	const handleChange = (event: SelectChangeEvent) => {
		setMenu(event.target.value);
		dispatch(
			UPDATEQUESTION({
				type: event.target.value,
			}),
		);
	};

	const menuChangeClick = (menu: string) => {
		dispatch(
			UPDATEQUESTION({
				type: menu,
			}),
		);
	};

	//질문 title 업데이트 핸들러
	const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = questions.length === 0 ? 1 : questions.length + 1;
		dispatch(
			UPDATEQUESTION({
				id,
				title: e.target.value,
			}),
		);
	};

	//현재 질문 복사 핸들러
	const copyQuestionHandler = () => {
		//현재 질문을 질문목록에 추가
		dispatch(ADD({ ...nowQuestion }));
	};

	// 질문목록 전체 수정모드 비활성화 핸들러
	const notEditHandler = () => {
		const updatedQuestions = questions.map((question) => ({
			...question,
			editMode: false,
		}));
		dispatch(EDIT(updatedQuestions));
		dispatch(
			UPDATEQUESTION({
				...nowQuestion,
				editMode: true,
			}),
		);
	};

	return (
		<Main onClick={notEditHandler}>
			<Container className={nowQuestion.editMode ? 'blueLine' : undefined}>
				<Section1>
					<input
						onChange={(e) => titleHandler(e)}
						placeholder="질문"
						value={nowQuestion.title}
					/>
					<div>
						<Select
							sx={{
								width: '200px',
								boxShadow: 'none',
								'.MuiOutlinedInput-notchedOutline': {
									border: '1px solid rgba(0,0,0,0.1)',
								},
								'&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
									{
										border: '1px solid rgba(0,0,0,0.1)',
									},
								'&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
									{
										border: '1px solid rgba(0,0,0,0.1)',
									},
							}}
							value={menu}
							onChange={handleChange}
							displayEmpty
						>
							<MenuItem
								value="단답형"
								onMouseDown={() => menuChangeClick('단답형')}
							>
								<div
									className="select_section"
									style={{
										display: 'flex',
										justifyContent: 'flex-start',
										padding: '5px 0',
									}}
								>
									<SortOutlinedIcon fontSize="small" />
									<span style={{ margin: '0 10px' }}>단답형</span>
								</div>
							</MenuItem>
							<MenuItem
								value="장문형"
								onMouseDown={() => menuChangeClick('장문형')}
							>
								<div
									className="select_section"
									style={{
										display: 'flex',
										justifyContent: 'flex-start',
										padding: '5px 0',
									}}
								>
									<ReorderIcon fontSize="small" />
									<span style={{ margin: '0 10px' }}>장문형</span>
								</div>
							</MenuItem>
							<MenuItem
								value="객관식 질문"
								onMouseDown={() => menuChangeClick('객관식 질문')}
							>
								<div
									className="select_section"
									style={{
										display: 'flex',
										justifyContent: 'flex-start',
										padding: '5px 0',
									}}
								>
									<RadioButtonCheckedIcon fontSize="small" />
									<span style={{ margin: '0 10px' }}>객관식 질문</span>
								</div>
							</MenuItem>
							<MenuItem
								value="체크박스"
								onMouseDown={() => menuChangeClick('체크박스')}
							>
								<div
									className="select_section"
									style={{
										display: 'flex',
										justifyContent: 'flex-start',
										padding: '5px 0',
									}}
								>
									<CheckBoxOutlinedIcon fontSize="small" />
									<span style={{ margin: '0 10px' }}>체크박스</span>
								</div>
							</MenuItem>
							<MenuItem
								value="드롭다운"
								onMouseDown={() => menuChangeClick('드롭다운')}
							>
								<div
									className="select_section"
									style={{
										display: 'flex',
										justifyContent: 'flex-start',
										padding: '5px 0',
									}}
								>
									<ArrowDropDownCircleOutlinedIcon fontSize="small" />
									<span style={{ margin: '0 10px' }}>드롭다운</span>
								</div>
							</MenuItem>
						</Select>
					</div>
				</Section1>
				{menu === '단답형' && <Answer1 />}
				{menu === '장문형' && <Answer2 />}
				{menu === '객관식 질문' && <Answer3 />}
				{menu === '체크박스' && <Answer4 />}
				{menu === '드롭다운' && <Answer5 />}
				<Section3>
					<ContentCopyOutlinedIcon
						fontSize="small"
						className="color click"
						onMouseDown={copyQuestionHandler}
					/>
					<div className="space" />
					<DeleteOutlineOutlinedIcon className="color" />
					<div className="need">필수</div>
					<Switch
						color="default"
						className={classes.toggle}
						checked={checked}
						onChange={checkHandler}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
				</Section3>
			</Container>
		</Main>
	);
}

export default Question;
