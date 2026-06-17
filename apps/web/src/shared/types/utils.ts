/**
 * gets all keys of an object recursively as a union literal
 */
export type RecursiveKeys<T> =
	T extends Record<string, unknown>
		? {
				[K in keyof T]:
					| K
					| (T[K] extends { children: infer C } ? RecursiveKeys<C> : K);
			}[keyof T]
		: never;
