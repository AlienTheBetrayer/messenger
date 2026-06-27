/**
 * marks the given keys as required, leaves other untouched
 */
export type PickRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

type ReplaceDate<T> = T extends Date ? string : T;
/**
 * converts all dates into strings (useful for redux serialisation from backend)
 */
export type DateToString<T> =
    T extends Date ? string :
    T extends (infer U)[] ? DateToString<U>[] :
    T extends readonly (infer U)[] ? readonly DateToString<U>[] :
    T extends object ? {
        [K in keyof T]: DateToString<T[K]>;
    } :
    T;