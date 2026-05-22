/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model test
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type test = $Result.DefaultSelection<Prisma.$testPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Tests
 * const tests = await prisma.test.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
	ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
	const U = 'log' extends keyof ClientOptions
		? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
			? Prisma.GetEvents<ClientOptions['log']>
			: never
		: never,
	ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
	[K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

	/**
	 * ##  Prisma Client ʲˢ
	 *
	 * Type-safe database client for TypeScript & Node.js
	 * @example
	 * ```
	 * const prisma = new PrismaClient({
	 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
	 * })
	 * // Fetch zero or more Tests
	 * const tests = await prisma.test.findMany()
	 * ```
	 *
	 *
	 * Read more in our [docs](https://pris.ly/d/client).
	 */

	constructor(
		optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
	);
	$on<V extends U>(
		eventType: V,
		callback: (
			event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
		) => void,
	): PrismaClient;

	/**
	 * Connect with the database
	 */
	$connect(): $Utils.JsPromise<void>;

	/**
	 * Disconnect from the database
	 */
	$disconnect(): $Utils.JsPromise<void>;

	/**
	 * Executes a prepared raw query and returns the number of affected rows.
	 * @example
	 * ```
	 * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$executeRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<number>;

	/**
	 * Executes a raw query and returns the number of affected rows.
	 * Susceptible to SQL injections, see documentation.
	 * @example
	 * ```
	 * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$executeRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<number>;

	/**
	 * Performs a prepared raw query and returns the `SELECT` data.
	 * @example
	 * ```
	 * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$queryRaw<T = unknown>(
		query: TemplateStringsArray | Prisma.Sql,
		...values: any[]
	): Prisma.PrismaPromise<T>;

	/**
	 * Performs a raw query and returns the `SELECT` data.
	 * Susceptible to SQL injections, see documentation.
	 * @example
	 * ```
	 * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
	 * ```
	 *
	 * Read more in our [docs](https://pris.ly/d/raw-queries).
	 */
	$queryRawUnsafe<T = unknown>(
		query: string,
		...values: any[]
	): Prisma.PrismaPromise<T>;

	/**
	 * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
	 * @example
	 * ```
	 * const [george, bob, alice] = await prisma.$transaction([
	 *   prisma.user.create({ data: { name: 'George' } }),
	 *   prisma.user.create({ data: { name: 'Bob' } }),
	 *   prisma.user.create({ data: { name: 'Alice' } }),
	 * ])
	 * ```
	 *
	 * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
	 */
	$transaction<P extends Prisma.PrismaPromise<any>[]>(
		arg: [...P],
		options?: {
			maxWait?: number;
			timeout?: number;
			isolationLevel?: Prisma.TransactionIsolationLevel;
		},
	): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

	$transaction<R>(
		fn: (
			prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
		) => $Utils.JsPromise<R>,
		options?: {
			maxWait?: number;
			timeout?: number;
			isolationLevel?: Prisma.TransactionIsolationLevel;
		},
	): $Utils.JsPromise<R>;

	$extends: $Extensions.ExtendsHook<
		'extends',
		Prisma.TypeMapCb<ClientOptions>,
		ExtArgs,
		$Utils.Call<
			Prisma.TypeMapCb<ClientOptions>,
			{
				extArgs: ExtArgs;
			}
		>
	>;

	/**
	 * `prisma.test`: Exposes CRUD operations for the **test** model.
	 * Example usage:
	 * ```ts
	 * // Fetch zero or more Tests
	 * const tests = await prisma.test.findMany()
	 * ```
	 */
	get test(): Prisma.testDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
	export import DMMF = runtime.DMMF;

	export type PrismaPromise<T> = $Public.PrismaPromise<T>;

	/**
	 * Validator
	 */
	export import validator = runtime.Public.validator;

	/**
	 * Prisma Errors
	 */
	export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
	export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
	export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
	export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
	export import PrismaClientValidationError = runtime.PrismaClientValidationError;

	/**
	 * Re-export of sql-template-tag
	 */
	export import sql = runtime.sqltag;
	export import empty = runtime.empty;
	export import join = runtime.join;
	export import raw = runtime.raw;
	export import Sql = runtime.Sql;

	/**
	 * Decimal.js
	 */
	export import Decimal = runtime.Decimal;

	export type DecimalJsLike = runtime.DecimalJsLike;

	/**
	 * Extensions
	 */
	export import Extension = $Extensions.UserArgs;
	export import getExtensionContext = runtime.Extensions.getExtensionContext;
	export import Args = $Public.Args;
	export import Payload = $Public.Payload;
	export import Result = $Public.Result;
	export import Exact = $Public.Exact;

	/**
	 * Prisma Client JS version: 7.8.0
	 * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
	 */
	export type PrismaVersion = {
		client: string;
		engine: string;
	};

	export const prismaVersion: PrismaVersion;

	/**
	 * Utility Types
	 */

	export import Bytes = runtime.Bytes;
	export import JsonObject = runtime.JsonObject;
	export import JsonArray = runtime.JsonArray;
	export import JsonValue = runtime.JsonValue;
	export import InputJsonObject = runtime.InputJsonObject;
	export import InputJsonArray = runtime.InputJsonArray;
	export import InputJsonValue = runtime.InputJsonValue;

	/**
	 * Types of the values used to represent different kinds of `null` values when working with JSON fields.
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	namespace NullTypes {
		/**
		 * Type of `Prisma.DbNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class DbNull {
			private DbNull: never;
			private constructor();
		}

		/**
		 * Type of `Prisma.JsonNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class JsonNull {
			private JsonNull: never;
			private constructor();
		}

		/**
		 * Type of `Prisma.AnyNull`.
		 *
		 * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
		 *
		 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
		 */
		class AnyNull {
			private AnyNull: never;
			private constructor();
		}
	}

	/**
	 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const DbNull: NullTypes.DbNull;

	/**
	 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const JsonNull: NullTypes.JsonNull;

	/**
	 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
	 *
	 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
	 */
	export const AnyNull: NullTypes.AnyNull;

	type SelectAndInclude = {
		select: any;
		include: any;
	};

	type SelectAndOmit = {
		select: any;
		omit: any;
	};

	/**
	 * Get the type of the value, that the Promise holds.
	 */
	export type PromiseType<T extends PromiseLike<any>> =
		T extends PromiseLike<infer U> ? U : T;

	/**
	 * Get the return type of a function which returns a Promise.
	 */
	export type PromiseReturnType<
		T extends (...args: any) => $Utils.JsPromise<any>,
	> = PromiseType<ReturnType<T>>;

	/**
	 * From T, pick a set of properties whose keys are in the union K
	 */
	type Prisma__Pick<T, K extends keyof T> = {
		[P in K]: T[P];
	};

	export type Enumerable<T> = T | Array<T>;

	export type RequiredKeys<T> = {
		[K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
	}[keyof T];

	export type TruthyKeys<T> = keyof {
		[K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
	};

	export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

	/**
	 * Subset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
	 */
	export type Subset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	};

	/**
	 * SelectSubset
	 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
	 * Additionally, it validates, if both select and include are present. If the case, it errors.
	 */
	export type SelectSubset<T, U> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	} & (T extends SelectAndInclude
		? 'Please either choose `select` or `include`.'
		: T extends SelectAndOmit
			? 'Please either choose `select` or `omit`.'
			: {});

	/**
	 * Subset + Intersection
	 * @desc From `T` pick properties that exist in `U` and intersect `K`
	 */
	export type SubsetIntersection<T, U, K> = {
		[key in keyof T]: key extends keyof U ? T[key] : never;
	} & K;

	type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

	/**
	 * XOR is needed to have a real mutually exclusive union type
	 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
	 */
	type XOR<T, U> = T extends object
		? U extends object
			? (Without<T, U> & U) | (Without<U, T> & T)
			: U
		: T;

	/**
	 * Is T a Record?
	 */
	type IsObject<T extends any> =
		T extends Array<any>
			? False
			: T extends Date
				? False
				: T extends Uint8Array
					? False
					: T extends BigInt
						? False
						: T extends object
							? True
							: False;

	/**
	 * If it's T[], return T
	 */
	export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

	/**
	 * From ts-toolbelt
	 */

	type __Either<O extends object, K extends Key> = Omit<O, K> &
		{
			// Merge all but K
			[P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
		}[K];

	type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

	type EitherLoose<O extends object, K extends Key> = ComputeRaw<
		__Either<O, K>
	>;

	type _Either<O extends object, K extends Key, strict extends Boolean> = {
		1: EitherStrict<O, K>;
		0: EitherLoose<O, K>;
	}[strict];

	type Either<
		O extends object,
		K extends Key,
		strict extends Boolean = 1,
	> = O extends unknown ? _Either<O, K, strict> : never;

	export type Union = any;

	type PatchUndefined<O extends object, O1 extends object> = {
		[K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
	} & {};

	/** Helper Types for "Merge" **/
	export type IntersectOf<U extends Union> = (
		U extends unknown ? (k: U) => void : never
	) extends (k: infer I) => void
		? I
		: never;

	export type Overwrite<O extends object, O1 extends object> = {
		[K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
	} & {};

	type _Merge<U extends object> = IntersectOf<
		Overwrite<
			U,
			{
				[K in keyof U]-?: At<U, K>;
			}
		>
	>;

	type Key = string | number | symbol;
	type AtBasic<O extends object, K extends Key> = K extends keyof O
		? O[K]
		: never;
	type AtStrict<O extends object, K extends Key> = O[K & keyof O];
	type AtLoose<O extends object, K extends Key> = O extends unknown
		? AtStrict<O, K>
		: never;
	export type At<
		O extends object,
		K extends Key,
		strict extends Boolean = 1,
	> = {
		1: AtStrict<O, K>;
		0: AtLoose<O, K>;
	}[strict];

	export type ComputeRaw<A extends any> = A extends Function
		? A
		: {
				[K in keyof A]: A[K];
			} & {};

	export type OptionalFlat<O> = {
		[K in keyof O]?: O[K];
	} & {};

	type _Record<K extends keyof any, T> = {
		[P in K]: T;
	};

	// cause typescript not to expand types and preserve names
	type NoExpand<T> = T extends unknown ? T : never;

	// this type assumes the passed object is entirely optional
	type AtLeast<O extends object, K extends string> = NoExpand<
		O extends unknown
			?
					| (K extends keyof O ? { [P in K]: O[P] } & O : O)
					| ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
			: never
	>;

	type _Strict<U, _U = U> = U extends unknown
		? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
		: never;

	export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
	/** End Helper Types for "Merge" **/

	export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

	/**
  A [[Boolean]]
  */
	export type Boolean = True | False;

	// /**
	// 1
	// */
	export type True = 1;

	/**
  0
  */
	export type False = 0;

	export type Not<B extends Boolean> = {
		0: 1;
		1: 0;
	}[B];

	export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
		? 0 // anything `never` is false
		: A1 extends A2
			? 1
			: 0;

	export type Has<U extends Union, U1 extends Union> = Not<
		Extends<Exclude<U1, U>, U1>
	>;

	export type Or<B1 extends Boolean, B2 extends Boolean> = {
		0: {
			0: 0;
			1: 1;
		};
		1: {
			0: 1;
			1: 1;
		};
	}[B1][B2];

	export type Keys<U extends Union> = U extends unknown ? keyof U : never;

	type Cast<A, B> = A extends B ? A : B;

	export const type: unique symbol;

	/**
	 * Used by group by
	 */

	export type GetScalarType<T, O> = O extends object
		? {
				[P in keyof T]: P extends keyof O ? O[P] : never;
			}
		: never;

	type FieldPaths<
		T,
		U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
	> = IsObject<T> extends True ? U : T;

	type GetHavingFields<T> = {
		[K in keyof T]: Or<
			Or<Extends<'OR', K>, Extends<'AND', K>>,
			Extends<'NOT', K>
		> extends True
			? // infer is only needed to not hit TS limit
				// based on the brilliant idea of Pierre-Antoine Mills
				// https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
				T[K] extends infer TK
				? GetHavingFields<
						UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
					>
				: never
			: {} extends FieldPaths<T[K]>
				? never
				: K;
	}[keyof T];

	/**
	 * Convert tuple to union
	 */
	type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
	type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
	type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

	/**
	 * Like `Pick`, but additionally can also accept an array of keys
	 */
	type PickEnumerable<
		T,
		K extends Enumerable<keyof T> | keyof T,
	> = Prisma__Pick<T, MaybeTupleToUnion<K>>;

	/**
	 * Exclude all keys with underscores
	 */
	type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
		? never
		: T;

	export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

	type FieldRefInputType<Model, FieldType> = Model extends never
		? never
		: FieldRef<Model, FieldType>;

	export const ModelName: {
		test: 'test';
	};

	export type ModelName = (typeof ModelName)[keyof typeof ModelName];

	interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
		{ extArgs: $Extensions.InternalArgs },
		$Utils.Record<string, any>
	> {
		returns: Prisma.TypeMap<
			this['params']['extArgs'],
			ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
		>;
	}

	export type TypeMap<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> = {
		globalOmitOptions: {
			omit: GlobalOmitOptions;
		};
		meta: {
			modelProps: 'test';
			txIsolationLevel: Prisma.TransactionIsolationLevel;
		};
		model: {
			test: {
				payload: Prisma.$testPayload<ExtArgs>;
				fields: Prisma.testFieldRefs;
				operations: {
					findUnique: {
						args: Prisma.testFindUniqueArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload> | null;
					};
					findUniqueOrThrow: {
						args: Prisma.testFindUniqueOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>;
					};
					findFirst: {
						args: Prisma.testFindFirstArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload> | null;
					};
					findFirstOrThrow: {
						args: Prisma.testFindFirstOrThrowArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>;
					};
					findMany: {
						args: Prisma.testFindManyArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>[];
					};
					create: {
						args: Prisma.testCreateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>;
					};
					createMany: {
						args: Prisma.testCreateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					createManyAndReturn: {
						args: Prisma.testCreateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>[];
					};
					delete: {
						args: Prisma.testDeleteArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>;
					};
					update: {
						args: Prisma.testUpdateArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>;
					};
					deleteMany: {
						args: Prisma.testDeleteManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateMany: {
						args: Prisma.testUpdateManyArgs<ExtArgs>;
						result: BatchPayload;
					};
					updateManyAndReturn: {
						args: Prisma.testUpdateManyAndReturnArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>[];
					};
					upsert: {
						args: Prisma.testUpsertArgs<ExtArgs>;
						result: $Utils.PayloadToResult<Prisma.$testPayload>;
					};
					aggregate: {
						args: Prisma.TestAggregateArgs<ExtArgs>;
						result: $Utils.Optional<AggregateTest>;
					};
					groupBy: {
						args: Prisma.testGroupByArgs<ExtArgs>;
						result: $Utils.Optional<TestGroupByOutputType>[];
					};
					count: {
						args: Prisma.testCountArgs<ExtArgs>;
						result: $Utils.Optional<TestCountAggregateOutputType> | number;
					};
				};
			};
		};
	} & {
		other: {
			payload: any;
			operations: {
				$executeRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
					result: any;
				};
				$executeRawUnsafe: {
					args: [query: string, ...values: any[]];
					result: any;
				};
				$queryRaw: {
					args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
					result: any;
				};
				$queryRawUnsafe: {
					args: [query: string, ...values: any[]];
					result: any;
				};
			};
		};
	};
	export const defineExtension: $Extensions.ExtendsHook<
		'define',
		Prisma.TypeMapCb,
		$Extensions.DefaultArgs
	>;
	export type DefaultPrismaClient = PrismaClient;
	export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
	export interface PrismaClientOptions {
		/**
		 * @default "colorless"
		 */
		errorFormat?: ErrorFormat;
		/**
		 * @example
		 * ```
		 * // Shorthand for `emit: 'stdout'`
		 * log: ['query', 'info', 'warn', 'error']
		 *
		 * // Emit as events only
		 * log: [
		 *   { emit: 'event', level: 'query' },
		 *   { emit: 'event', level: 'info' },
		 *   { emit: 'event', level: 'warn' }
		 *   { emit: 'event', level: 'error' }
		 * ]
		 *
		 * / Emit as events and log to stdout
		 * og: [
		 *  { emit: 'stdout', level: 'query' },
		 *  { emit: 'stdout', level: 'info' },
		 *  { emit: 'stdout', level: 'warn' }
		 *  { emit: 'stdout', level: 'error' }
		 *
		 * ```
		 * Read more in our [docs](https://pris.ly/d/logging).
		 */
		log?: (LogLevel | LogDefinition)[];
		/**
		 * The default values for transactionOptions
		 * maxWait ?= 2000
		 * timeout ?= 5000
		 */
		transactionOptions?: {
			maxWait?: number;
			timeout?: number;
			isolationLevel?: Prisma.TransactionIsolationLevel;
		};
		/**
		 * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
		 */
		adapter?: runtime.SqlDriverAdapterFactory;
		/**
		 * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
		 */
		accelerateUrl?: string;
		/**
		 * Global configuration for omitting model fields by default.
		 *
		 * @example
		 * ```
		 * const prisma = new PrismaClient({
		 *   omit: {
		 *     user: {
		 *       password: true
		 *     }
		 *   }
		 * })
		 * ```
		 */
		omit?: Prisma.GlobalOmitConfig;
		/**
		 * SQL commenter plugins that add metadata to SQL queries as comments.
		 * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
		 *
		 * @example
		 * ```
		 * const prisma = new PrismaClient({
		 *   adapter,
		 *   comments: [
		 *     traceContext(),
		 *     queryInsights(),
		 *   ],
		 * })
		 * ```
		 */
		comments?: runtime.SqlCommenterPlugin[];
	}
	export type GlobalOmitConfig = {
		test?: testOmit;
	};

	/* Types for Logging */
	export type LogLevel = 'info' | 'query' | 'warn' | 'error';
	export type LogDefinition = {
		level: LogLevel;
		emit: 'stdout' | 'event';
	};

	export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

	export type GetLogType<T> = CheckIsLogLevel<
		T extends LogDefinition ? T['level'] : T
	>;

	export type GetEvents<T extends any[]> =
		T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

	export type QueryEvent = {
		timestamp: Date;
		query: string;
		params: string;
		duration: number;
		target: string;
	};

	export type LogEvent = {
		timestamp: Date;
		message: string;
		target: string;
	};
	/* End Types for Logging */

	export type PrismaAction =
		| 'findUnique'
		| 'findUniqueOrThrow'
		| 'findMany'
		| 'findFirst'
		| 'findFirstOrThrow'
		| 'create'
		| 'createMany'
		| 'createManyAndReturn'
		| 'update'
		| 'updateMany'
		| 'updateManyAndReturn'
		| 'upsert'
		| 'delete'
		| 'deleteMany'
		| 'executeRaw'
		| 'queryRaw'
		| 'aggregate'
		| 'count'
		| 'runCommandRaw'
		| 'findRaw'
		| 'groupBy';

	// tested in getLogLevel.test.ts
	export function getLogLevel(
		log: Array<LogLevel | LogDefinition>,
	): LogLevel | undefined;

	/**
	 * `PrismaClient` proxy available in interactive transactions.
	 */
	export type TransactionClient = Omit<
		Prisma.DefaultPrismaClient,
		runtime.ITXClientDenyList
	>;

	export type Datasource = {
		url?: string;
	};

	/**
	 * Count Types
	 */

	/**
	 * Models
	 */

	/**
	 * Model test
	 */

	export type AggregateTest = {
		_count: TestCountAggregateOutputType | null;
		_avg: TestAvgAggregateOutputType | null;
		_sum: TestSumAggregateOutputType | null;
		_min: TestMinAggregateOutputType | null;
		_max: TestMaxAggregateOutputType | null;
	};

	export type TestAvgAggregateOutputType = {
		value: number | null;
	};

	export type TestSumAggregateOutputType = {
		value: number | null;
	};

	export type TestMinAggregateOutputType = {
		id: string | null;
		value: number | null;
		created_at: Date | null;
	};

	export type TestMaxAggregateOutputType = {
		id: string | null;
		value: number | null;
		created_at: Date | null;
	};

	export type TestCountAggregateOutputType = {
		id: number;
		value: number;
		created_at: number;
		_all: number;
	};

	export type TestAvgAggregateInputType = {
		value?: true;
	};

	export type TestSumAggregateInputType = {
		value?: true;
	};

	export type TestMinAggregateInputType = {
		id?: true;
		value?: true;
		created_at?: true;
	};

	export type TestMaxAggregateInputType = {
		id?: true;
		value?: true;
		created_at?: true;
	};

	export type TestCountAggregateInputType = {
		id?: true;
		value?: true;
		created_at?: true;
		_all?: true;
	};

	export type TestAggregateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which test to aggregate.
		 */
		where?: testWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of tests to fetch.
		 */
		orderBy?: testOrderByWithRelationInput | testOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the start position
		 */
		cursor?: testWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` tests from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` tests.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Count returned tests
		 **/
		_count?: true | TestCountAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to average
		 **/
		_avg?: TestAvgAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to sum
		 **/
		_sum?: TestSumAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the minimum value
		 **/
		_min?: TestMinAggregateInputType;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
		 *
		 * Select which fields to find the maximum value
		 **/
		_max?: TestMaxAggregateInputType;
	};

	export type GetTestAggregateType<T extends TestAggregateArgs> = {
		[P in keyof T & keyof AggregateTest]: P extends '_count' | 'count'
			? T[P] extends true
				? number
				: GetScalarType<T[P], AggregateTest[P]>
			: GetScalarType<T[P], AggregateTest[P]>;
	};

	export type testGroupByArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		where?: testWhereInput;
		orderBy?:
			| testOrderByWithAggregationInput
			| testOrderByWithAggregationInput[];
		by: TestScalarFieldEnum[] | TestScalarFieldEnum;
		having?: testScalarWhereWithAggregatesInput;
		take?: number;
		skip?: number;
		_count?: TestCountAggregateInputType | true;
		_avg?: TestAvgAggregateInputType;
		_sum?: TestSumAggregateInputType;
		_min?: TestMinAggregateInputType;
		_max?: TestMaxAggregateInputType;
	};

	export type TestGroupByOutputType = {
		id: string;
		value: number | null;
		created_at: Date;
		_count: TestCountAggregateOutputType | null;
		_avg: TestAvgAggregateOutputType | null;
		_sum: TestSumAggregateOutputType | null;
		_min: TestMinAggregateOutputType | null;
		_max: TestMaxAggregateOutputType | null;
	};

	type GetTestGroupByPayload<T extends testGroupByArgs> = Prisma.PrismaPromise<
		Array<
			PickEnumerable<TestGroupByOutputType, T['by']> & {
				[P in keyof T & keyof TestGroupByOutputType]: P extends '_count'
					? T[P] extends boolean
						? number
						: GetScalarType<T[P], TestGroupByOutputType[P]>
					: GetScalarType<T[P], TestGroupByOutputType[P]>;
			}
		>
	>;

	export type testSelect<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			value?: boolean;
			created_at?: boolean;
		},
		ExtArgs['result']['test']
	>;

	export type testSelectCreateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			value?: boolean;
			created_at?: boolean;
		},
		ExtArgs['result']['test']
	>;

	export type testSelectUpdateManyAndReturn<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetSelect<
		{
			id?: boolean;
			value?: boolean;
			created_at?: boolean;
		},
		ExtArgs['result']['test']
	>;

	export type testSelectScalar = {
		id?: boolean;
		value?: boolean;
		created_at?: boolean;
	};

	export type testOmit<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = $Extensions.GetOmit<
		'id' | 'value' | 'created_at',
		ExtArgs['result']['test']
	>;

	export type $testPayload<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		name: 'test';
		objects: {};
		scalars: $Extensions.GetPayloadResult<
			{
				id: string;
				value: number | null;
				created_at: Date;
			},
			ExtArgs['result']['test']
		>;
		composites: {};
	};

	type testGetPayload<S extends boolean | null | undefined | testDefaultArgs> =
		$Result.GetResult<Prisma.$testPayload, S>;

	type testCountArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = Omit<testFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
		select?: TestCountAggregateInputType | true;
	};

	export interface testDelegate<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> {
		[K: symbol]: {
			types: Prisma.TypeMap<ExtArgs>['model']['test'];
			meta: { name: 'test' };
		};
		/**
		 * Find zero or one Test that matches the filter.
		 * @param {testFindUniqueArgs} args - Arguments to find a Test
		 * @example
		 * // Get one Test
		 * const test = await prisma.test.findUnique({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUnique<T extends testFindUniqueArgs>(
			args: SelectSubset<T, testFindUniqueArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'findUnique',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find one Test that matches the filter or throw an error with `error.code='P2025'`
		 * if no matches were found.
		 * @param {testFindUniqueOrThrowArgs} args - Arguments to find a Test
		 * @example
		 * // Get one Test
		 * const test = await prisma.test.findUniqueOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findUniqueOrThrow<T extends testFindUniqueOrThrowArgs>(
			args: SelectSubset<T, testFindUniqueOrThrowArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'findUniqueOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Test that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {testFindFirstArgs} args - Arguments to find a Test
		 * @example
		 * // Get one Test
		 * const test = await prisma.test.findFirst({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirst<T extends testFindFirstArgs>(
			args?: SelectSubset<T, testFindFirstArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'findFirst',
				GlobalOmitOptions
			> | null,
			null,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find the first Test that matches the filter or
		 * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {testFindFirstOrThrowArgs} args - Arguments to find a Test
		 * @example
		 * // Get one Test
		 * const test = await prisma.test.findFirstOrThrow({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 */
		findFirstOrThrow<T extends testFindFirstOrThrowArgs>(
			args?: SelectSubset<T, testFindFirstOrThrowArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'findFirstOrThrow',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Find zero or more Tests that matches the filter.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {testFindManyArgs} args - Arguments to filter and select certain fields only.
		 * @example
		 * // Get all Tests
		 * const tests = await prisma.test.findMany()
		 *
		 * // Get first 10 Tests
		 * const tests = await prisma.test.findMany({ take: 10 })
		 *
		 * // Only select the `id`
		 * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
		 *
		 */
		findMany<T extends testFindManyArgs>(
			args?: SelectSubset<T, testFindManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'findMany',
				GlobalOmitOptions
			>
		>;

		/**
		 * Create a Test.
		 * @param {testCreateArgs} args - Arguments to create a Test.
		 * @example
		 * // Create one Test
		 * const Test = await prisma.test.create({
		 *   data: {
		 *     // ... data to create a Test
		 *   }
		 * })
		 *
		 */
		create<T extends testCreateArgs>(
			args: SelectSubset<T, testCreateArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'create',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Create many Tests.
		 * @param {testCreateManyArgs} args - Arguments to create many Tests.
		 * @example
		 * // Create many Tests
		 * const test = await prisma.test.createMany({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 */
		createMany<T extends testCreateManyArgs>(
			args?: SelectSubset<T, testCreateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Create many Tests and returns the data saved in the database.
		 * @param {testCreateManyAndReturnArgs} args - Arguments to create many Tests.
		 * @example
		 * // Create many Tests
		 * const test = await prisma.test.createManyAndReturn({
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Create many Tests and only return the `id`
		 * const testWithIdOnly = await prisma.test.createManyAndReturn({
		 *   select: { id: true },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		createManyAndReturn<T extends testCreateManyAndReturnArgs>(
			args?: SelectSubset<T, testCreateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'createManyAndReturn',
				GlobalOmitOptions
			>
		>;

		/**
		 * Delete a Test.
		 * @param {testDeleteArgs} args - Arguments to delete one Test.
		 * @example
		 * // Delete one Test
		 * const Test = await prisma.test.delete({
		 *   where: {
		 *     // ... filter to delete one Test
		 *   }
		 * })
		 *
		 */
		delete<T extends testDeleteArgs>(
			args: SelectSubset<T, testDeleteArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'delete',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Update one Test.
		 * @param {testUpdateArgs} args - Arguments to update one Test.
		 * @example
		 * // Update one Test
		 * const test = await prisma.test.update({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		update<T extends testUpdateArgs>(
			args: SelectSubset<T, testUpdateArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'update',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Delete zero or more Tests.
		 * @param {testDeleteManyArgs} args - Arguments to filter Tests to delete.
		 * @example
		 * // Delete a few Tests
		 * const { count } = await prisma.test.deleteMany({
		 *   where: {
		 *     // ... provide filter here
		 *   }
		 * })
		 *
		 */
		deleteMany<T extends testDeleteManyArgs>(
			args?: SelectSubset<T, testDeleteManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Tests.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {testUpdateManyArgs} args - Arguments to update one or more rows.
		 * @example
		 * // Update many Tests
		 * const test = await prisma.test.updateMany({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: {
		 *     // ... provide data here
		 *   }
		 * })
		 *
		 */
		updateMany<T extends testUpdateManyArgs>(
			args: SelectSubset<T, testUpdateManyArgs<ExtArgs>>,
		): Prisma.PrismaPromise<BatchPayload>;

		/**
		 * Update zero or more Tests and returns the data updated in the database.
		 * @param {testUpdateManyAndReturnArgs} args - Arguments to update many Tests.
		 * @example
		 * // Update many Tests
		 * const test = await prisma.test.updateManyAndReturn({
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 *
		 * // Update zero or more Tests and only return the `id`
		 * const testWithIdOnly = await prisma.test.updateManyAndReturn({
		 *   select: { id: true },
		 *   where: {
		 *     // ... provide filter here
		 *   },
		 *   data: [
		 *     // ... provide data here
		 *   ]
		 * })
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 *
		 */
		updateManyAndReturn<T extends testUpdateManyAndReturnArgs>(
			args: SelectSubset<T, testUpdateManyAndReturnArgs<ExtArgs>>,
		): Prisma.PrismaPromise<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'updateManyAndReturn',
				GlobalOmitOptions
			>
		>;

		/**
		 * Create or update one Test.
		 * @param {testUpsertArgs} args - Arguments to update or create a Test.
		 * @example
		 * // Update or create a Test
		 * const test = await prisma.test.upsert({
		 *   create: {
		 *     // ... data to create a Test
		 *   },
		 *   update: {
		 *     // ... in case it already exists, update
		 *   },
		 *   where: {
		 *     // ... the filter for the Test we want to update
		 *   }
		 * })
		 */
		upsert<T extends testUpsertArgs>(
			args: SelectSubset<T, testUpsertArgs<ExtArgs>>,
		): Prisma__testClient<
			$Result.GetResult<
				Prisma.$testPayload<ExtArgs>,
				T,
				'upsert',
				GlobalOmitOptions
			>,
			never,
			ExtArgs,
			GlobalOmitOptions
		>;

		/**
		 * Count the number of Tests.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {testCountArgs} args - Arguments to filter Tests to count.
		 * @example
		 * // Count the number of Tests
		 * const count = await prisma.test.count({
		 *   where: {
		 *     // ... the filter for the Tests we want to count
		 *   }
		 * })
		 **/
		count<T extends testCountArgs>(
			args?: Subset<T, testCountArgs>,
		): Prisma.PrismaPromise<
			T extends $Utils.Record<'select', any>
				? T['select'] extends true
					? number
					: GetScalarType<T['select'], TestCountAggregateOutputType>
				: number
		>;

		/**
		 * Allows you to perform aggregations operations on a Test.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
		 * @example
		 * // Ordered by age ascending
		 * // Where email contains prisma.io
		 * // Limited to the 10 users
		 * const aggregations = await prisma.user.aggregate({
		 *   _avg: {
		 *     age: true,
		 *   },
		 *   where: {
		 *     email: {
		 *       contains: "prisma.io",
		 *     },
		 *   },
		 *   orderBy: {
		 *     age: "asc",
		 *   },
		 *   take: 10,
		 * })
		 **/
		aggregate<T extends TestAggregateArgs>(
			args: Subset<T, TestAggregateArgs>,
		): Prisma.PrismaPromise<GetTestAggregateType<T>>;

		/**
		 * Group by Test.
		 * Note, that providing `undefined` is treated as the value not being there.
		 * Read more here: https://pris.ly/d/null-undefined
		 * @param {testGroupByArgs} args - Group by arguments.
		 * @example
		 * // Group by city, order by createdAt, get count
		 * const result = await prisma.user.groupBy({
		 *   by: ['city', 'createdAt'],
		 *   orderBy: {
		 *     createdAt: true
		 *   },
		 *   _count: {
		 *     _all: true
		 *   },
		 * })
		 *
		 **/
		groupBy<
			T extends testGroupByArgs,
			HasSelectOrTake extends Or<
				Extends<'skip', Keys<T>>,
				Extends<'take', Keys<T>>
			>,
			OrderByArg extends True extends HasSelectOrTake
				? { orderBy: testGroupByArgs['orderBy'] }
				: { orderBy?: testGroupByArgs['orderBy'] },
			OrderFields extends ExcludeUnderscoreKeys<
				Keys<MaybeTupleToUnion<T['orderBy']>>
			>,
			ByFields extends MaybeTupleToUnion<T['by']>,
			ByValid extends Has<ByFields, OrderFields>,
			HavingFields extends GetHavingFields<T['having']>,
			HavingValid extends Has<ByFields, HavingFields>,
			ByEmpty extends T['by'] extends never[] ? True : False,
			InputErrors extends ByEmpty extends True
				? `Error: "by" must not be empty.`
				: HavingValid extends False
					? {
							[P in HavingFields]: P extends ByFields
								? never
								: P extends string
									? `Error: Field "${P}" used in "having" needs to be provided in "by".`
									: [
											Error,
											'Field ',
											P,
											` in "having" needs to be provided in "by"`,
										];
						}[HavingFields]
					: 'take' extends Keys<T>
						? 'orderBy' extends Keys<T>
							? ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields]
							: 'Error: If you provide "take", you also need to provide "orderBy"'
						: 'skip' extends Keys<T>
							? 'orderBy' extends Keys<T>
								? ByValid extends True
									? {}
									: {
											[P in OrderFields]: P extends ByFields
												? never
												: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
										}[OrderFields]
								: 'Error: If you provide "skip", you also need to provide "orderBy"'
							: ByValid extends True
								? {}
								: {
										[P in OrderFields]: P extends ByFields
											? never
											: `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
									}[OrderFields],
		>(
			args: SubsetIntersection<T, testGroupByArgs, OrderByArg> & InputErrors,
		): {} extends InputErrors
			? GetTestGroupByPayload<T>
			: Prisma.PrismaPromise<InputErrors>;
		/**
		 * Fields of the test model
		 */
		readonly fields: testFieldRefs;
	}

	/**
	 * The delegate class that acts as a "Promise-like" for test.
	 * Why is this prefixed with `Prisma__`?
	 * Because we want to prevent naming conflicts as mentioned in
	 * https://github.com/prisma/prisma-client-js/issues/707
	 */
	export interface Prisma__testClient<
		T,
		Null = never,
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
		GlobalOmitOptions = {},
	> extends Prisma.PrismaPromise<T> {
		readonly [Symbol.toStringTag]: 'PrismaPromise';
		/**
		 * Attaches callbacks for the resolution and/or rejection of the Promise.
		 * @param onfulfilled The callback to execute when the Promise is resolved.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of which ever callback is executed.
		 */
		then<TResult1 = T, TResult2 = never>(
			onfulfilled?:
				| ((value: T) => TResult1 | PromiseLike<TResult1>)
				| undefined
				| null,
			onrejected?:
				| ((reason: any) => TResult2 | PromiseLike<TResult2>)
				| undefined
				| null,
		): $Utils.JsPromise<TResult1 | TResult2>;
		/**
		 * Attaches a callback for only the rejection of the Promise.
		 * @param onrejected The callback to execute when the Promise is rejected.
		 * @returns A Promise for the completion of the callback.
		 */
		catch<TResult = never>(
			onrejected?:
				| ((reason: any) => TResult | PromiseLike<TResult>)
				| undefined
				| null,
		): $Utils.JsPromise<T | TResult>;
		/**
		 * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
		 * resolved value cannot be modified from the callback.
		 * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
		 * @returns A Promise for the completion of the callback.
		 */
		finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
	}

	/**
	 * Fields of the test model
	 */
	interface testFieldRefs {
		readonly id: FieldRef<'test', 'String'>;
		readonly value: FieldRef<'test', 'Int'>;
		readonly created_at: FieldRef<'test', 'DateTime'>;
	}

	// Custom InputTypes
	/**
	 * test findUnique
	 */
	export type testFindUniqueArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * Filter, which test to fetch.
		 */
		where: testWhereUniqueInput;
	};

	/**
	 * test findUniqueOrThrow
	 */
	export type testFindUniqueOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * Filter, which test to fetch.
		 */
		where: testWhereUniqueInput;
	};

	/**
	 * test findFirst
	 */
	export type testFindFirstArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * Filter, which test to fetch.
		 */
		where?: testWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of tests to fetch.
		 */
		orderBy?: testOrderByWithRelationInput | testOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for tests.
		 */
		cursor?: testWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` tests from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` tests.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of tests.
		 */
		distinct?: TestScalarFieldEnum | TestScalarFieldEnum[];
	};

	/**
	 * test findFirstOrThrow
	 */
	export type testFindFirstOrThrowArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * Filter, which test to fetch.
		 */
		where?: testWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of tests to fetch.
		 */
		orderBy?: testOrderByWithRelationInput | testOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for searching for tests.
		 */
		cursor?: testWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` tests from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` tests.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of tests.
		 */
		distinct?: TestScalarFieldEnum | TestScalarFieldEnum[];
	};

	/**
	 * test findMany
	 */
	export type testFindManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * Filter, which tests to fetch.
		 */
		where?: testWhereInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
		 *
		 * Determine the order of tests to fetch.
		 */
		orderBy?: testOrderByWithRelationInput | testOrderByWithRelationInput[];
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
		 *
		 * Sets the position for listing tests.
		 */
		cursor?: testWhereUniqueInput;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Take `±n` tests from the position of the cursor.
		 */
		take?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
		 *
		 * Skip the first `n` tests.
		 */
		skip?: number;
		/**
		 * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
		 *
		 * Filter by unique combinations of tests.
		 */
		distinct?: TestScalarFieldEnum | TestScalarFieldEnum[];
	};

	/**
	 * test create
	 */
	export type testCreateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * The data needed to create a test.
		 */
		data: XOR<testCreateInput, testUncheckedCreateInput>;
	};

	/**
	 * test createMany
	 */
	export type testCreateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to create many tests.
		 */
		data: testCreateManyInput | testCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * test createManyAndReturn
	 */
	export type testCreateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelectCreateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * The data used to create many tests.
		 */
		data: testCreateManyInput | testCreateManyInput[];
		skipDuplicates?: boolean;
	};

	/**
	 * test update
	 */
	export type testUpdateArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * The data needed to update a test.
		 */
		data: XOR<testUpdateInput, testUncheckedUpdateInput>;
		/**
		 * Choose, which test to update.
		 */
		where: testWhereUniqueInput;
	};

	/**
	 * test updateMany
	 */
	export type testUpdateManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * The data used to update tests.
		 */
		data: XOR<testUpdateManyMutationInput, testUncheckedUpdateManyInput>;
		/**
		 * Filter which tests to update
		 */
		where?: testWhereInput;
		/**
		 * Limit how many tests to update.
		 */
		limit?: number;
	};

	/**
	 * test updateManyAndReturn
	 */
	export type testUpdateManyAndReturnArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelectUpdateManyAndReturn<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * The data used to update tests.
		 */
		data: XOR<testUpdateManyMutationInput, testUncheckedUpdateManyInput>;
		/**
		 * Filter which tests to update
		 */
		where?: testWhereInput;
		/**
		 * Limit how many tests to update.
		 */
		limit?: number;
	};

	/**
	 * test upsert
	 */
	export type testUpsertArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * The filter to search for the test to update in case it exists.
		 */
		where: testWhereUniqueInput;
		/**
		 * In case the test found by the `where` argument doesn't exist, create a new test with this data.
		 */
		create: XOR<testCreateInput, testUncheckedCreateInput>;
		/**
		 * In case the test was found with the provided `where` argument, update it with this data.
		 */
		update: XOR<testUpdateInput, testUncheckedUpdateInput>;
	};

	/**
	 * test delete
	 */
	export type testDeleteArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
		/**
		 * Filter which test to delete.
		 */
		where: testWhereUniqueInput;
	};

	/**
	 * test deleteMany
	 */
	export type testDeleteManyArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Filter which tests to delete
		 */
		where?: testWhereInput;
		/**
		 * Limit how many tests to delete.
		 */
		limit?: number;
	};

	/**
	 * test without action
	 */
	export type testDefaultArgs<
		ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
	> = {
		/**
		 * Select specific fields to fetch from the test
		 */
		select?: testSelect<ExtArgs> | null;
		/**
		 * Omit specific fields from the test
		 */
		omit?: testOmit<ExtArgs> | null;
	};

	/**
	 * Enums
	 */

	export const TransactionIsolationLevel: {
		ReadUncommitted: 'ReadUncommitted';
		ReadCommitted: 'ReadCommitted';
		RepeatableRead: 'RepeatableRead';
		Serializable: 'Serializable';
	};

	export type TransactionIsolationLevel =
		(typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

	export const TestScalarFieldEnum: {
		id: 'id';
		value: 'value';
		created_at: 'created_at';
	};

	export type TestScalarFieldEnum =
		(typeof TestScalarFieldEnum)[keyof typeof TestScalarFieldEnum];

	export const SortOrder: {
		asc: 'asc';
		desc: 'desc';
	};

	export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

	export const QueryMode: {
		default: 'default';
		insensitive: 'insensitive';
	};

	export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

	export const NullsOrder: {
		first: 'first';
		last: 'last';
	};

	export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

	/**
	 * Field references
	 */

	/**
	 * Reference to a field of type 'String'
	 */
	export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'String'
	>;

	/**
	 * Reference to a field of type 'String[]'
	 */
	export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'String[]'
	>;

	/**
	 * Reference to a field of type 'Int'
	 */
	export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Int'
	>;

	/**
	 * Reference to a field of type 'Int[]'
	 */
	export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Int[]'
	>;

	/**
	 * Reference to a field of type 'DateTime'
	 */
	export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'DateTime'
	>;

	/**
	 * Reference to a field of type 'DateTime[]'
	 */
	export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'DateTime[]'
	>;

	/**
	 * Reference to a field of type 'Float'
	 */
	export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Float'
	>;

	/**
	 * Reference to a field of type 'Float[]'
	 */
	export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
		$PrismaModel,
		'Float[]'
	>;

	/**
	 * Deep Input Types
	 */

	export type testWhereInput = {
		AND?: testWhereInput | testWhereInput[];
		OR?: testWhereInput[];
		NOT?: testWhereInput | testWhereInput[];
		id?: StringFilter<'test'> | string;
		value?: IntNullableFilter<'test'> | number | null;
		created_at?: DateTimeFilter<'test'> | Date | string;
	};

	export type testOrderByWithRelationInput = {
		id?: SortOrder;
		value?: SortOrderInput | SortOrder;
		created_at?: SortOrder;
	};

	export type testWhereUniqueInput = Prisma.AtLeast<
		{
			id?: string;
			AND?: testWhereInput | testWhereInput[];
			OR?: testWhereInput[];
			NOT?: testWhereInput | testWhereInput[];
			value?: IntNullableFilter<'test'> | number | null;
			created_at?: DateTimeFilter<'test'> | Date | string;
		},
		'id'
	>;

	export type testOrderByWithAggregationInput = {
		id?: SortOrder;
		value?: SortOrderInput | SortOrder;
		created_at?: SortOrder;
		_count?: testCountOrderByAggregateInput;
		_avg?: testAvgOrderByAggregateInput;
		_max?: testMaxOrderByAggregateInput;
		_min?: testMinOrderByAggregateInput;
		_sum?: testSumOrderByAggregateInput;
	};

	export type testScalarWhereWithAggregatesInput = {
		AND?:
			| testScalarWhereWithAggregatesInput
			| testScalarWhereWithAggregatesInput[];
		OR?: testScalarWhereWithAggregatesInput[];
		NOT?:
			| testScalarWhereWithAggregatesInput
			| testScalarWhereWithAggregatesInput[];
		id?: StringWithAggregatesFilter<'test'> | string;
		value?: IntNullableWithAggregatesFilter<'test'> | number | null;
		created_at?: DateTimeWithAggregatesFilter<'test'> | Date | string;
	};

	export type testCreateInput = {
		id: string;
		value?: number | null;
		created_at?: Date | string;
	};

	export type testUncheckedCreateInput = {
		id: string;
		value?: number | null;
		created_at?: Date | string;
	};

	export type testUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		value?: NullableIntFieldUpdateOperationsInput | number | null;
		created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type testUncheckedUpdateInput = {
		id?: StringFieldUpdateOperationsInput | string;
		value?: NullableIntFieldUpdateOperationsInput | number | null;
		created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type testCreateManyInput = {
		id: string;
		value?: number | null;
		created_at?: Date | string;
	};

	export type testUpdateManyMutationInput = {
		id?: StringFieldUpdateOperationsInput | string;
		value?: NullableIntFieldUpdateOperationsInput | number | null;
		created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type testUncheckedUpdateManyInput = {
		id?: StringFieldUpdateOperationsInput | string;
		value?: NullableIntFieldUpdateOperationsInput | number | null;
		created_at?: DateTimeFieldUpdateOperationsInput | Date | string;
	};

	export type StringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		mode?: QueryMode;
		not?: NestedStringFilter<$PrismaModel> | string;
	};

	export type IntNullableFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableFilter<$PrismaModel> | number | null;
	};

	export type DateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
	};

	export type SortOrderInput = {
		sort: SortOrder;
		nulls?: NullsOrder;
	};

	export type testCountOrderByAggregateInput = {
		id?: SortOrder;
		value?: SortOrder;
		created_at?: SortOrder;
	};

	export type testAvgOrderByAggregateInput = {
		value?: SortOrder;
	};

	export type testMaxOrderByAggregateInput = {
		id?: SortOrder;
		value?: SortOrder;
		created_at?: SortOrder;
	};

	export type testMinOrderByAggregateInput = {
		id?: SortOrder;
		value?: SortOrder;
		created_at?: SortOrder;
	};

	export type testSumOrderByAggregateInput = {
		value?: SortOrder;
	};

	export type StringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		mode?: QueryMode;
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedStringFilter<$PrismaModel>;
		_max?: NestedStringFilter<$PrismaModel>;
	};

	export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_avg?: NestedFloatNullableFilter<$PrismaModel>;
		_sum?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedIntNullableFilter<$PrismaModel>;
		_max?: NestedIntNullableFilter<$PrismaModel>;
	};

	export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedDateTimeFilter<$PrismaModel>;
		_max?: NestedDateTimeFilter<$PrismaModel>;
	};

	export type StringFieldUpdateOperationsInput = {
		set?: string;
	};

	export type NullableIntFieldUpdateOperationsInput = {
		set?: number | null;
		increment?: number;
		decrement?: number;
		multiply?: number;
		divide?: number;
	};

	export type DateTimeFieldUpdateOperationsInput = {
		set?: Date | string;
	};

	export type NestedStringFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		not?: NestedStringFilter<$PrismaModel> | string;
	};

	export type NestedIntNullableFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableFilter<$PrismaModel> | number | null;
	};

	export type NestedDateTimeFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
	};

	export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
		equals?: string | StringFieldRefInput<$PrismaModel>;
		in?: string[] | ListStringFieldRefInput<$PrismaModel>;
		notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
		lt?: string | StringFieldRefInput<$PrismaModel>;
		lte?: string | StringFieldRefInput<$PrismaModel>;
		gt?: string | StringFieldRefInput<$PrismaModel>;
		gte?: string | StringFieldRefInput<$PrismaModel>;
		contains?: string | StringFieldRefInput<$PrismaModel>;
		startsWith?: string | StringFieldRefInput<$PrismaModel>;
		endsWith?: string | StringFieldRefInput<$PrismaModel>;
		not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedStringFilter<$PrismaModel>;
		_max?: NestedStringFilter<$PrismaModel>;
	};

	export type NestedIntFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel>;
		in?: number[] | ListIntFieldRefInput<$PrismaModel>;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntFilter<$PrismaModel> | number;
	};

	export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
		equals?: number | IntFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
		lt?: number | IntFieldRefInput<$PrismaModel>;
		lte?: number | IntFieldRefInput<$PrismaModel>;
		gt?: number | IntFieldRefInput<$PrismaModel>;
		gte?: number | IntFieldRefInput<$PrismaModel>;
		not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
		_count?: NestedIntNullableFilter<$PrismaModel>;
		_avg?: NestedFloatNullableFilter<$PrismaModel>;
		_sum?: NestedIntNullableFilter<$PrismaModel>;
		_min?: NestedIntNullableFilter<$PrismaModel>;
		_max?: NestedIntNullableFilter<$PrismaModel>;
	};

	export type NestedFloatNullableFilter<$PrismaModel = never> = {
		equals?: number | FloatFieldRefInput<$PrismaModel> | null;
		in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
		notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
		lt?: number | FloatFieldRefInput<$PrismaModel>;
		lte?: number | FloatFieldRefInput<$PrismaModel>;
		gt?: number | FloatFieldRefInput<$PrismaModel>;
		gte?: number | FloatFieldRefInput<$PrismaModel>;
		not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
	};

	export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
		equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
		lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
		not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
		_count?: NestedIntFilter<$PrismaModel>;
		_min?: NestedDateTimeFilter<$PrismaModel>;
		_max?: NestedDateTimeFilter<$PrismaModel>;
	};

	/**
	 * Batch Payload for updateMany & deleteMany & createMany
	 */

	export type BatchPayload = {
		count: number;
	};

	/**
	 * DMMF
	 */
	export const dmmf: runtime.BaseDMMF;
}
