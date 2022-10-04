import { createReducer, PayloadAction } from "@reduxjs/toolkit"
import { type } from "os"
import { CREATE_RANKED_PLAYER, GET_FLAGS, GET_RANKED_PLAYER, GET_RANKED_PLAYER_CAPITALS, GET_TOP_TEN_RANKED_PLAYERS } from "./action"
import {Flag} from ".././types/flags"
import { NewRankedPlayer, UserRecord, UserResponse } from "../types/users"
import { stat } from "fs"

interface Reducer  {
flags: Array<Flag>,
pointsRankedPlayer: UserResponse,
newRankedPlayerResponse: NewRankedPlayer,
topTenRankedPlayers: UserRecord[]
}

const initialState:Reducer = {
    flags:[],
    pointsRankedPlayer:{ok:false,points:0},
    newRankedPlayerResponse: {ok: false,msg:""},
    topTenRankedPlayers: []
}

export const clientReducer = createReducer(initialState,(builder)=>{
    builder.addCase(GET_FLAGS.fulfilled,(state, action)=>{
        state.flags = action.payload
    })
    builder.addCase(GET_RANKED_PLAYER.fulfilled,(state,action:any)=>{
        state.pointsRankedPlayer = action.payload 
    })
    builder.addCase(CREATE_RANKED_PLAYER.fulfilled,(state,action)=>{
        state.newRankedPlayerResponse = action.payload
    })
    builder.addCase(GET_TOP_TEN_RANKED_PLAYERS.fulfilled,(state,action)=>{
        state.topTenRankedPlayers = action.payload
    })
    builder.addCase(GET_RANKED_PLAYER_CAPITALS.fulfilled,(state,action:any)=>{
        state.pointsRankedPlayer = action.payload
    })
})

