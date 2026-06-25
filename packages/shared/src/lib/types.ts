/**
 * marks the given keys as required, leaves other untouched
 */
export type PickRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;
