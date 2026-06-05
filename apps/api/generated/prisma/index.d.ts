
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model verification_codes
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type verification_codes = $Result.DefaultSelection<Prisma.$verification_codesPayload>
/**
 * Model auth_session
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type auth_session = $Result.DefaultSelection<Prisma.$auth_sessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const verification_code_type: {
  login: 'login',
  signup: 'signup',
  forgot_password: 'forgot_password'
};

export type verification_code_type = (typeof verification_code_type)[keyof typeof verification_code_type]

}

export type verification_code_type = $Enums.verification_code_type

export const verification_code_type: typeof $Enums.verification_code_type

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification_codes`: Exposes CRUD operations for the **verification_codes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verification_codes
    * const verification_codes = await prisma.verification_codes.findMany()
    * ```
    */
  get verification_codes(): Prisma.verification_codesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auth_session`: Exposes CRUD operations for the **auth_session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auth_sessions
    * const auth_sessions = await prisma.auth_session.findMany()
    * ```
    */
  get auth_session(): Prisma.auth_sessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    verification_codes: 'verification_codes',
    auth_session: 'auth_session'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "verification_codes" | "auth_session"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      verification_codes: {
        payload: Prisma.$verification_codesPayload<ExtArgs>
        fields: Prisma.verification_codesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.verification_codesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.verification_codesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>
          }
          findFirst: {
            args: Prisma.verification_codesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.verification_codesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>
          }
          findMany: {
            args: Prisma.verification_codesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>[]
          }
          create: {
            args: Prisma.verification_codesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>
          }
          createMany: {
            args: Prisma.verification_codesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.verification_codesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>[]
          }
          delete: {
            args: Prisma.verification_codesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>
          }
          update: {
            args: Prisma.verification_codesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>
          }
          deleteMany: {
            args: Prisma.verification_codesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.verification_codesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.verification_codesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>[]
          }
          upsert: {
            args: Prisma.verification_codesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_codesPayload>
          }
          aggregate: {
            args: Prisma.Verification_codesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification_codes>
          }
          groupBy: {
            args: Prisma.verification_codesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Verification_codesGroupByOutputType>[]
          }
          count: {
            args: Prisma.verification_codesCountArgs<ExtArgs>
            result: $Utils.Optional<Verification_codesCountAggregateOutputType> | number
          }
        }
      }
      auth_session: {
        payload: Prisma.$auth_sessionPayload<ExtArgs>
        fields: Prisma.auth_sessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.auth_sessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.auth_sessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>
          }
          findFirst: {
            args: Prisma.auth_sessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.auth_sessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>
          }
          findMany: {
            args: Prisma.auth_sessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>[]
          }
          create: {
            args: Prisma.auth_sessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>
          }
          createMany: {
            args: Prisma.auth_sessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.auth_sessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>[]
          }
          delete: {
            args: Prisma.auth_sessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>
          }
          update: {
            args: Prisma.auth_sessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>
          }
          deleteMany: {
            args: Prisma.auth_sessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.auth_sessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.auth_sessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>[]
          }
          upsert: {
            args: Prisma.auth_sessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionPayload>
          }
          aggregate: {
            args: Prisma.Auth_sessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuth_session>
          }
          groupBy: {
            args: Prisma.auth_sessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Auth_sessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.auth_sessionCountArgs<ExtArgs>
            result: $Utils.Optional<Auth_sessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    omit?: Prisma.GlobalOmitConfig
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
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    verification_codes?: verification_codesOmit
    auth_session?: auth_sessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
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
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    auth_session: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth_session?: boolean | UsersCountOutputTypeCountAuth_sessionArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountAuth_sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_sessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    deleted_at: Date | null
    edited_at: Date | null
    created_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    deleted_at: Date | null
    edited_at: Date | null
    created_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    deleted_at: number
    edited_at: number
    created_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    deleted_at?: true
    edited_at?: true
    created_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    deleted_at?: true
    edited_at?: true
    created_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    deleted_at?: true
    edited_at?: true
    created_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    email: string
    username: string | null
    password: string | null
    deleted_at: Date | null
    edited_at: Date | null
    created_at: Date
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    deleted_at?: boolean
    edited_at?: boolean
    created_at?: boolean
    auth_session?: boolean | users$auth_sessionArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    deleted_at?: boolean
    edited_at?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    deleted_at?: boolean
    edited_at?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    deleted_at?: boolean
    edited_at?: boolean
    created_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "deleted_at" | "edited_at" | "created_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth_session?: boolean | users$auth_sessionArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      auth_session: Prisma.$auth_sessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string | null
      password: string | null
      deleted_at: Date | null
      edited_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
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
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auth_session<T extends users$auth_sessionArgs<ExtArgs> = {}>(args?: Subset<T, users$auth_sessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly username: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly deleted_at: FieldRef<"users", 'DateTime'>
    readonly edited_at: FieldRef<"users", 'DateTime'>
    readonly created_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.auth_session
   */
  export type users$auth_sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    where?: auth_sessionWhereInput
    orderBy?: auth_sessionOrderByWithRelationInput | auth_sessionOrderByWithRelationInput[]
    cursor?: auth_sessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Auth_sessionScalarFieldEnum | Auth_sessionScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model verification_codes
   */

  export type AggregateVerification_codes = {
    _count: Verification_codesCountAggregateOutputType | null
    _min: Verification_codesMinAggregateOutputType | null
    _max: Verification_codesMaxAggregateOutputType | null
  }

  export type Verification_codesMinAggregateOutputType = {
    id: string | null
    email: string | null
    code: string | null
    expiry_at: Date | null
    created_at: Date | null
    type: $Enums.verification_code_type | null
  }

  export type Verification_codesMaxAggregateOutputType = {
    id: string | null
    email: string | null
    code: string | null
    expiry_at: Date | null
    created_at: Date | null
    type: $Enums.verification_code_type | null
  }

  export type Verification_codesCountAggregateOutputType = {
    id: number
    email: number
    code: number
    expiry_at: number
    created_at: number
    type: number
    _all: number
  }


  export type Verification_codesMinAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiry_at?: true
    created_at?: true
    type?: true
  }

  export type Verification_codesMaxAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiry_at?: true
    created_at?: true
    type?: true
  }

  export type Verification_codesCountAggregateInputType = {
    id?: true
    email?: true
    code?: true
    expiry_at?: true
    created_at?: true
    type?: true
    _all?: true
  }

  export type Verification_codesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification_codes to aggregate.
     */
    where?: verification_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_codes to fetch.
     */
    orderBy?: verification_codesOrderByWithRelationInput | verification_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: verification_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned verification_codes
    **/
    _count?: true | Verification_codesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Verification_codesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Verification_codesMaxAggregateInputType
  }

  export type GetVerification_codesAggregateType<T extends Verification_codesAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification_codes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification_codes[P]>
      : GetScalarType<T[P], AggregateVerification_codes[P]>
  }




  export type verification_codesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: verification_codesWhereInput
    orderBy?: verification_codesOrderByWithAggregationInput | verification_codesOrderByWithAggregationInput[]
    by: Verification_codesScalarFieldEnum[] | Verification_codesScalarFieldEnum
    having?: verification_codesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Verification_codesCountAggregateInputType | true
    _min?: Verification_codesMinAggregateInputType
    _max?: Verification_codesMaxAggregateInputType
  }

  export type Verification_codesGroupByOutputType = {
    id: string
    email: string
    code: string
    expiry_at: Date
    created_at: Date
    type: $Enums.verification_code_type
    _count: Verification_codesCountAggregateOutputType | null
    _min: Verification_codesMinAggregateOutputType | null
    _max: Verification_codesMaxAggregateOutputType | null
  }

  type GetVerification_codesGroupByPayload<T extends verification_codesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Verification_codesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Verification_codesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Verification_codesGroupByOutputType[P]>
            : GetScalarType<T[P], Verification_codesGroupByOutputType[P]>
        }
      >
    >


  export type verification_codesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiry_at?: boolean
    created_at?: boolean
    type?: boolean
  }, ExtArgs["result"]["verification_codes"]>

  export type verification_codesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiry_at?: boolean
    created_at?: boolean
    type?: boolean
  }, ExtArgs["result"]["verification_codes"]>

  export type verification_codesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    code?: boolean
    expiry_at?: boolean
    created_at?: boolean
    type?: boolean
  }, ExtArgs["result"]["verification_codes"]>

  export type verification_codesSelectScalar = {
    id?: boolean
    email?: boolean
    code?: boolean
    expiry_at?: boolean
    created_at?: boolean
    type?: boolean
  }

  export type verification_codesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "code" | "expiry_at" | "created_at" | "type", ExtArgs["result"]["verification_codes"]>

  export type $verification_codesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "verification_codes"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      code: string
      expiry_at: Date
      created_at: Date
      type: $Enums.verification_code_type
    }, ExtArgs["result"]["verification_codes"]>
    composites: {}
  }

  type verification_codesGetPayload<S extends boolean | null | undefined | verification_codesDefaultArgs> = $Result.GetResult<Prisma.$verification_codesPayload, S>

  type verification_codesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<verification_codesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Verification_codesCountAggregateInputType | true
    }

  export interface verification_codesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['verification_codes'], meta: { name: 'verification_codes' } }
    /**
     * Find zero or one Verification_codes that matches the filter.
     * @param {verification_codesFindUniqueArgs} args - Arguments to find a Verification_codes
     * @example
     * // Get one Verification_codes
     * const verification_codes = await prisma.verification_codes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends verification_codesFindUniqueArgs>(args: SelectSubset<T, verification_codesFindUniqueArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification_codes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {verification_codesFindUniqueOrThrowArgs} args - Arguments to find a Verification_codes
     * @example
     * // Get one Verification_codes
     * const verification_codes = await prisma.verification_codes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends verification_codesFindUniqueOrThrowArgs>(args: SelectSubset<T, verification_codesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification_codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_codesFindFirstArgs} args - Arguments to find a Verification_codes
     * @example
     * // Get one Verification_codes
     * const verification_codes = await prisma.verification_codes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends verification_codesFindFirstArgs>(args?: SelectSubset<T, verification_codesFindFirstArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification_codes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_codesFindFirstOrThrowArgs} args - Arguments to find a Verification_codes
     * @example
     * // Get one Verification_codes
     * const verification_codes = await prisma.verification_codes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends verification_codesFindFirstOrThrowArgs>(args?: SelectSubset<T, verification_codesFindFirstOrThrowArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verification_codes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_codesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verification_codes
     * const verification_codes = await prisma.verification_codes.findMany()
     * 
     * // Get first 10 Verification_codes
     * const verification_codes = await prisma.verification_codes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verification_codesWithIdOnly = await prisma.verification_codes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends verification_codesFindManyArgs>(args?: SelectSubset<T, verification_codesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification_codes.
     * @param {verification_codesCreateArgs} args - Arguments to create a Verification_codes.
     * @example
     * // Create one Verification_codes
     * const Verification_codes = await prisma.verification_codes.create({
     *   data: {
     *     // ... data to create a Verification_codes
     *   }
     * })
     * 
     */
    create<T extends verification_codesCreateArgs>(args: SelectSubset<T, verification_codesCreateArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verification_codes.
     * @param {verification_codesCreateManyArgs} args - Arguments to create many Verification_codes.
     * @example
     * // Create many Verification_codes
     * const verification_codes = await prisma.verification_codes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends verification_codesCreateManyArgs>(args?: SelectSubset<T, verification_codesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verification_codes and returns the data saved in the database.
     * @param {verification_codesCreateManyAndReturnArgs} args - Arguments to create many Verification_codes.
     * @example
     * // Create many Verification_codes
     * const verification_codes = await prisma.verification_codes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verification_codes and only return the `id`
     * const verification_codesWithIdOnly = await prisma.verification_codes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends verification_codesCreateManyAndReturnArgs>(args?: SelectSubset<T, verification_codesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification_codes.
     * @param {verification_codesDeleteArgs} args - Arguments to delete one Verification_codes.
     * @example
     * // Delete one Verification_codes
     * const Verification_codes = await prisma.verification_codes.delete({
     *   where: {
     *     // ... filter to delete one Verification_codes
     *   }
     * })
     * 
     */
    delete<T extends verification_codesDeleteArgs>(args: SelectSubset<T, verification_codesDeleteArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification_codes.
     * @param {verification_codesUpdateArgs} args - Arguments to update one Verification_codes.
     * @example
     * // Update one Verification_codes
     * const verification_codes = await prisma.verification_codes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends verification_codesUpdateArgs>(args: SelectSubset<T, verification_codesUpdateArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verification_codes.
     * @param {verification_codesDeleteManyArgs} args - Arguments to filter Verification_codes to delete.
     * @example
     * // Delete a few Verification_codes
     * const { count } = await prisma.verification_codes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends verification_codesDeleteManyArgs>(args?: SelectSubset<T, verification_codesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verification_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_codesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verification_codes
     * const verification_codes = await prisma.verification_codes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends verification_codesUpdateManyArgs>(args: SelectSubset<T, verification_codesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verification_codes and returns the data updated in the database.
     * @param {verification_codesUpdateManyAndReturnArgs} args - Arguments to update many Verification_codes.
     * @example
     * // Update many Verification_codes
     * const verification_codes = await prisma.verification_codes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verification_codes and only return the `id`
     * const verification_codesWithIdOnly = await prisma.verification_codes.updateManyAndReturn({
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
    updateManyAndReturn<T extends verification_codesUpdateManyAndReturnArgs>(args: SelectSubset<T, verification_codesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification_codes.
     * @param {verification_codesUpsertArgs} args - Arguments to update or create a Verification_codes.
     * @example
     * // Update or create a Verification_codes
     * const verification_codes = await prisma.verification_codes.upsert({
     *   create: {
     *     // ... data to create a Verification_codes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification_codes we want to update
     *   }
     * })
     */
    upsert<T extends verification_codesUpsertArgs>(args: SelectSubset<T, verification_codesUpsertArgs<ExtArgs>>): Prisma__verification_codesClient<$Result.GetResult<Prisma.$verification_codesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verification_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_codesCountArgs} args - Arguments to filter Verification_codes to count.
     * @example
     * // Count the number of Verification_codes
     * const count = await prisma.verification_codes.count({
     *   where: {
     *     // ... the filter for the Verification_codes we want to count
     *   }
     * })
    **/
    count<T extends verification_codesCountArgs>(
      args?: Subset<T, verification_codesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Verification_codesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Verification_codesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Verification_codesAggregateArgs>(args: Subset<T, Verification_codesAggregateArgs>): Prisma.PrismaPromise<GetVerification_codesAggregateType<T>>

    /**
     * Group by Verification_codes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_codesGroupByArgs} args - Group by arguments.
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
      T extends verification_codesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: verification_codesGroupByArgs['orderBy'] }
        : { orderBy?: verification_codesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, verification_codesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerification_codesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the verification_codes model
   */
  readonly fields: verification_codesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for verification_codes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__verification_codesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the verification_codes model
   */
  interface verification_codesFieldRefs {
    readonly id: FieldRef<"verification_codes", 'String'>
    readonly email: FieldRef<"verification_codes", 'String'>
    readonly code: FieldRef<"verification_codes", 'String'>
    readonly expiry_at: FieldRef<"verification_codes", 'DateTime'>
    readonly created_at: FieldRef<"verification_codes", 'DateTime'>
    readonly type: FieldRef<"verification_codes", 'verification_code_type'>
  }
    

  // Custom InputTypes
  /**
   * verification_codes findUnique
   */
  export type verification_codesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * Filter, which verification_codes to fetch.
     */
    where: verification_codesWhereUniqueInput
  }

  /**
   * verification_codes findUniqueOrThrow
   */
  export type verification_codesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * Filter, which verification_codes to fetch.
     */
    where: verification_codesWhereUniqueInput
  }

  /**
   * verification_codes findFirst
   */
  export type verification_codesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * Filter, which verification_codes to fetch.
     */
    where?: verification_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_codes to fetch.
     */
    orderBy?: verification_codesOrderByWithRelationInput | verification_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verification_codes.
     */
    cursor?: verification_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verification_codes.
     */
    distinct?: Verification_codesScalarFieldEnum | Verification_codesScalarFieldEnum[]
  }

  /**
   * verification_codes findFirstOrThrow
   */
  export type verification_codesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * Filter, which verification_codes to fetch.
     */
    where?: verification_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_codes to fetch.
     */
    orderBy?: verification_codesOrderByWithRelationInput | verification_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verification_codes.
     */
    cursor?: verification_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verification_codes.
     */
    distinct?: Verification_codesScalarFieldEnum | Verification_codesScalarFieldEnum[]
  }

  /**
   * verification_codes findMany
   */
  export type verification_codesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * Filter, which verification_codes to fetch.
     */
    where?: verification_codesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_codes to fetch.
     */
    orderBy?: verification_codesOrderByWithRelationInput | verification_codesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing verification_codes.
     */
    cursor?: verification_codesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_codes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_codes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verification_codes.
     */
    distinct?: Verification_codesScalarFieldEnum | Verification_codesScalarFieldEnum[]
  }

  /**
   * verification_codes create
   */
  export type verification_codesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * The data needed to create a verification_codes.
     */
    data: XOR<verification_codesCreateInput, verification_codesUncheckedCreateInput>
  }

  /**
   * verification_codes createMany
   */
  export type verification_codesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many verification_codes.
     */
    data: verification_codesCreateManyInput | verification_codesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification_codes createManyAndReturn
   */
  export type verification_codesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * The data used to create many verification_codes.
     */
    data: verification_codesCreateManyInput | verification_codesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification_codes update
   */
  export type verification_codesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * The data needed to update a verification_codes.
     */
    data: XOR<verification_codesUpdateInput, verification_codesUncheckedUpdateInput>
    /**
     * Choose, which verification_codes to update.
     */
    where: verification_codesWhereUniqueInput
  }

  /**
   * verification_codes updateMany
   */
  export type verification_codesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update verification_codes.
     */
    data: XOR<verification_codesUpdateManyMutationInput, verification_codesUncheckedUpdateManyInput>
    /**
     * Filter which verification_codes to update
     */
    where?: verification_codesWhereInput
    /**
     * Limit how many verification_codes to update.
     */
    limit?: number
  }

  /**
   * verification_codes updateManyAndReturn
   */
  export type verification_codesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * The data used to update verification_codes.
     */
    data: XOR<verification_codesUpdateManyMutationInput, verification_codesUncheckedUpdateManyInput>
    /**
     * Filter which verification_codes to update
     */
    where?: verification_codesWhereInput
    /**
     * Limit how many verification_codes to update.
     */
    limit?: number
  }

  /**
   * verification_codes upsert
   */
  export type verification_codesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * The filter to search for the verification_codes to update in case it exists.
     */
    where: verification_codesWhereUniqueInput
    /**
     * In case the verification_codes found by the `where` argument doesn't exist, create a new verification_codes with this data.
     */
    create: XOR<verification_codesCreateInput, verification_codesUncheckedCreateInput>
    /**
     * In case the verification_codes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<verification_codesUpdateInput, verification_codesUncheckedUpdateInput>
  }

  /**
   * verification_codes delete
   */
  export type verification_codesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
    /**
     * Filter which verification_codes to delete.
     */
    where: verification_codesWhereUniqueInput
  }

  /**
   * verification_codes deleteMany
   */
  export type verification_codesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification_codes to delete
     */
    where?: verification_codesWhereInput
    /**
     * Limit how many verification_codes to delete.
     */
    limit?: number
  }

  /**
   * verification_codes without action
   */
  export type verification_codesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_codes
     */
    select?: verification_codesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_codes
     */
    omit?: verification_codesOmit<ExtArgs> | null
  }


  /**
   * Model auth_session
   */

  export type AggregateAuth_session = {
    _count: Auth_sessionCountAggregateOutputType | null
    _min: Auth_sessionMinAggregateOutputType | null
    _max: Auth_sessionMaxAggregateOutputType | null
  }

  export type Auth_sessionMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    refresh_token_hash: string | null
    last_seen_at: Date | null
    created_at: Date | null
    ip: string | null
  }

  export type Auth_sessionMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    refresh_token_hash: string | null
    last_seen_at: Date | null
    created_at: Date | null
    ip: string | null
  }

  export type Auth_sessionCountAggregateOutputType = {
    id: number
    user_id: number
    refresh_token_hash: number
    last_seen_at: number
    created_at: number
    browser: number
    os: number
    device: number
    cpu: number
    ip: number
    _all: number
  }


  export type Auth_sessionMinAggregateInputType = {
    id?: true
    user_id?: true
    refresh_token_hash?: true
    last_seen_at?: true
    created_at?: true
    ip?: true
  }

  export type Auth_sessionMaxAggregateInputType = {
    id?: true
    user_id?: true
    refresh_token_hash?: true
    last_seen_at?: true
    created_at?: true
    ip?: true
  }

  export type Auth_sessionCountAggregateInputType = {
    id?: true
    user_id?: true
    refresh_token_hash?: true
    last_seen_at?: true
    created_at?: true
    browser?: true
    os?: true
    device?: true
    cpu?: true
    ip?: true
    _all?: true
  }

  export type Auth_sessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_session to aggregate.
     */
    where?: auth_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionOrderByWithRelationInput | auth_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: auth_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auth_sessions
    **/
    _count?: true | Auth_sessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Auth_sessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Auth_sessionMaxAggregateInputType
  }

  export type GetAuth_sessionAggregateType<T extends Auth_sessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAuth_session]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuth_session[P]>
      : GetScalarType<T[P], AggregateAuth_session[P]>
  }




  export type auth_sessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_sessionWhereInput
    orderBy?: auth_sessionOrderByWithAggregationInput | auth_sessionOrderByWithAggregationInput[]
    by: Auth_sessionScalarFieldEnum[] | Auth_sessionScalarFieldEnum
    having?: auth_sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Auth_sessionCountAggregateInputType | true
    _min?: Auth_sessionMinAggregateInputType
    _max?: Auth_sessionMaxAggregateInputType
  }

  export type Auth_sessionGroupByOutputType = {
    id: string
    user_id: string
    refresh_token_hash: string
    last_seen_at: Date | null
    created_at: Date
    browser: JsonValue | null
    os: JsonValue | null
    device: JsonValue | null
    cpu: JsonValue | null
    ip: string | null
    _count: Auth_sessionCountAggregateOutputType | null
    _min: Auth_sessionMinAggregateOutputType | null
    _max: Auth_sessionMaxAggregateOutputType | null
  }

  type GetAuth_sessionGroupByPayload<T extends auth_sessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Auth_sessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Auth_sessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Auth_sessionGroupByOutputType[P]>
            : GetScalarType<T[P], Auth_sessionGroupByOutputType[P]>
        }
      >
    >


  export type auth_sessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    refresh_token_hash?: boolean
    last_seen_at?: boolean
    created_at?: boolean
    browser?: boolean
    os?: boolean
    device?: boolean
    cpu?: boolean
    ip?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth_session"]>

  export type auth_sessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    refresh_token_hash?: boolean
    last_seen_at?: boolean
    created_at?: boolean
    browser?: boolean
    os?: boolean
    device?: boolean
    cpu?: boolean
    ip?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth_session"]>

  export type auth_sessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    refresh_token_hash?: boolean
    last_seen_at?: boolean
    created_at?: boolean
    browser?: boolean
    os?: boolean
    device?: boolean
    cpu?: boolean
    ip?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth_session"]>

  export type auth_sessionSelectScalar = {
    id?: boolean
    user_id?: boolean
    refresh_token_hash?: boolean
    last_seen_at?: boolean
    created_at?: boolean
    browser?: boolean
    os?: boolean
    device?: boolean
    cpu?: boolean
    ip?: boolean
  }

  export type auth_sessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "refresh_token_hash" | "last_seen_at" | "created_at" | "browser" | "os" | "device" | "cpu" | "ip", ExtArgs["result"]["auth_session"]>
  export type auth_sessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type auth_sessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type auth_sessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $auth_sessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "auth_session"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      refresh_token_hash: string
      last_seen_at: Date | null
      created_at: Date
      browser: Prisma.JsonValue | null
      os: Prisma.JsonValue | null
      device: Prisma.JsonValue | null
      cpu: Prisma.JsonValue | null
      ip: string | null
    }, ExtArgs["result"]["auth_session"]>
    composites: {}
  }

  type auth_sessionGetPayload<S extends boolean | null | undefined | auth_sessionDefaultArgs> = $Result.GetResult<Prisma.$auth_sessionPayload, S>

  type auth_sessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<auth_sessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Auth_sessionCountAggregateInputType | true
    }

  export interface auth_sessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['auth_session'], meta: { name: 'auth_session' } }
    /**
     * Find zero or one Auth_session that matches the filter.
     * @param {auth_sessionFindUniqueArgs} args - Arguments to find a Auth_session
     * @example
     * // Get one Auth_session
     * const auth_session = await prisma.auth_session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends auth_sessionFindUniqueArgs>(args: SelectSubset<T, auth_sessionFindUniqueArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Auth_session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {auth_sessionFindUniqueOrThrowArgs} args - Arguments to find a Auth_session
     * @example
     * // Get one Auth_session
     * const auth_session = await prisma.auth_session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends auth_sessionFindUniqueOrThrowArgs>(args: SelectSubset<T, auth_sessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionFindFirstArgs} args - Arguments to find a Auth_session
     * @example
     * // Get one Auth_session
     * const auth_session = await prisma.auth_session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends auth_sessionFindFirstArgs>(args?: SelectSubset<T, auth_sessionFindFirstArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionFindFirstOrThrowArgs} args - Arguments to find a Auth_session
     * @example
     * // Get one Auth_session
     * const auth_session = await prisma.auth_session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends auth_sessionFindFirstOrThrowArgs>(args?: SelectSubset<T, auth_sessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Auth_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auth_sessions
     * const auth_sessions = await prisma.auth_session.findMany()
     * 
     * // Get first 10 Auth_sessions
     * const auth_sessions = await prisma.auth_session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auth_sessionWithIdOnly = await prisma.auth_session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends auth_sessionFindManyArgs>(args?: SelectSubset<T, auth_sessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Auth_session.
     * @param {auth_sessionCreateArgs} args - Arguments to create a Auth_session.
     * @example
     * // Create one Auth_session
     * const Auth_session = await prisma.auth_session.create({
     *   data: {
     *     // ... data to create a Auth_session
     *   }
     * })
     * 
     */
    create<T extends auth_sessionCreateArgs>(args: SelectSubset<T, auth_sessionCreateArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Auth_sessions.
     * @param {auth_sessionCreateManyArgs} args - Arguments to create many Auth_sessions.
     * @example
     * // Create many Auth_sessions
     * const auth_session = await prisma.auth_session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends auth_sessionCreateManyArgs>(args?: SelectSubset<T, auth_sessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Auth_sessions and returns the data saved in the database.
     * @param {auth_sessionCreateManyAndReturnArgs} args - Arguments to create many Auth_sessions.
     * @example
     * // Create many Auth_sessions
     * const auth_session = await prisma.auth_session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Auth_sessions and only return the `id`
     * const auth_sessionWithIdOnly = await prisma.auth_session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends auth_sessionCreateManyAndReturnArgs>(args?: SelectSubset<T, auth_sessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Auth_session.
     * @param {auth_sessionDeleteArgs} args - Arguments to delete one Auth_session.
     * @example
     * // Delete one Auth_session
     * const Auth_session = await prisma.auth_session.delete({
     *   where: {
     *     // ... filter to delete one Auth_session
     *   }
     * })
     * 
     */
    delete<T extends auth_sessionDeleteArgs>(args: SelectSubset<T, auth_sessionDeleteArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Auth_session.
     * @param {auth_sessionUpdateArgs} args - Arguments to update one Auth_session.
     * @example
     * // Update one Auth_session
     * const auth_session = await prisma.auth_session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends auth_sessionUpdateArgs>(args: SelectSubset<T, auth_sessionUpdateArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Auth_sessions.
     * @param {auth_sessionDeleteManyArgs} args - Arguments to filter Auth_sessions to delete.
     * @example
     * // Delete a few Auth_sessions
     * const { count } = await prisma.auth_session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends auth_sessionDeleteManyArgs>(args?: SelectSubset<T, auth_sessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auth_sessions
     * const auth_session = await prisma.auth_session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends auth_sessionUpdateManyArgs>(args: SelectSubset<T, auth_sessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_sessions and returns the data updated in the database.
     * @param {auth_sessionUpdateManyAndReturnArgs} args - Arguments to update many Auth_sessions.
     * @example
     * // Update many Auth_sessions
     * const auth_session = await prisma.auth_session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Auth_sessions and only return the `id`
     * const auth_sessionWithIdOnly = await prisma.auth_session.updateManyAndReturn({
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
    updateManyAndReturn<T extends auth_sessionUpdateManyAndReturnArgs>(args: SelectSubset<T, auth_sessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Auth_session.
     * @param {auth_sessionUpsertArgs} args - Arguments to update or create a Auth_session.
     * @example
     * // Update or create a Auth_session
     * const auth_session = await prisma.auth_session.upsert({
     *   create: {
     *     // ... data to create a Auth_session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auth_session we want to update
     *   }
     * })
     */
    upsert<T extends auth_sessionUpsertArgs>(args: SelectSubset<T, auth_sessionUpsertArgs<ExtArgs>>): Prisma__auth_sessionClient<$Result.GetResult<Prisma.$auth_sessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Auth_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionCountArgs} args - Arguments to filter Auth_sessions to count.
     * @example
     * // Count the number of Auth_sessions
     * const count = await prisma.auth_session.count({
     *   where: {
     *     // ... the filter for the Auth_sessions we want to count
     *   }
     * })
    **/
    count<T extends auth_sessionCountArgs>(
      args?: Subset<T, auth_sessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auth_sessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auth_session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auth_sessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Auth_sessionAggregateArgs>(args: Subset<T, Auth_sessionAggregateArgs>): Prisma.PrismaPromise<GetAuth_sessionAggregateType<T>>

    /**
     * Group by Auth_session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionGroupByArgs} args - Group by arguments.
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
      T extends auth_sessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: auth_sessionGroupByArgs['orderBy'] }
        : { orderBy?: auth_sessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
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
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, auth_sessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuth_sessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the auth_session model
   */
  readonly fields: auth_sessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for auth_session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__auth_sessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the auth_session model
   */
  interface auth_sessionFieldRefs {
    readonly id: FieldRef<"auth_session", 'String'>
    readonly user_id: FieldRef<"auth_session", 'String'>
    readonly refresh_token_hash: FieldRef<"auth_session", 'String'>
    readonly last_seen_at: FieldRef<"auth_session", 'DateTime'>
    readonly created_at: FieldRef<"auth_session", 'DateTime'>
    readonly browser: FieldRef<"auth_session", 'Json'>
    readonly os: FieldRef<"auth_session", 'Json'>
    readonly device: FieldRef<"auth_session", 'Json'>
    readonly cpu: FieldRef<"auth_session", 'Json'>
    readonly ip: FieldRef<"auth_session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * auth_session findUnique
   */
  export type auth_sessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * Filter, which auth_session to fetch.
     */
    where: auth_sessionWhereUniqueInput
  }

  /**
   * auth_session findUniqueOrThrow
   */
  export type auth_sessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * Filter, which auth_session to fetch.
     */
    where: auth_sessionWhereUniqueInput
  }

  /**
   * auth_session findFirst
   */
  export type auth_sessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * Filter, which auth_session to fetch.
     */
    where?: auth_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionOrderByWithRelationInput | auth_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_sessions.
     */
    cursor?: auth_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_sessions.
     */
    distinct?: Auth_sessionScalarFieldEnum | Auth_sessionScalarFieldEnum[]
  }

  /**
   * auth_session findFirstOrThrow
   */
  export type auth_sessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * Filter, which auth_session to fetch.
     */
    where?: auth_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionOrderByWithRelationInput | auth_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_sessions.
     */
    cursor?: auth_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_sessions.
     */
    distinct?: Auth_sessionScalarFieldEnum | Auth_sessionScalarFieldEnum[]
  }

  /**
   * auth_session findMany
   */
  export type auth_sessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * Filter, which auth_sessions to fetch.
     */
    where?: auth_sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionOrderByWithRelationInput | auth_sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auth_sessions.
     */
    cursor?: auth_sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_sessions.
     */
    distinct?: Auth_sessionScalarFieldEnum | Auth_sessionScalarFieldEnum[]
  }

  /**
   * auth_session create
   */
  export type auth_sessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * The data needed to create a auth_session.
     */
    data: XOR<auth_sessionCreateInput, auth_sessionUncheckedCreateInput>
  }

  /**
   * auth_session createMany
   */
  export type auth_sessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many auth_sessions.
     */
    data: auth_sessionCreateManyInput | auth_sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auth_session createManyAndReturn
   */
  export type auth_sessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * The data used to create many auth_sessions.
     */
    data: auth_sessionCreateManyInput | auth_sessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * auth_session update
   */
  export type auth_sessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * The data needed to update a auth_session.
     */
    data: XOR<auth_sessionUpdateInput, auth_sessionUncheckedUpdateInput>
    /**
     * Choose, which auth_session to update.
     */
    where: auth_sessionWhereUniqueInput
  }

  /**
   * auth_session updateMany
   */
  export type auth_sessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update auth_sessions.
     */
    data: XOR<auth_sessionUpdateManyMutationInput, auth_sessionUncheckedUpdateManyInput>
    /**
     * Filter which auth_sessions to update
     */
    where?: auth_sessionWhereInput
    /**
     * Limit how many auth_sessions to update.
     */
    limit?: number
  }

  /**
   * auth_session updateManyAndReturn
   */
  export type auth_sessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * The data used to update auth_sessions.
     */
    data: XOR<auth_sessionUpdateManyMutationInput, auth_sessionUncheckedUpdateManyInput>
    /**
     * Filter which auth_sessions to update
     */
    where?: auth_sessionWhereInput
    /**
     * Limit how many auth_sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * auth_session upsert
   */
  export type auth_sessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * The filter to search for the auth_session to update in case it exists.
     */
    where: auth_sessionWhereUniqueInput
    /**
     * In case the auth_session found by the `where` argument doesn't exist, create a new auth_session with this data.
     */
    create: XOR<auth_sessionCreateInput, auth_sessionUncheckedCreateInput>
    /**
     * In case the auth_session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<auth_sessionUpdateInput, auth_sessionUncheckedUpdateInput>
  }

  /**
   * auth_session delete
   */
  export type auth_sessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
    /**
     * Filter which auth_session to delete.
     */
    where: auth_sessionWhereUniqueInput
  }

  /**
   * auth_session deleteMany
   */
  export type auth_sessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_sessions to delete
     */
    where?: auth_sessionWhereInput
    /**
     * Limit how many auth_sessions to delete.
     */
    limit?: number
  }

  /**
   * auth_session without action
   */
  export type auth_sessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_session
     */
    select?: auth_sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_session
     */
    omit?: auth_sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    deleted_at: 'deleted_at',
    edited_at: 'edited_at',
    created_at: 'created_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const Verification_codesScalarFieldEnum: {
    id: 'id',
    email: 'email',
    code: 'code',
    expiry_at: 'expiry_at',
    created_at: 'created_at',
    type: 'type'
  };

  export type Verification_codesScalarFieldEnum = (typeof Verification_codesScalarFieldEnum)[keyof typeof Verification_codesScalarFieldEnum]


  export const Auth_sessionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    refresh_token_hash: 'refresh_token_hash',
    last_seen_at: 'last_seen_at',
    created_at: 'created_at',
    browser: 'browser',
    os: 'os',
    device: 'device',
    cpu: 'cpu',
    ip: 'ip'
  };

  export type Auth_sessionScalarFieldEnum = (typeof Auth_sessionScalarFieldEnum)[keyof typeof Auth_sessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'verification_code_type'
   */
  export type Enumverification_code_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'verification_code_type'>
    


  /**
   * Reference to a field of type 'verification_code_type[]'
   */
  export type ListEnumverification_code_typeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'verification_code_type[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: UuidFilter<"users"> | string
    email?: StringFilter<"users"> | string
    username?: StringNullableFilter<"users"> | string | null
    password?: StringNullableFilter<"users"> | string | null
    deleted_at?: DateTimeNullableFilter<"users"> | Date | string | null
    edited_at?: DateTimeNullableFilter<"users"> | Date | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    auth_session?: Auth_sessionListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    edited_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    auth_session?: auth_sessionOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringNullableFilter<"users"> | string | null
    deleted_at?: DateTimeNullableFilter<"users"> | Date | string | null
    edited_at?: DateTimeNullableFilter<"users"> | Date | string | null
    created_at?: DateTimeFilter<"users"> | Date | string
    auth_session?: Auth_sessionListRelationFilter
  }, "id" | "email" | "username">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    edited_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    username?: StringNullableWithAggregatesFilter<"users"> | string | null
    password?: StringNullableWithAggregatesFilter<"users"> | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    edited_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type verification_codesWhereInput = {
    AND?: verification_codesWhereInput | verification_codesWhereInput[]
    OR?: verification_codesWhereInput[]
    NOT?: verification_codesWhereInput | verification_codesWhereInput[]
    id?: UuidFilter<"verification_codes"> | string
    email?: StringFilter<"verification_codes"> | string
    code?: StringFilter<"verification_codes"> | string
    expiry_at?: DateTimeFilter<"verification_codes"> | Date | string
    created_at?: DateTimeFilter<"verification_codes"> | Date | string
    type?: Enumverification_code_typeFilter<"verification_codes"> | $Enums.verification_code_type
  }

  export type verification_codesOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiry_at?: SortOrder
    created_at?: SortOrder
    type?: SortOrder
  }

  export type verification_codesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: verification_codesWhereInput | verification_codesWhereInput[]
    OR?: verification_codesWhereInput[]
    NOT?: verification_codesWhereInput | verification_codesWhereInput[]
    email?: StringFilter<"verification_codes"> | string
    code?: StringFilter<"verification_codes"> | string
    expiry_at?: DateTimeFilter<"verification_codes"> | Date | string
    created_at?: DateTimeFilter<"verification_codes"> | Date | string
    type?: Enumverification_code_typeFilter<"verification_codes"> | $Enums.verification_code_type
  }, "id">

  export type verification_codesOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiry_at?: SortOrder
    created_at?: SortOrder
    type?: SortOrder
    _count?: verification_codesCountOrderByAggregateInput
    _max?: verification_codesMaxOrderByAggregateInput
    _min?: verification_codesMinOrderByAggregateInput
  }

  export type verification_codesScalarWhereWithAggregatesInput = {
    AND?: verification_codesScalarWhereWithAggregatesInput | verification_codesScalarWhereWithAggregatesInput[]
    OR?: verification_codesScalarWhereWithAggregatesInput[]
    NOT?: verification_codesScalarWhereWithAggregatesInput | verification_codesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"verification_codes"> | string
    email?: StringWithAggregatesFilter<"verification_codes"> | string
    code?: StringWithAggregatesFilter<"verification_codes"> | string
    expiry_at?: DateTimeWithAggregatesFilter<"verification_codes"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"verification_codes"> | Date | string
    type?: Enumverification_code_typeWithAggregatesFilter<"verification_codes"> | $Enums.verification_code_type
  }

  export type auth_sessionWhereInput = {
    AND?: auth_sessionWhereInput | auth_sessionWhereInput[]
    OR?: auth_sessionWhereInput[]
    NOT?: auth_sessionWhereInput | auth_sessionWhereInput[]
    id?: UuidFilter<"auth_session"> | string
    user_id?: UuidFilter<"auth_session"> | string
    refresh_token_hash?: StringFilter<"auth_session"> | string
    last_seen_at?: DateTimeNullableFilter<"auth_session"> | Date | string | null
    created_at?: DateTimeFilter<"auth_session"> | Date | string
    browser?: JsonNullableFilter<"auth_session">
    os?: JsonNullableFilter<"auth_session">
    device?: JsonNullableFilter<"auth_session">
    cpu?: JsonNullableFilter<"auth_session">
    ip?: StringNullableFilter<"auth_session"> | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type auth_sessionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    refresh_token_hash?: SortOrder
    last_seen_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    browser?: SortOrderInput | SortOrder
    os?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    cpu?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    users?: usersOrderByWithRelationInput
  }

  export type auth_sessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: auth_sessionWhereInput | auth_sessionWhereInput[]
    OR?: auth_sessionWhereInput[]
    NOT?: auth_sessionWhereInput | auth_sessionWhereInput[]
    user_id?: UuidFilter<"auth_session"> | string
    refresh_token_hash?: StringFilter<"auth_session"> | string
    last_seen_at?: DateTimeNullableFilter<"auth_session"> | Date | string | null
    created_at?: DateTimeFilter<"auth_session"> | Date | string
    browser?: JsonNullableFilter<"auth_session">
    os?: JsonNullableFilter<"auth_session">
    device?: JsonNullableFilter<"auth_session">
    cpu?: JsonNullableFilter<"auth_session">
    ip?: StringNullableFilter<"auth_session"> | string | null
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type auth_sessionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    refresh_token_hash?: SortOrder
    last_seen_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    browser?: SortOrderInput | SortOrder
    os?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    cpu?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    _count?: auth_sessionCountOrderByAggregateInput
    _max?: auth_sessionMaxOrderByAggregateInput
    _min?: auth_sessionMinOrderByAggregateInput
  }

  export type auth_sessionScalarWhereWithAggregatesInput = {
    AND?: auth_sessionScalarWhereWithAggregatesInput | auth_sessionScalarWhereWithAggregatesInput[]
    OR?: auth_sessionScalarWhereWithAggregatesInput[]
    NOT?: auth_sessionScalarWhereWithAggregatesInput | auth_sessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"auth_session"> | string
    user_id?: UuidWithAggregatesFilter<"auth_session"> | string
    refresh_token_hash?: StringWithAggregatesFilter<"auth_session"> | string
    last_seen_at?: DateTimeNullableWithAggregatesFilter<"auth_session"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"auth_session"> | Date | string
    browser?: JsonNullableWithAggregatesFilter<"auth_session">
    os?: JsonNullableWithAggregatesFilter<"auth_session">
    device?: JsonNullableWithAggregatesFilter<"auth_session">
    cpu?: JsonNullableWithAggregatesFilter<"auth_session">
    ip?: StringNullableWithAggregatesFilter<"auth_session"> | string | null
  }

  export type usersCreateInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    deleted_at?: Date | string | null
    edited_at?: Date | string | null
    created_at?: Date | string
    auth_session?: auth_sessionCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    deleted_at?: Date | string | null
    edited_at?: Date | string | null
    created_at?: Date | string
    auth_session?: auth_sessionUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edited_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_session?: auth_sessionUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edited_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    auth_session?: auth_sessionUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    deleted_at?: Date | string | null
    edited_at?: Date | string | null
    created_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edited_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edited_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verification_codesCreateInput = {
    id?: string
    email: string
    code: string
    expiry_at: Date | string
    created_at?: Date | string
    type: $Enums.verification_code_type
  }

  export type verification_codesUncheckedCreateInput = {
    id?: string
    email: string
    code: string
    expiry_at: Date | string
    created_at?: Date | string
    type: $Enums.verification_code_type
  }

  export type verification_codesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiry_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: Enumverification_code_typeFieldUpdateOperationsInput | $Enums.verification_code_type
  }

  export type verification_codesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiry_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: Enumverification_code_typeFieldUpdateOperationsInput | $Enums.verification_code_type
  }

  export type verification_codesCreateManyInput = {
    id?: string
    email: string
    code: string
    expiry_at: Date | string
    created_at?: Date | string
    type: $Enums.verification_code_type
  }

  export type verification_codesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiry_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: Enumverification_code_typeFieldUpdateOperationsInput | $Enums.verification_code_type
  }

  export type verification_codesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    expiry_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: Enumverification_code_typeFieldUpdateOperationsInput | $Enums.verification_code_type
  }

  export type auth_sessionCreateInput = {
    id?: string
    refresh_token_hash: string
    last_seen_at?: Date | string | null
    created_at?: Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    users: usersCreateNestedOneWithoutAuth_sessionInput
  }

  export type auth_sessionUncheckedCreateInput = {
    id?: string
    user_id: string
    refresh_token_hash: string
    last_seen_at?: Date | string | null
    created_at?: Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
  }

  export type auth_sessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutAuth_sessionNestedInput
  }

  export type auth_sessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type auth_sessionCreateManyInput = {
    id?: string
    user_id: string
    refresh_token_hash: string
    last_seen_at?: Date | string | null
    created_at?: Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
  }

  export type auth_sessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type auth_sessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Auth_sessionListRelationFilter = {
    every?: auth_sessionWhereInput
    some?: auth_sessionWhereInput
    none?: auth_sessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type auth_sessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    deleted_at?: SortOrder
    edited_at?: SortOrder
    created_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    deleted_at?: SortOrder
    edited_at?: SortOrder
    created_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    deleted_at?: SortOrder
    edited_at?: SortOrder
    created_at?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Enumverification_code_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.verification_code_type | Enumverification_code_typeFieldRefInput<$PrismaModel>
    in?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumverification_code_typeFilter<$PrismaModel> | $Enums.verification_code_type
  }

  export type verification_codesCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiry_at?: SortOrder
    created_at?: SortOrder
    type?: SortOrder
  }

  export type verification_codesMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiry_at?: SortOrder
    created_at?: SortOrder
    type?: SortOrder
  }

  export type verification_codesMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    code?: SortOrder
    expiry_at?: SortOrder
    created_at?: SortOrder
    type?: SortOrder
  }

  export type Enumverification_code_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.verification_code_type | Enumverification_code_typeFieldRefInput<$PrismaModel>
    in?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumverification_code_typeWithAggregatesFilter<$PrismaModel> | $Enums.verification_code_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumverification_code_typeFilter<$PrismaModel>
    _max?: NestedEnumverification_code_typeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type auth_sessionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    refresh_token_hash?: SortOrder
    last_seen_at?: SortOrder
    created_at?: SortOrder
    browser?: SortOrder
    os?: SortOrder
    device?: SortOrder
    cpu?: SortOrder
    ip?: SortOrder
  }

  export type auth_sessionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    refresh_token_hash?: SortOrder
    last_seen_at?: SortOrder
    created_at?: SortOrder
    ip?: SortOrder
  }

  export type auth_sessionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    refresh_token_hash?: SortOrder
    last_seen_at?: SortOrder
    created_at?: SortOrder
    ip?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type auth_sessionCreateNestedManyWithoutUsersInput = {
    create?: XOR<auth_sessionCreateWithoutUsersInput, auth_sessionUncheckedCreateWithoutUsersInput> | auth_sessionCreateWithoutUsersInput[] | auth_sessionUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: auth_sessionCreateOrConnectWithoutUsersInput | auth_sessionCreateOrConnectWithoutUsersInput[]
    createMany?: auth_sessionCreateManyUsersInputEnvelope
    connect?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
  }

  export type auth_sessionUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<auth_sessionCreateWithoutUsersInput, auth_sessionUncheckedCreateWithoutUsersInput> | auth_sessionCreateWithoutUsersInput[] | auth_sessionUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: auth_sessionCreateOrConnectWithoutUsersInput | auth_sessionCreateOrConnectWithoutUsersInput[]
    createMany?: auth_sessionCreateManyUsersInputEnvelope
    connect?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type auth_sessionUpdateManyWithoutUsersNestedInput = {
    create?: XOR<auth_sessionCreateWithoutUsersInput, auth_sessionUncheckedCreateWithoutUsersInput> | auth_sessionCreateWithoutUsersInput[] | auth_sessionUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: auth_sessionCreateOrConnectWithoutUsersInput | auth_sessionCreateOrConnectWithoutUsersInput[]
    upsert?: auth_sessionUpsertWithWhereUniqueWithoutUsersInput | auth_sessionUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: auth_sessionCreateManyUsersInputEnvelope
    set?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    disconnect?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    delete?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    connect?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    update?: auth_sessionUpdateWithWhereUniqueWithoutUsersInput | auth_sessionUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: auth_sessionUpdateManyWithWhereWithoutUsersInput | auth_sessionUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: auth_sessionScalarWhereInput | auth_sessionScalarWhereInput[]
  }

  export type auth_sessionUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<auth_sessionCreateWithoutUsersInput, auth_sessionUncheckedCreateWithoutUsersInput> | auth_sessionCreateWithoutUsersInput[] | auth_sessionUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: auth_sessionCreateOrConnectWithoutUsersInput | auth_sessionCreateOrConnectWithoutUsersInput[]
    upsert?: auth_sessionUpsertWithWhereUniqueWithoutUsersInput | auth_sessionUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: auth_sessionCreateManyUsersInputEnvelope
    set?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    disconnect?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    delete?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    connect?: auth_sessionWhereUniqueInput | auth_sessionWhereUniqueInput[]
    update?: auth_sessionUpdateWithWhereUniqueWithoutUsersInput | auth_sessionUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: auth_sessionUpdateManyWithWhereWithoutUsersInput | auth_sessionUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: auth_sessionScalarWhereInput | auth_sessionScalarWhereInput[]
  }

  export type Enumverification_code_typeFieldUpdateOperationsInput = {
    set?: $Enums.verification_code_type
  }

  export type usersCreateNestedOneWithoutAuth_sessionInput = {
    create?: XOR<usersCreateWithoutAuth_sessionInput, usersUncheckedCreateWithoutAuth_sessionInput>
    connectOrCreate?: usersCreateOrConnectWithoutAuth_sessionInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutAuth_sessionNestedInput = {
    create?: XOR<usersCreateWithoutAuth_sessionInput, usersUncheckedCreateWithoutAuth_sessionInput>
    connectOrCreate?: usersCreateOrConnectWithoutAuth_sessionInput
    upsert?: usersUpsertWithoutAuth_sessionInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutAuth_sessionInput, usersUpdateWithoutAuth_sessionInput>, usersUncheckedUpdateWithoutAuth_sessionInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumverification_code_typeFilter<$PrismaModel = never> = {
    equals?: $Enums.verification_code_type | Enumverification_code_typeFieldRefInput<$PrismaModel>
    in?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumverification_code_typeFilter<$PrismaModel> | $Enums.verification_code_type
  }

  export type NestedEnumverification_code_typeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.verification_code_type | Enumverification_code_typeFieldRefInput<$PrismaModel>
    in?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    notIn?: $Enums.verification_code_type[] | ListEnumverification_code_typeFieldRefInput<$PrismaModel>
    not?: NestedEnumverification_code_typeWithAggregatesFilter<$PrismaModel> | $Enums.verification_code_type
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumverification_code_typeFilter<$PrismaModel>
    _max?: NestedEnumverification_code_typeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type auth_sessionCreateWithoutUsersInput = {
    id?: string
    refresh_token_hash: string
    last_seen_at?: Date | string | null
    created_at?: Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
  }

  export type auth_sessionUncheckedCreateWithoutUsersInput = {
    id?: string
    refresh_token_hash: string
    last_seen_at?: Date | string | null
    created_at?: Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
  }

  export type auth_sessionCreateOrConnectWithoutUsersInput = {
    where: auth_sessionWhereUniqueInput
    create: XOR<auth_sessionCreateWithoutUsersInput, auth_sessionUncheckedCreateWithoutUsersInput>
  }

  export type auth_sessionCreateManyUsersInputEnvelope = {
    data: auth_sessionCreateManyUsersInput | auth_sessionCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type auth_sessionUpsertWithWhereUniqueWithoutUsersInput = {
    where: auth_sessionWhereUniqueInput
    update: XOR<auth_sessionUpdateWithoutUsersInput, auth_sessionUncheckedUpdateWithoutUsersInput>
    create: XOR<auth_sessionCreateWithoutUsersInput, auth_sessionUncheckedCreateWithoutUsersInput>
  }

  export type auth_sessionUpdateWithWhereUniqueWithoutUsersInput = {
    where: auth_sessionWhereUniqueInput
    data: XOR<auth_sessionUpdateWithoutUsersInput, auth_sessionUncheckedUpdateWithoutUsersInput>
  }

  export type auth_sessionUpdateManyWithWhereWithoutUsersInput = {
    where: auth_sessionScalarWhereInput
    data: XOR<auth_sessionUpdateManyMutationInput, auth_sessionUncheckedUpdateManyWithoutUsersInput>
  }

  export type auth_sessionScalarWhereInput = {
    AND?: auth_sessionScalarWhereInput | auth_sessionScalarWhereInput[]
    OR?: auth_sessionScalarWhereInput[]
    NOT?: auth_sessionScalarWhereInput | auth_sessionScalarWhereInput[]
    id?: UuidFilter<"auth_session"> | string
    user_id?: UuidFilter<"auth_session"> | string
    refresh_token_hash?: StringFilter<"auth_session"> | string
    last_seen_at?: DateTimeNullableFilter<"auth_session"> | Date | string | null
    created_at?: DateTimeFilter<"auth_session"> | Date | string
    browser?: JsonNullableFilter<"auth_session">
    os?: JsonNullableFilter<"auth_session">
    device?: JsonNullableFilter<"auth_session">
    cpu?: JsonNullableFilter<"auth_session">
    ip?: StringNullableFilter<"auth_session"> | string | null
  }

  export type usersCreateWithoutAuth_sessionInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    deleted_at?: Date | string | null
    edited_at?: Date | string | null
    created_at?: Date | string
  }

  export type usersUncheckedCreateWithoutAuth_sessionInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    deleted_at?: Date | string | null
    edited_at?: Date | string | null
    created_at?: Date | string
  }

  export type usersCreateOrConnectWithoutAuth_sessionInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutAuth_sessionInput, usersUncheckedCreateWithoutAuth_sessionInput>
  }

  export type usersUpsertWithoutAuth_sessionInput = {
    update: XOR<usersUpdateWithoutAuth_sessionInput, usersUncheckedUpdateWithoutAuth_sessionInput>
    create: XOR<usersCreateWithoutAuth_sessionInput, usersUncheckedCreateWithoutAuth_sessionInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutAuth_sessionInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutAuth_sessionInput, usersUncheckedUpdateWithoutAuth_sessionInput>
  }

  export type usersUpdateWithoutAuth_sessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edited_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateWithoutAuth_sessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    edited_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_sessionCreateManyUsersInput = {
    id?: string
    refresh_token_hash: string
    last_seen_at?: Date | string | null
    created_at?: Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
  }

  export type auth_sessionUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type auth_sessionUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type auth_sessionUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    refresh_token_hash?: StringFieldUpdateOperationsInput | string
    last_seen_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    browser?: NullableJsonNullValueInput | InputJsonValue
    os?: NullableJsonNullValueInput | InputJsonValue
    device?: NullableJsonNullValueInput | InputJsonValue
    cpu?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}