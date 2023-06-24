import '../Global.css';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { EDIT } from '../reducer/QuestionReducer';
import { RootState } from '../store/Store';
import { Iquestions } from '../type/Iquestion';

const Main = styled.div`
	width: 100%;
	display: flex;
	justify-content: baseline;
	align-items: flex-start;
	flex-direction: column;
`;

const Content = styled.div`
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
	.sideSection {
		width: 100%;
	}
	input {
		background: none;
		width: 90%;
		height: 60px;
		border: none;
		outline: none;
		color: black;
		font-size: 15px;
	}
	.redColor {
		color: red;
	}
`;

//Answer3
const Sidebar = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: column;
	margin-bottom: 50px;
	ul,
	li {
		width: 100%;
	}
`;

const Option = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 20px;
	.textInput {
		padding: 10px 0;
		margin-left: 10px;
		border: none;
		outline: none;
		width: 90%;
		background: none;
	}
	.color {
		color: rgba(0, 0, 0, 0.4);
	}
	.check {
		color: #673ab7;
	}
	.short {
		padding: 10px 0;
		width: 50%;
		background: none;
		border: none;
		outline: none;
		border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
	}
	.long {
		padding: 10px 0;
		width: 100%;
		background: none;
		border: none;
		outline: none;
		border-bottom: 1px dotted rgba(0, 0, 0, 0.5);
	}
`;

export default function PreviewQuestion() {
	const dispatch = useDispatch();
	//등록된 질문 목록
	const questions = useSelector(
		(state: RootState) => state.question,
	) as Iquestions;

	//드롭다운 체크핸들러
	const [dropdown, setDropdown] = useState('선택');

	//답변체크핸들러
	const checkedHandler = (
		answerId: number,
		questionId: number,
		questionType: string,
	) => {
		console.log(answerId);
		const updatedQuestions = questions.map((question) => {
			if (question.id === questionId) {
				if (questionType === '객관식 질문') {
					return {
						...question,
						radio: (question.radio || []).map((radio) => {
							if (radio.id === answerId) {
								return {
									id: answerId,
									option: radio.option,
									isChecked: !radio.isChecked,
								};
							}
							return radio;
						}),
					};
				} else if (questionType === '체크박스') {
					return {
						...question,
						checkbox: (question.checkbox || []).map((checkbox) => {
							if (checkbox.id === answerId) {
								return {
									id: answerId,
									option: checkbox.option,
									isChecked: !checkbox.isChecked,
								};
							}
							return checkbox;
						}),
					};
				}
			}
			return question;
		});

		dispatch(EDIT(updatedQuestions));
	};

	//dropdown메뉴 선택핸들러
	const menuChangeClick = (answerOption: string) => {
		setDropdown(answerOption);
	};

	return (
		<Main>
			{questions.length > 0 &&
				questions.map((question, index) => (
					<Content key={index}>
						<Container>
							<Section1>
								<div className="sideSection">
									{question.isNecessary && <span className="redColor">*</span>}
									<input disabled value={question.title} />
								</div>
							</Section1>
							{question.type === '단답형' && (
								<Option>
									<input className="short" placeholder="내 답변" type="text" />
								</Option>
							)}
							{question.type === '장문형' && (
								<Option>
									<input className="long" placeholder="내 답변" type="text" />
								</Option>
							)}
							{question.type === '객관식 질문' && (
								<Sidebar>
									<ul>
										{question.radio &&
											question.radio.map((answer) => (
												<li key={answer.id}>
													<Option>
														{answer.isChecked ? (
															<RadioButtonCheckedOutlinedIcon
																className="check"
																onClick={() =>
																	checkedHandler(
																		answer.id!,
																		question.id!,
																		question.type!,
																	)
																}
															/>
														) : (
															<RadioButtonUncheckedOutlinedIcon
																className="color"
																onClick={() =>
																	checkedHandler(
																		answer.id!,
																		question.id!,
																		question.type!,
																	)
																}
															/>
														)}
														<input
															className="textInput"
															disabled
															type="text"
															value={answer.option}
														/>
													</Option>
												</li>
											))}
									</ul>
								</Sidebar>
							)}
							{question.type === '체크박스' && (
								<Sidebar>
									<ul>
										{question.checkbox &&
											question.checkbox.map((answer) => (
												<li key={answer.id}>
													<Option>
														{answer.isChecked ? (
															<CheckBoxOutlinedIcon
																className="check"
																onClick={() =>
																	checkedHandler(
																		answer.id!,
																		question.id!,
																		question.type!,
																	)
																}
															/>
														) : (
															<CheckBoxOutlineBlankOutlinedIcon
																className="color"
																onClick={() =>
																	checkedHandler(
																		answer.id!,
																		question.id!,
																		question.type!,
																	)
																}
															/>
														)}
														<input
															className="textInput"
															disabled
															type="text"
															value={answer.option}
														/>
													</Option>
												</li>
											))}
									</ul>
								</Sidebar>
							)}
							{question.type === '드롭다운' && (
								<Sidebar>
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
										value={dropdown}
										displayEmpty
									>
										{question.select &&
											question.select.map((answer) => (
												<MenuItem
													key={answer.id}
													value={answer.option}
													onClick={() => menuChangeClick(answer.option!)}
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
														<span style={{ margin: '0 10px' }}>
															{answer.option}
														</span>
													</div>
												</MenuItem>
											))}
									</Select>
								</Sidebar>
							)}
						</Container>
					</Content>
				))}
		</Main>
	);
}
