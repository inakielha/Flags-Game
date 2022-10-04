import style2 from "./playCapital.module.css"
declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      data?: string;
    }
  }
export default function PlayCapital({ handleClick, style, allFlags, randomCountry, flagStyle }: any) {
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
                        <div id="one" data-info={`${randomCountry.countryOne}`} className={style2[classCss.one]} onClick={(e) => handleClick(e)}><span data-info={`${randomCountry.countryOne}`} className={style2.text}>{allFlags[randomCountry.countryOne].capital}</span></div>

                        <div id="two" data-info={`${randomCountry.countryTwo}`} className={style2[classCss.two]} onClick={(e) => handleClick(e)} ><span data-info={`${randomCountry.countryTwo}`} className={style2.text}>{allFlags[randomCountry.countryTwo].capital}</span> </div>

                        <div id="three" data-info={`${randomCountry.countryThree}`} onClick={(e) => handleClick(e)} className={style2[classCss.three]}><span data-info={`${randomCountry.countryThree}`} className={style2.text}>{allFlags[randomCountry.countryThree].capital}</span></div>

                        <div id="four" data-info={`${randomCountry.countryFour}`} onClick={(e) => handleClick(e)} className={style2[classCss.four]}><span data-info={`${randomCountry.countryFour}`} className={style2.text}>{allFlags[randomCountry.countryFour].capital}</span></div>
                    </div>
                    <div className={style.divCorrect}><span className={style.divCorrectSpan}>{allFlags[randomCountry.correctCountry].name}</span></div>
                </>
            }
        </>
    )
}