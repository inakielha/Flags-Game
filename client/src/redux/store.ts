
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Flag } from "../types/flags";
import { clientReducer } from "./reducer";

export interface appStore {
    flags: Flag[]
}

export const store = configureStore({
    reducer:{
        clientReducer
    },
    devTools: true,
    middleware: getDefaultMiddleware({
        serializableCheck:false
    })
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch