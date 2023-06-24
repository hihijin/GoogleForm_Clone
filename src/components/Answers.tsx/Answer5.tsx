import '../../Global.css';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

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

function Answer5() {
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

		if (nowQuestion.type === '드롭다운') {
			dispatch(
				UPDATEQUESTION({
					select: updatedAnswers.map((answer) => ({
						id: answer.id,
						option: answer.option,
					})),
				}),
			);
		}
	};

	const addQuestionHandler = () => {
		const newId = nowQuestion.select ? nowQuestion.select.length + 1 : 1;

		setAnswers([
			...answers,
			{
				id: newId,
				option: '옵션',
			},
		]);

		dispatch(
			UPDATEQUESTION({
				select: [
					...(nowQuestion.select || []),
					{
						id: newId,
						option: '옵션',
					},
				],
			}),
		);
	};

	// select option id가 같은 것만 삭제, 삭제한 id를 기준으로 id들 -1로 만들어 숫자 앞당기기
	const deleteOptionHandler = (id: number) => {
		const updatedAnswers = answers.filter((answer) => answer.id !== id);
		const updatedMappedAnswers =
			id === 1
				? updatedAnswers.map((answer) => ({ ...answer, id: answer.id - 1 }))
				: updatedAnswers.map((answer) =>
						answer.id > id ? { ...answer, id: answer.id - 1 } : answer,
				  );
		setAnswers(updatedMappedAnswers);
		dispatch(
			UPDATEQUESTION({
				select: [...updatedMappedAnswers],
			}),
		);
	};

	return (
		<Main>
			<ul>
				{nowQuestion.select &&
					nowQuestion.select.map((answer) => (
						<li key={answer.id}>
							<Option>
								<div>{answer.id}</div>
								<input
									className="textInput"
									onChange={(e) => textChangeHandler(e, answer.id!)}
									type="text"
									value={answer.option}
								/>
								{nowQuestion.select!.length > 1 ? (
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
					<div>{nowQuestion.select!.length + 1}</div>
					<div onClick={addQuestionHandler} className="addInput">
						옵션추가
					</div>
					<CloseOutlinedIcon className="hide" />
				</Option>
			</ul>
		</Main>
	);
}

export default Answer5;
