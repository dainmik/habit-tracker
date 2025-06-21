/**
 * A type helper to conditionally convert a possibly undefined type `T` into a parameter tuple.
 *
 *  If `T` is `undefined`, it returns an empty tuple `[]` (i.e., no parameters).
 * Otherwise, it returns a single-element tuple `[value: T]`, which can be used as variadic arguments.
 *
 * Example:
 * ```ts
 * type A = OptionalParamTuple;                     // []
 * type B = OptionalParamTuple<undefined>;          // []
 * type C = OptionalParamTuple<string>;             // [value: string]
 * type D = OptionalParamTuple<string | undefined>; // [value: string | undefined]
 * ```
```
 */
type ParamIfDefined<T> = [T] extends [undefined] ? [] : [value: T];
// ℹ️ NOTE: Using tuple form `[T] extends [undefined]` instead of `T extends undefined` is a TypeScript trick to prevent distribution over union types (when provided `T` value is a union type).
// The tuple `[T]` ensures the entire type is checked as a whole.
//
// Example:
// ```ts
// type Test<T> = T extends undefined ? 'yes' : 'no';
// type A = Test<undefined | string>; // "yes" | "no" ❌
//
// type Test<T> = [T] extends [undefined] ? 'yes' : 'no';
// type A = Test<undefined | string>; // "no" ✅
// ```

/**
 * A general-purpose mapper between two types with optional context parameters.
 *
 * @template From - The input type to be mapped.
 * @template To - The output type after mapping.
 * @template ToParams - Optional extra parameters for mapping `From` to `To`.
 * @template FromParams - Optional extra parameters for mapping `To` back to `From`.
 */
export interface Mapper<
	From,
	To,
	ToParams = undefined,
	FromParams = undefined,
> {
	to(from: From, ...params: ParamIfDefined<ToParams>): To;

	from(to: To, ...params: ParamIfDefined<FromParams>): From;
}
