import '../../Global.css';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

import { UPDATEQUESTION } from '../../reducer/nowQuestionReducer';
import { RootState } from '../../store/Store';
import { Ianswer } from '../../type/Ianswer';
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

function Answer3() {
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

		if (nowQuestion.type === '객관식 질문') {
			dispatch(
				UPDATEQUESTION({
					radio: updatedAnswers.map((answer) => ({
						id: answer.id,
						option: answer.option,
					})),
				}),
			);
		}
	};

	const addQuestionHandler = () => {
		const newId = nowQuestion.radio ? nowQuestion.radio.length + 1 : 1;

		setAnswers([
			...answers,
			{
				id: newId,
				option: '옵션',
			},
		]);

		dispatch(
			UPDATEQUESTION({
				radio: [
					...(nowQuestion.radio || []),
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
				radio: [...answers.filter((answer) => answer.id !== id)],
			}),
		);
	};
	return (
		<Main>
			<ul>
				{nowQuestion.radio &&
					nowQuestion.radio.map((answer) => (
						<li key={answer.id}>
							<Option>
								<RadioButtonUncheckedOutlinedIcon className="color" />
								<input
									className="textInput"
									onChange={(e) => textChangeHandler(e, answer.id!)}
									type="text"
									value={answer.option}
								/>
								{nowQuestion.radio!.length > 1 ? (
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
					<RadioButtonUncheckedOutlinedIcon className="color" />
					<div onClick={addQuestionHandler} className="addInput">
						옵션추가
					</div>
					<CloseOutlinedIcon className="hide" />
				</Option>
			</ul>
		</Main>
	);
}

export default Answer3;

//import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
//<RadioButtonCheckedOutlinedIcon className="color" />
