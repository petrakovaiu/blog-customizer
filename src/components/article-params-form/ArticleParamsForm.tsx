import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import s from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onChange(defaultArticleState);
	};

	useEffect(() => {
		if (!isSidebarOpen) {
			return undefined;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isSidebarOpen]);

	return (
		<div ref={rootRef}>
			<ArrowButton isSidebarOpen={isSidebarOpen} onClick={handleArrowClick} />

			<aside
				className={clsx(s.container, {
					[s.container_open]: isSidebarOpen,
				})}>
				<form className={s.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({
								...formState,
								fontFamilyOption: option,
							})
						}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState({
								...formState,
								fontSizeOption: option,
							})
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({
								...formState,
								fontColor: option,
							})
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({
								...formState,
								backgroundColor: option,
							})
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({
								...formState,
								contentWidth: option,
							})
						}
					/>

					<div className={s.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
