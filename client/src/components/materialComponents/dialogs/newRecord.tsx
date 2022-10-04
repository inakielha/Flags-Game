import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { CREATE_RANKED_PLAYER } from '../../../redux/action';
import { AppDispatch } from '../../../redux/store';
import { UserRecord } from '../../../types/users';
import ValidationDialog from './validationDialog';
import { NewRecordProps } from '../../../types/componentsProps';



export default function NewRecord(props: NewRecordProps) {
    const dispatch = useDispatch<AppDispatch>()
    let [openDialog, setOpenDialog] = useState(false)
    const [info, setInfo] = useState<UserRecord>({
        nickName: "",
        points: "",
        component:props.components 
    })

    function handleClouse() {
        setOpenDialog(!openDialog);
    }

    function handleInput(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setInfo({
            nickName: e.target.value,
            points: props.points,
            component: props.components
        })
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        dispatch(CREATE_RANKED_PLAYER(info))
        props.setLives(3)
        props.setPoints(0)
        props.getRandomInt()
    }

    return (
        <div>
            {/* setOpenDialog={setOpenDialog} */}
            {openDialog ? <ValidationDialog getRandomInt={props.getRandomInt} setOpenDialog={setOpenDialog} setLives={props.setLives} setPoints={props.setPoints} /> :
                <Dialog open={!openDialog}>
                    <DialogTitle>New Record!!</DialogTitle>
                    <DialogContent sx={{ margin: "1em" }} >
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <TextField sx={{ marginTop: "2em" }} label="NickName" onChange={(e)=>handleInput(e)} name="nickName" value={info.nickName} fullWidth={true} />
                            {/* <TextField label="Amount" fullWidth={true} /> */}
                            <DialogActions>
                                <Button type='submit'>Save</Button>
                                <Button onClick={handleClouse}>Close</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            }
        </div>
    )
}