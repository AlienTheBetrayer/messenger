/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * maps all service functions with their arguments
 */
export type StrictMockType<T> = {
	[K in keyof T as T[K] extends (...args: any[]) => any
		? K
		: never]: T[K] extends (...args: any) => any
		? jest.MockedFunction<T[K]>
		: never;
};

/**
 * maps all service functions with their arguments (partial)
 */
export type MockType<
	T,
	K extends keyof StrictMockType<T> = keyof StrictMockType<T>,
> = Pick<StrictMockType<T>, K>;

/**
 * maps all service functions with their return value
 */
export type StrictFactory<T> = {
	[K in keyof T as T[K] extends (...args: any[]) => any
		? K
		: never]: T[K] extends (...args: any) => any
		? (
				overrides?: Partial<Awaited<ReturnType<T[K]>>>,
			) => Awaited<ReturnType<T[K]>>
		: never;
};

/**
 * maps all service functions with their return value (partial)
 */
export type Factory<
	T,
	K extends keyof StrictFactory<T> = keyof StrictFactory<T>,
> = Pick<StrictFactory<T>, K>;
