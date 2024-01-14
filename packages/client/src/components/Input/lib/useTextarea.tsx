import { MutableRefObject, useCallback, useEffect } from 'react';

type UseTextareaProps = {
	value: string;
	textareaRef?: MutableRefObject<HTMLTextAreaElement | null>;
};

export const useTextarea = ({ textareaRef, value }: UseTextareaProps) => {
	const resizeTextArea = useCallback(() => {
		if (textareaRef?.current) {
			textareaRef.current.style.height = 'min-content';
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight + 'px';
		}
	}, []);

	useEffect(resizeTextArea, [value]);

	return;
};
