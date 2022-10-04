import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { GET_FLAGS } from "../redux/action"
import { AppDispatch, RootState } from "../redux/store"
import { Flag } from "../types/flags"

export default function Test(){
    const allFlags = useSelector<RootState, Flag[]>((state) => state.clientReducer.flags)
    const dispatch = useDispatch<AppDispatch>()
    
    useEffect(()=>{
        dispatch(GET_FLAGS())
    },[])
    return(
        <div>
            <div>{allFlags.length}</div>
            {allFlags[0]?.image &&
            allFlags.map((el)=>{
                return(
                    <>
                <div>
                    <div><img src={el.image} alt={el.name} /></div>
                    <div>{el.name}</div>
                </div>
                </>
                    )
            })
            }
            
        </div>
    )
}