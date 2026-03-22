import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.state";
import { loadUserFailedAction, loadUserStartAction, loadUserSuccessAction } from "./user.actions";

export const userReducer = createReducer(
    initialState,
    on(loadUserStartAction,(state,action) => {
        return {
            ...state,
            loading:true,
            error:null,
        }
    }),
    on(loadUserSuccessAction,(state,action) => {
        return {
            ...state,
            user:action.user,
            loading:false,
            error:null
        }
    }),
    on(loadUserFailedAction,(state,action) => {
        return {
            ...state,
            loading:false,
            error:action.error
        }
    })
)