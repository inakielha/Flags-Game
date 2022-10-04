import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

export default function ContinuePlaying(props:any) {

    function handleClose (){
        props.setLives(3)
        props.setPoints(0)
        props.counter(10)
        props.getRandomInt()
    }
    const styles:{ [key: string]: React.CSSProperties } = {
      link: {
          textDecoration: "none",
          color: "#0077b6 "
      },
  } as const

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You lost my friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {`${props.points} points its not a record. Do you want to play again?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Of course!</Button>
          <Button ><Link to="/bestPlayers" style={styles.link} >Best players</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
