export interface UserResponse {
    ok:boolean,
    points:number
}
export interface NewRankedPlayer {
    ok: boolean,
    msg: string 
}
export interface UserRecord {
    nickName: string,
    points: number | "",
    component: "flags"|"capitals"
}
