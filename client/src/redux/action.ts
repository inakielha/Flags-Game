import axios from "axios"
import { createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { UserRecord, UserResponse } from "../types/users";


export const GET_FLAGS = createAsyncThunk(
    "GET_FLAGS", async () => {
        try {
            const response = await axios.get("http://localhost:4000/flags/");
            if (response.data.ok) return response.data.msg
        } catch (e) {
            return e
        }
    }
)
export const GET_RANKED_PLAYER = createAsyncThunk(
    "GET_RANKED_PLAYER", async () => {
        try {
            const response = await axios.get<UserResponse>("http://localhost:4000/users/")
            if (response.data.ok) return response.data
        } catch (e) {
            return e
        }
    }
)
export const GET_RANKED_PLAYER_CAPITALS = createAsyncThunk(
    "GET_RANKED_PLAYER_CAPITALS", async () => {
        try {
            const response = await axios.get<UserResponse>("http://localhost:4000/userCapital/")
            if (response.data.ok) return response.data
        } catch (e) {
            return e
        }
    }
)
export const CREATE_RANKED_PLAYER = createAsyncThunk(
    "CREATE_RANKED_PLAYER", async (record: UserRecord) => {
        try {
            if (record.component === "flags") {
                const response = await axios.post("http://localhost:4000/users/", record)
                return response.data
            } else {
                const response = await axios.post("http://localhost:4000/userCapital/", record)
                return response.data
            }
        } catch (e) {
            return e
        }
    }
)
export const GET_TOP_TEN_RANKED_PLAYERS = createAsyncThunk(
    "CREATE_TOP_TEN_RANKED_PLAYERS", async (component:string) => {
        try {
            if (component === "flags") {
                let response = await axios.get("http://localhost:4000/users/bestPlayers")
                if (response.data.ok) return response.data.msg
            } else if (component === "capitals"){
                let response = await axios.get("http://localhost:4000/userCapital/bestPlayers")
                if (response.data.ok) return response.data.msg
            }
        } catch (e) {
            return e
        }
    }
)