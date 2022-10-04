export default function Play({ handleClick, style, allFlags, randomCountry, flagStyle, styles }: any) {
    let classCss = {
        one: "flag",
        two: "flag",
        three: "flag",
        four: "flag"
    }

    if (flagStyle.onChange) {
        if (randomCountry.countryOne === randomCountry.correctCountry) {
            classCss = {
                one: "flagCorrect",
                two: "flag",
                three: "flag",
                four: "flag"
            }
            if (!flagStyle.status){
                classCss = {
                    one: "flagCorrect",
                    two: "flagIncorrect",
                    three: "flagIncorrect",
                    four: "flagIncorrect"
                }
            }
        }
        if (randomCountry.countryTwo === randomCountry.correctCountry) {
            classCss = {
                one: "flag",
                two: "flagCorrect",
                three: "flag",
                four: "flag"
            }
            if (!flagStyle.status){
                classCss = {
                    one: "flagIncorrect",
                    two: "flagCorrect",
                    three: "flagIncorrect",
                    four: "flagIncorrect"
                }
            }

        } if (randomCountry.countryThree === randomCountry.correctCountry) {
            classCss = {
                one: "flag",
                two: "flag",
                three: "flagCorrect",
                four: "flag"
            }
            if (!flagStyle.status){
                classCss = {
                    one: "flagIncorrect",
                    two: "flagIncorrect",
                    three: "flagCorrect",
                    four: "flagIncorrect"
                }
            }

        } if (randomCountry.countryFour === randomCountry.correctCountry) {
            classCss = {
                one: "flag",
                two: "flag",
                three: "flag",
                four: "flagCorrect",
            }
            if (!flagStyle.status){
                classCss = {
                    one: "flagIncorrect",
                    two: "flagIncorrect",
                    three: "flagIncorrect",
                    four: "flagCorrect"
                }
            }
        }
    }

    return (
        <>
            {allFlags[0]?.image &&
                <>
                    <div className={style.flagContainer}>
                        <div id="one" className={style[classCss.one]} onClick={(e) => handleClick(e)}><img src={allFlags[randomCountry.countryOne].image} alt={`${randomCountry.countryOne}`} className={style.flagImage} /></div>

                        <div id="two" className={style[classCss.two]} onClick={(e) => handleClick(e)} ><img src={allFlags[randomCountry.countryTwo].image} alt={`${randomCountry.countryTwo}`} className={style.flagImage} /></div>

                        <div id="three" onClick={(e) => handleClick(e)} className={style[classCss.three]}><img src={allFlags[randomCountry.countryThree].image} alt={`${randomCountry.countryThree}`} className={style.flagImage} /></div>

                        <div id="four" onClick={(e) => handleClick(e)} className={style[classCss.four]}><img src={allFlags[randomCountry.countryFour].image} alt={`${randomCountry.countryFour}`} className={style.flagImage} /></div>
                    </div>
                    <div className={style.divCorrect}><span className={style.divCorrectSpan}>{allFlags[randomCountry.correctCountry].name}</span></div>
                </>
            }
        </>
    )
}