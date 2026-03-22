import { UserRespone } from "../../../models/user.model";

export interface UserState{
    user:UserRespone | null;
    loading:boolean;
    error:string|null;
}

export const initialState:UserState = {
    user:null,
    loading:false,
    error:null
}