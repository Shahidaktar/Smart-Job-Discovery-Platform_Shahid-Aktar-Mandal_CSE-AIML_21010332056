import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { ResumeReducerInitialState } from "../../types/reducer-types";

const initialState:ResumeReducerInitialState={
    singleresume:null,
    loading:true
}

export const resumeReducer=createSlice({
    name:"resumeReducer",
    initialState,
    reducers:{
        resumeExist:(state,action:PayloadAction<any>)=>{
            state.loading=false
            state.singleresume=action.payload
        },
        resumwNotExist:(state)=>{
            state.loading=false
            state.singleresume=null
        }
    }
})

export const {resumeExist,resumwNotExist}=resumeReducer.actions