import '../../Global.css';

import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { makeStyles, Switch } from '@material-ui/core';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import ReorderIcon from '@mui/icons-material/Reorder';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { UPDATEQUESTION } from '../../reducer/nowQuestionReducer';
import { ADD, EDIT } from '../../reducer/QuestionReducer';
import { RootState } from '../../store/Store';
import { Iquestion, Iquestions } from '../../type/Iquestion';
import Answer1 from '../answer/Answer1';
import Answer2 from '../answer/Answer2';

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
	.blueLine {
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		border-left: 6px solid #4285f4;
	}
`;

const Container = styled.div`
	width: 100%;
	padding-left: 20px;
	.dragIcon {
		color: rgba(0, 0, 0, 0.3);
		width: 100%;
		text-align: center;
		-ms-transform: rotate(90deg); /* IE 9 */
		-webkit-transform: rotate(90deg); /* Chrome, Safari, Opera */
		transform: rotate(90deg);
		&:hover {
			cursor: move;
		}
	}
`;

const Section1 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	margin-bottom: 10px;
	@media (max-width: 925px) {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
	}
	.sideSection {
		width: 100%;
	}
	input {
		padding-left: 20px;
		width: 90%;
		height: 60px;
		border: none;
		outline: none;
		&::placeholder {
			font-size: 15px;
			color: rgba(0, 0, 0, 0.4);
		}
		&:focus {
			border-bottom: 3px solid #673ab7;
		}
	}
	.redColor {
		color: red;
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
		&:hover {
			cursor: pointer;
		}
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
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
	.textInput {
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
	.addInput {
		padding: 10px 0;
		border: none;
		outline: none;
		width: 90%;
		&:hover {
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		}
		font-size: 13px;
		color: rgba(0, 0, 0, 0.5);
	}
	.deleteBtn {
		&:hover {
			cursor: pointer;
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.05);
		}
	}
	.color {
		color: rgba(0, 0, 0, 0.4);
	}
	.hide {
		color: white;
	}
`;

