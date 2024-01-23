import { ForwardedRef, useCallback, RefCallback } from 'react';

export function useCombinedRef<T>(...refs: Array<ForwardedRef<T>>): RefCallback<T> {
	return useCallback(
		element => {
			refs.forEach(ref => {
				if (typeof ref === 'function') {
					ref(element);
				} else if (ref) {
					ref.current = element;
				}
			});
		},
		[refs]
	);
}
