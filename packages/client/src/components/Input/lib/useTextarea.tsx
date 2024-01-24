import { MutableRefObject, useCallback, useEffect } from 'react';

type UseTextareaProps = {
	value: string | number | readonly string[] | undefined;
	textareaRef?: MutableRefObject<HTMLTextAreaElement | null>;
};

export const useTextarea = ({ textareaRef, value }: UseTextareaProps) => {
	const resizeTextArea = useCallback(() => {
		if (textareaRef?.current) {
			textareaRef.current.style.height = 'inherit';
			textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
		}
	}, []);

	useEffect(resizeTextArea, [value]);

	return;
};
