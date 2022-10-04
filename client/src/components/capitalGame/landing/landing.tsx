import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {GET_FLAGS, GET_RANKED_PLAYER_CAPITALS } from "../../../redux/action"
import { AppDispatch, RootState } from "../../../redux/store"
import { Flag } from "../../../types/flags"
import { StyleCss } from "../../../types/states"
import { UserResponse } from "../../../types/users"
import style from "../../gamePage/game.module.css"
import ReadyToPlay from "../../gamePage/readyToPlay/readyToPlay"
import ContinuePlaying from "../../materialComponents/dialogs/dialogContinuePlaying"
import NewRecord from "../../materialComponents/dialogs/newRecord"
import Nav from "../../navbar/navbar"
import PlayCapital from "../playCapitals/playCapital"

export default function CapitalLanding():JSX.Element{
    const allFlags = useSelector<RootState, Flag[]>((state) => state.clientReducer.flags)
    const rankedPlayer = useSelector<RootState, UserResponse>((state) => state.clientReducer.pointsRankedPlayer)
    const dispatch = useDispatch<AppDispatch>()
    const [readyToPlay, setReadyToPlay] = useState(false)
    let [lives, setLives] = useState(3)
    let [points, setPoints] = useState(0)
    const [counter, setCounter] = useState(10)
    const [counterOn, setCounterOn] = useState(true)
    const [flagStyle, setFlagStyle] = useState<StyleCss>({ status: "", onChange: false })
    const [randomCountry, setRandomCountry] = useState({
        correctCountry: 0,
        countryOne: 0,
        countryTwo: 0,
        countryThree: 0,
        countryFour: 0
    })

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let text:any = e.target 
        // let capitalNumber:string = text.attributes.data
        console.log(e.target)
        console.log("texto: ",text.dataset.info)

        if (counterOn) {
            setCounterOn(false)
            if (Number(text.dataset.info) == randomCountry.correctCountry) {
                setPoints(++points)
                setFlagStyle({ status: true, onChange: true })
            }
            else {
                setLives(--lives)
                setFlagStyle({ status: false, onChange: true })
            }
            if (lives > 0) {
                setTimeout(() => {
                    getRandomInt()
                }, 2000)
            }
        }
    }

    function getRandomInt(): any {
        setCounterOn(true)
        setFlagStyle({ status: "", onChange: false })
        let uno = Math.floor(Math.random() * 244);
        let dos = Math.floor(Math.random() * 244);
        let tres = Math.floor(Math.random() * 244);
        let cuatro = Math.floor(Math.random() * 244);

        if (uno === dos || uno === tres || uno === cuatro || dos === tres || dos === cuatro || tres === cuatro) {
            getRandomInt()
        } else {

            let arr: number[] = [uno, dos, tres, cuatro]
            let correct = arr[Math.floor(Math.random() * 4)];

            setRandomCountry({
                correctCountry: correct,
                countryOne: uno,
                countryTwo: dos,
                countryThree: tres,
                countryFour: cuatro
            })
        }
    }


    useEffect(() => {
        getRandomInt()
        dispatch(GET_FLAGS())
        dispatch(GET_RANKED_PLAYER_CAPITALS())
    }, [])

    useEffect(() => {
        if (lives > 0) setCounter(10)
    }, [randomCountry])


    useEffect(() => {
        if (counter === 0 && lives > 0) {
            setCounterOn(false)
            setLives(--lives)
            setFlagStyle({ status: false, onChange: true })
            setTimeout(() => {
                getRandomInt()
            }, 2000)
        }
        if (readyToPlay && counterOn) {
            const timer: any =
                counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [counter, readyToPlay, points])
    return(
        <div className={style.contenedor}>
        <Nav />
        <div className={style.contenedorSeg}>
            {!readyToPlay && <div className={style.title}>Capitals</div>}
            {(lives === 0 && rankedPlayer.ok && points > rankedPlayer.points) && <NewRecord components="capitals" getRandomInt={getRandomInt} points={points} setLives={setLives} setPoints={setPoints} />}
            {(lives === 0 && rankedPlayer.ok && points <= rankedPlayer.points) && <ContinuePlaying getRandomInt={getRandomInt} points={points} setLives={setLives} setPoints={setPoints} counter={setCounter} />}
            <div className={style.gameInfo}>Lives : <span className={style.gameInfo__count}>{lives}</span></div>
            <div className={style.gameInfo}>Points : <span className={style.gameInfo__count}>{points}</span></div>
            <div className={style.gameInfo}>Time : <span className={style.gameInfo__countTimer}>{counter}</span></div>
            {readyToPlay ? <PlayCapital handleClick={handleClick} style={style} allFlags={allFlags} randomCountry={randomCountry} flagStyle={flagStyle} /> : <ReadyToPlay setReadyToPlay={setReadyToPlay} />}
        </div>
    </div>
    )
}

