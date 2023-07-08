import '../../Global.css';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { UPDATEQUESTION } from '../../reducer/nowQuestionReducer';
import { RootState } from '../../store/Store';
import { Iquestion } from '../../type/Iquestion';

const Main = styled.div`
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
		visibility: hidden;
	}
`;

interface Ianswer {
	id: number;
	option: string;
}

function Answer4() {
	const dispatch = useDispatch();
	const nowQuestion = useSelector(
		(state: RootState) => state.nowQuestion,
	) as Iquestion;

	const [answers, setAnswers] = useState<Ianswer[]>([
		{
			id: 1,
			option: '옵션',
		},
	]);

	const textChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		const updatedAnswers = answers.map((answer) => {
			if (answer.id === id) {
				return {
					...answer,
					option: e.target.value,
				};
			}
			return answer;
		});

		setAnswers(updatedAnswers);

		if (nowQuestion.type === '체크박스') {
			dispatch(
				UPDATEQUESTION({
					checkbox: updatedAnswers.map((answer) => ({
						id: answer.id,
						option: answer.option,
					})),
				}),
			);
		}
	};

	const addQuestionHandler = () => {
		const newId = nowQuestion.checkbox ? nowQuestion.checkbox.length + 1 : 1;

		setAnswers([
			...answers,
			{
				id: newId,
				option: '옵션',
			},
		]);

		dispatch(
			UPDATEQUESTION({
				checkbox: [
					...(nowQuestion.checkbox || []),
					{
						id: newId,
						option: '옵션',
					},
				],
			}),
		);
	};

	const deleteOptionHandler = (id: number) => {
		setAnswers(answers.filter((answer) => answer.id !== id));
		dispatch(
			UPDATEQUESTION({
				checkbox: [...answers.filter((answer) => answer.id !== id)],
			}),
		);
	};

	return (
		<Main>
			<ul>
				{nowQuestion.checkbox &&
					nowQuestion.checkbox.map((answer) => (
						<li key={answer.id}>
							<Option>
								<CheckBoxOutlineBlankOutlinedIcon className="color" />
								<input
									className="textInput"
									onChange={(e) => textChangeHandler(e, answer.id!)}
									type="text"
									value={answer.option}
								/>
								{nowQuestion.checkbox!.length > 1 ? (
									<CloseOutlinedIcon
										className="deleteBtn"
										onClick={() => deleteOptionHandler(answer.id!)}
									/>
								) : (
									<CloseOutlinedIcon className="hide" />
								)}
							</Option>
						</li>
					))}

				<Option>
					<CheckBoxOutlineBlankOutlinedIcon className="color" />
					<div onClick={addQuestionHandler} className="addInput">
						옵션추가
					</div>
					<CloseOutlinedIcon className="hide" />
				</Option>
			</ul>
		</Main>
	);
}

export default Answer4;

//import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
//<CheckBoxOutlinedIcon/>
