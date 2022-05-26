import { AnyAction } from "redux";

type Match<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

//asta inlocuieste arrow function de mai jos
//export const createAction = (type, payload) => ({ type, payload });
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
