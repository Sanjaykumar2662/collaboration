
import React, { useState, useEffect } from 'react';
import "./css/sidebar.css";
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { io } from "socket.io-client";



function Sidebar() {
    const [open, setOpen] = useState(false);
    const [uploading] = useState(false);
    const [file, setFile] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);
        return () => {
            s.disconnect(); // Clean up the socket connection on component unmount
        };
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };



    function handleUpload(event, fileName, fileData,bname) {
        event.preventDefault(); 
        // Prevent default form submission behavior
        socket.emit("createfile",fileName,fileData,bname)
    }
    return (
       
        <>
    <Modal open={open} onClose={handleClose}>
    <div className='modal_pop'>
        <form>
            <div className='modal_heading'>
                <h3>Select File you want to Upload</h3>
            </div>
            <div className='modalbody'>
                {
                    uploading ? (
                        <p className='uploading'>Uploading</p>
                    ) : (
                        <>
                            <input type="file" onChange={handleChange} />
                            <input
                                type='submit'
                                className='post_submit'
                                onClick={(e) => handleUpload(e, file.name, file,"ibm-hc-clone")}
                            />
                        </>
                    )
                }
            </div>
        </form>
    </div>
</Modal>

    <div className="sidebar">
    <div style={{height:"3%"}}></div>
        <div className='sidebar_btn'>
            <button onClick={handleOpen}>
                <AddIcon/> 
                <span>New</span>
            </button>
        </div>
        <div style={{height:"5%"}}></div>
        <hr/>
        <div className='sidebar_options'>
            <div className='sidebar_option'>
                <CloudQueueIcon/>
                <span>Storage</span>
            </div>
            <div className='progress_bar'>
                <progress size="tiny" value="50" max="100"/>
                <span>6.45 GB of 15 GB used</span>
            </div>
        </div>
    </div>
    </>
  ) 
}

export default Sidebar