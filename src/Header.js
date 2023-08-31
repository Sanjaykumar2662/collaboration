import React from 'react'
import "./css/header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AppsIcon from '@mui/icons-material/Apps';
// import { Avatar } from '@mui/material';


const Header = () => {
  return (
    <div className="header">
        <div className='header__logo'>
            <img src='https://imgs.search.brave.com/2nUVL-Qb3fSIihbGMLe9LmzzIkFI08UaW_bvjGpeV_Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIwLzA4/L0dvb2dsZS1Ecml2/ZS1Mb2dvLTUwMHgz/MTUuanBn' alt ="please enter the correct path"></img>
            <span>Drive</span>
        </div>
        <div className='header__search'>
            <SearchIcon/>
            <input type='text' placeholder='Search in Drive' />
            <FormatAlignCenterIcon/>
        </div>
        {/* <div className='header__icons'>
            <span>
                <HelpOutlineIcon/>
            </span>
            <span>
                <SettingsIcon/>
            </span>
            <span>
                <AppsIcon/>
                <Avatar/>
            </span>
        </div> */}
    </div>
  )
}

export default Header