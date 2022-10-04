import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/store"
import {GET_TOP_TEN_RANKED_PLAYERS} from "../../../redux/action"
import { useSelector } from "react-redux"
import { UserRecord } from "../../../types/users"
import style from "../../bestPlayers/bestPlayer.module.css"
import Nav from "../../navbar/navbar"

export default function BestCapitalPlayers():JSX.Element{
    const dispatch = useDispatch<AppDispatch>()
    const bestPlayers = useSelector<RootState,UserRecord[]>((state)=> state.clientReducer.topTenRankedPlayers)

    function test(index:number){
        if (index + 1 < 4) return style.primeros
        else if (index + 1 < 7) return style.segundos
        else if (index + 1 < 10) return style.terceros
        else return style.mediocres
    }
    useEffect(()=>{
    dispatch(GET_TOP_TEN_RANKED_PLAYERS("capitals"))
    },[])
    return (
        <div className={style.container}>
            <Nav/>
            <div className={style.topPlayerContainer}>

            <h2 className={style.h2}>Best Top <span className={style.span}>10</span>Capital Players</h2>
            {bestPlayers.length && <ul className={style.ul}>
                { bestPlayers.map((player:UserRecord,index)=>{
                    return(
                        <li className={style.li}>
                            <div className={style.playerContainer}>
                                {/* <p className={style.numberPosition}>{`${index})`}</p> */}
                                <h4 className={style.name}>{player.nickName}</h4>
                                <span className={test(index)}>{`${player.points} Points`}</span>
                            </div>
                            </li>
                    )
                })}
            </ul>}
            
                </div>
        </div>
    )
}