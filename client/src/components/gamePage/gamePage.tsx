
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { GET_FLAGS, GET_RANKED_PLAYER } from "../../redux/action"
import { AppDispatch, RootState } from "../../redux/store"
import { Flag } from "../../types/flags"
import { StyleCss } from "../../types/states"
import { UserResponse } from "../../types/users"
import ContinuePlaying from "../materialComponents/dialogs/dialogContinuePlaying"
import NewRecord from "../materialComponents/dialogs/newRecord"
import Nav from "../navbar/navbar"
import style from "./game.module.css"
import Play from "./play/play"
import ReadyToPlay from "./readyToPlay/readyToPlay"

export default function GamePage() {

    const allFlags = useSelector<RootState, Flag[]>((state) => state.clientReducer.flags)
    const rankedPlayer = useSelector<RootState, UserResponse>((state) => state.clientReducer.pointsRankedPlayer)
    const dispatch = useDispatch<AppDispatch>()
    let [points, setPoints] = useState(0)
    let [lives, setLives] = useState(3)
    const [readyToPlay, setReadyToPlay] = useState(false)
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

    useEffect(() => {
        getRandomInt()
        dispatch(GET_FLAGS())
        dispatch(GET_RANKED_PLAYER())
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

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const image = e.target as HTMLImageElement
        if (counterOn) {
            setCounterOn(false)
            if (Number(image.alt) == randomCountry.correctCountry) {
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

    return (
        <div className={style.contenedor}>
            <Nav />
            <div className={style.contenedorSeg}>
                {!readyToPlay && <div className={style.title}>Welcome</div>}
                {(lives === 0 && rankedPlayer.ok && points > rankedPlayer.points) && <NewRecord components="flags" getRandomInt={getRandomInt} points={points} setLives={setLives} setPoints={setPoints} />}
                {(lives === 0 && rankedPlayer.ok && points <= rankedPlayer.points) && <ContinuePlaying getRandomInt={getRandomInt} points={points} setLives={setLives} setPoints={setPoints} counter={setCounter} />}
                <div className={style.gameInfo}>Lives : <span className={style.gameInfo__count}>{lives}</span></div>
                <div className={style.gameInfo}>Points : <span className={style.gameInfo__count}>{points}</span></div>
                <div className={style.gameInfo}>Time : <span className={style.gameInfo__countTimer}>{counter}</span></div>
                {readyToPlay ? <Play handleClick={handleClick} style={style} allFlags={allFlags} randomCountry={randomCountry} flagStyle={flagStyle} /> : <ReadyToPlay setReadyToPlay={setReadyToPlay} />}
            </div>
        </div>
    )
}