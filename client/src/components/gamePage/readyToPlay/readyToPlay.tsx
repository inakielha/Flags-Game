import  style  from "./ready.module.css"

export default function ReadyToPlay({setReadyToPlay}:any){
    return (
        <div>
            <button className={style.btn} onClick={()=>setReadyToPlay(true)}>
                Start Game
            </button>
        </div>
    )
}