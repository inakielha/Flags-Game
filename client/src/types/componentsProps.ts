export interface NewRecordProps {
getRandomInt: any,
points:number,
setLives: React.Dispatch<React.SetStateAction<number>>,
setPoints: React.Dispatch<React.SetStateAction<number>>,
components: "capitals" | "flags"
}


export interface ValidationDialogProps extends Omit<NewRecordProps,"points"|"components"> {
setOpenDialog : React.Dispatch<React.SetStateAction<boolean>>,
}