function Questions() {
	const dispatch = useDispatch();

	//등록된 질문 목록
	const questions = useSelector(
		(state: RootState) => state.question,
	) as Iquestions;

	//맨위 생성할 질문
	const nowQuestion = useSelector(
		(state: RootState) => state.nowQuestion,
	) as Iquestion;

	//material ui css를 위한 모듈
	const classes = useStyles();

	//드래그앤드롭 상태
	const dragItem = useRef<number | null>(null); // Specify the type for dragItem
	const dragOverItem = useRef<number | null>(null); // Specify the type for dragOverItem

	//드래그 시작핸들러
	const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
		dragItem.current = position;
		console.log((e.target as HTMLDivElement).innerHTML);
	};
	//드래그 끝났을 때 핸들러
	const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
		dragOverItem.current = position;
		console.log((e.target as HTMLDivElement).innerHTML);
	};
	//드롭한 곳 상태 변경핸들러
	const drop = (e: React.DragEvent<HTMLDivElement>) => {
		const copyListItems = [...questions];
		const dragItemContent = copyListItems[dragItem.current as number];
		copyListItems.splice(dragItem.current as number, 1);
		copyListItems.splice(dragOverItem.current as number, 0, dragItemContent);
		dragItem.current = null;
		dragOverItem.current = null;
		dispatch(EDIT(copyListItems));
	};

	//등록된 질문 옵션메뉴 수정 핸들러
	const menuChangeHandler = (event: SelectChangeEvent, questionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId
				? { ...question, type: event.target.value }
				: question,
		);
		dispatch(EDIT(updatedQuestions));
		console.log(event.target.value);
	};

	//등록된 질문 옵션메뉴 수정 핸들러
	const menuClickHandler = (menu: string, questionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId ? { ...question, type: menu } : question,
		);
		dispatch(EDIT(updatedQuestions));
		console.log(menu);
	};

	//질문 title 업데이트 핸들러
	const titleChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		questionId: number,
	) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId
				? { ...question, title: e.target.value }
				: question,
		);
		dispatch(EDIT(updatedQuestions));
	};

	//수정모드 활성화/비활성화 핸들러들
	const editHandler = (questionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId ? { ...question, editMode: true } : question,
		);
		dispatch(EDIT(updatedQuestions));
	};

	const notEditHandler = (questionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId ? { ...question, editMode: false } : question,
		);
		dispatch(EDIT(updatedQuestions));
	};

	//등록된 질문의 answer text 수정 핸들러
	const textChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		answerId: number,
		questionId: number,
		questionType: string,
	) => {
		const updatedQuestions = questions.map((question) => {
			if (question.id === questionId) {
				if (questionType === '객관식 질문') {
					return {
						...question,
						radio: (question.radio || []).map((radio) => {
							if (radio.id === answerId) {
								return {
									id: answerId,
									option: e.target.value,
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
									option: e.target.value,
								};
							}
							return checkbox;
						}),
					};
				} else if (questionType === '드롭다운') {
					return {
						...question,
						select: (question.select || []).map((select) => {
							if (select.id === answerId) {
								return {
									id: answerId,
									option: e.target.value,
								};
							}
							return select;
						}),
					};
				}
			}
			return question;
		});

		dispatch(EDIT(updatedQuestions));
	};

	// 등록된 질문에서 answer의 옵션 추가 핸들러
	const addOptionHandler = (questionId: number, questionType: string) => {
		const updatedQuestions = questions.map((question) => {
			if (question.id === questionId) {
				if (questionType === '객관식 질문') {
					console.log('d');
					return {
						...question,
						radio: [
							...question.radio!,
							{
								id: question.radio ? question.radio.length + 1 : 1,
								option: '옵션',
							},
						],
					};
				} else if (questionType === '체크박스') {
					return {
						...question,
						checkbox: [
							...question.checkbox!,
							{
								id: question.checkbox ? question.checkbox.length + 1 : 1,
								option: '옵션',
							},
						],
					};
				} else if (questionType === '드롭다운') {
					return {
						...question,
						select: [
							...question.select!,
							{
								id: question.select ? question.select.length + 1 : 1,
								option: '옵션',
							},
						],
					};
				}
			}
			return question;
		});
		dispatch(EDIT(updatedQuestions));
	};

	//등록된 질문의 answer 옵션 삭제 핸들러
	const deleteOptionHandler = (questionId: number, radioId: number) => {
		const updatedQuestions = questions.map((question) => {
			if (question.id === questionId) {
				return {
					...question,
					radio: (question.radio || []).filter((radio) => radio.id !== radioId),
				};
			}
			return question;
		});
		dispatch(EDIT(updatedQuestions));
	};

	//등록된 질문 복사 핸들러
	const copyQuestionHandler = (id: number) => {
		const filteredQuestion = questions
			.filter((question) => question.id === id)
			.map((v) => ({ ...v, id: questions.length + 1 }))[0];
		dispatch(ADD(filteredQuestion));
	};

	//등록된 질문 삭제 핸들러
	const deleteQuestionHandler = (id: number) => {
		const filteredQuestion = questions.filter((question) => question.id !== id);
		dispatch(EDIT(filteredQuestion));
	};

	//등록된 질문 필수사항체크 핸들러
	const checkHandler = (e: any, questionId: number) => {
		if (e.target.checked) e.target.checked = false;
		else e.target.checked = true;
		const updatedQuestions = questions.map((question) => {
			if (question.id === questionId) {
				return {
					...question,
					isNecessary: e.target.checked,
				};
			}
			return question;
		});
		dispatch(EDIT(updatedQuestions));
	};

	const nowQuestionNotEditHandler = () => {
		dispatch(
			UPDATEQUESTION({
				...nowQuestion,
				editMode: false,
			}),
		);
	};

	return (
		<Main onMouseDown={nowQuestionNotEditHandler}>
			{questions.length > 0 &&
				questions.map((question, index) => (
					<Content
						key={index}
						draggable
						onDragStart={(e) => dragStart(e, index)}
						onDragEnter={(e) => dragEnter(e, index)}
						onDragEnd={drop}
						onDragOver={(e) => e.preventDefault()}
						onFocus={() => editHandler(question.id!)}
						onBlur={() => notEditHandler(question.id!)}
					>
						<Container className={question.editMode ? 'blueLine' : undefined}>
							<div className="dragIcon">
								<DragIndicatorOutlinedIcon />
							</div>
							<Section1>
								<div className="sideSection">
									{question.isNecessary && <span className="redColor">*</span>}
									<input
										placeholder="질문"
										onChange={(e) => titleChangeHandler(e, question.id!)}
										value={question.title}
									/>
								</div>
								{question.editMode && (
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
											value={question.type}
											onChange={(e) => menuChangeHandler(e, question.id!)}
											displayEmpty
										>
											<MenuItem
												value="단답형"
												onMouseDown={() =>
													menuClickHandler('단답형', question.id!)
												}
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
												onMouseDown={() =>
													menuClickHandler('장문형', question.id!)
												}
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
												onMouseDown={() =>
													menuClickHandler('객관식 질문', question.id!)
												}
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
												onMouseDown={() =>
													menuClickHandler('체크박스', question.id!)
												}
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
												onMouseDown={() =>
													menuClickHandler('드롭다운', question.id!)
												}
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
								)}
							</Section1>
							{question.type === '단답형' && <Answer1 />}
							{question.type === '장문형' && <Answer2 />}
							{question.type === '객관식 질문' && (
								<Sidebar>
									<ul>
										{question.radio &&
											question.radio.map((answer) => (
												<li key={answer.id}>
													<Option>
														<RadioButtonUncheckedOutlinedIcon className="color" />
														<input
															className="textInput"
															onChange={(e) =>
																textChangeHandler(
																	e,
																	answer.id!,
																	question.id!,
																	question.type!,
																)
															}
															type="text"
															value={answer.option}
														/>
														{question.radio!.length > 1 && question.editMode ? (
															<CloseOutlinedIcon
																className="deleteBtn"
																onClick={() =>
																	deleteOptionHandler(question.id!, answer.id!)
																}
															/>
														) : (
															<CloseOutlinedIcon
																className="deleteBtn hide"
																onClick={() =>
																	deleteOptionHandler(question.id!, answer.id!)
																}
															/>
														)}
													</Option>
												</li>
											))}

										<Option>
											<RadioButtonUncheckedOutlinedIcon className="color" />
											<div
												onClick={() =>
													addOptionHandler(question.id!, question.type!)
												}
												className="addInput"
											>
												옵션추가
											</div>
											<CloseOutlinedIcon className="hide" />
										</Option>
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
														<CheckBoxOutlineBlankOutlinedIcon className="color" />
														<input
															className="textInput"
															onChange={(e) =>
																textChangeHandler(
																	e,
																	answer.id!,
																	question.id!,
																	question.type!,
																)
															}
															type="text"
															value={answer.option}
														/>
														{question.checkbox!.length > 1 &&
														question.editMode ? (
															<CloseOutlinedIcon
																className="deleteBtn"
																onClick={() =>
																	deleteOptionHandler(question.id!, answer.id!)
																}
															/>
														) : (
															<CloseOutlinedIcon
																className="deleteBtn hide"
																onClick={() =>
																	deleteOptionHandler(question.id!, answer.id!)
																}
															/>
														)}
													</Option>
												</li>
											))}

										<Option>
											<CheckBoxOutlineBlankOutlinedIcon className="color" />
											<div
												onClick={() =>
													addOptionHandler(question.id!, question.type!)
												}
												className="addInput"
											>
												옵션추가
											</div>
											<CloseOutlinedIcon className="hide" />
										</Option>
									</ul>
								</Sidebar>
							)}
							{question.type === '드롭다운' && (
								<Sidebar>
									<ul>
										{question.select &&
											question.select.map((answer) => (
												<li key={answer.id}>
													<Option>
														<div>{answer.id}</div>
														<input
															className="textInput"
															onChange={(e) =>
																textChangeHandler(
																	e,
																	answer.id!,
																	question.id!,
																	question.type!,
																)
															}
															type="text"
															value={answer.option}
														/>
														{question.select!.length > 1 &&
														question.editMode ? (
															<CloseOutlinedIcon
																className="deleteBtn"
																onClick={() =>
																	deleteOptionHandler(question.id!, answer.id!)
																}
															/>
														) : (
															<CloseOutlinedIcon
																className="deleteBtn hide"
																onClick={() =>
																	deleteOptionHandler(question.id!, answer.id!)
																}
															/>
														)}
													</Option>
												</li>
											))}

										<Option>
											<div>{question.select!.length + 1}</div>
											<div
												onClick={() =>
													addOptionHandler(question.id!, question.type!)
												}
												className="addInput"
											>
												옵션추가
											</div>
											<CloseOutlinedIcon className="hide" />
										</Option>
									</ul>
								</Sidebar>
							)}
							{question.editMode && (
								<Section3>
									<ContentCopyOutlinedIcon
										fontSize="small"
										className="color"
										onMouseDown={() => copyQuestionHandler(question.id!)}
									/>
									<div className="space" />
									<DeleteOutlineOutlinedIcon
										className="color"
										onMouseDown={() => deleteQuestionHandler(question.id!)}
									/>
									<div className="need">필수</div>
									<Switch
										color="default"
										className={classes.toggle}
										checked={question.isNecessary}
										inputProps={{ 'aria-label': 'controlled' }}
										onMouseDown={(e) => checkHandler(e, question.id!)}
									/>
								</Section3>
							)}
						</Container>
					</Content>
				))}
		</Main>
	);
}

export default Questions;
