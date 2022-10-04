import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidationDialogProps } from '../../../types/componentsProps';

export default function ValidationDialog(props:ValidationDialogProps) {
    function handleClose (){
        props.setLives(3)
        props.setPoints(0)
        props.setOpenDialog(false)
        props.getRandomInt()
    }

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you dont want to save your Record?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {"This points record will disappear if you dont save"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {/* onClick={props.setOpen(false)} */}
          <Button onClick={()=>props.setOpenDialog(false)} autoFocus>Save record</Button>
          <Button onClick={handleClose} >
            Continue without saving
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}