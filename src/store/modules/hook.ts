import { useSelector,TypedUseSelectorHook } from "react-redux";
import { RootState } from "..";


export const userAppSelector:TypedUseSelectorHook<RootState> = useSelector