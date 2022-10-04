import { Link, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";
import { useState } from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import style from "./navbar.module.css"


export default function Nav():JSX.Element {
    const [activateNav, setActivateNav] = useState(false)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    
    const handleOpenUserMenu = (event:any) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

      function handleStartGame(){
          navigate("/")
        }
        
        function handleBestPlayers(){
          navigate("/bestPlayers")
      }

    return (
        <Box className={style.contenedor}>
        <IconButton  onClick={(e)=>handleOpenUserMenu(e)}>
            <MenuIcon sx={{color:"white"}} fontSize="large"/>
        </IconButton>
        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleStartGame}>
                  <Typography textAlign="center">Start Game</Typography>
                </MenuItem>
                <MenuItem onClick={handleBestPlayers}>
                  <Typography  textAlign="center">Best Players</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}
