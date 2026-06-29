import { RootState } from "@/shared/model/redux.types";

export const getTypedState = (state: unknown) => state as RootState;
