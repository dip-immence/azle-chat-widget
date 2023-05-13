import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Camera,
  File,
  Image,
  Sticker,
  User,
} from 'phosphor-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { dispatch } from '../../redux/store';
import { sendMessage } from '../../redux/send-message/methods/post';
import { useParams } from 'react-router-dom';

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px',
    paddingBottom: '12px',
  },
}));

const Actions = [
  {
    color: '#4da5fe',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video',
  },
  {
    color: '#1b8cfe',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Stickers',
  },
  {
    color: '#0172e4',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Image',
  },
  {
    color: '#0159b2',
    icon: <File size={24} />,
    y: 312,
    title: 'Document',
  },
  {
    color: '#013f7f',
    icon: <User size={24} />,
    y: 382,
    title: 'Contact',
  },
];

const ChatInput = ({ setOpenPicker, setMessageData, messageData, handelSendMessage }) => {
  const [openAction, setOpenAction] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handelSendMessage();
    }
  };
  return (
    <StyledInput
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        onChange: (e) => setMessageData(e.target.value),
        value: messageData,
        onKeyDown: handleKeyDown,
        // startAdornment:
        // <Stack sx={{width:'max-content'}}>
        //     <Stack sx={{position:'relative', display: openAction ? 'inline-block' : 'none'}}>
        //         {Actions.map((el)=>(
        //             <Tooltip placement='right' title={el.title}>
        //                 <Fab sx={{position:'absolute', top: -el.y, backgroundColor: el.color}}>
        //                     {el.icon}
        //                 </Fab>
        //             </Tooltip>

        //         ))}
        //     </Stack>
        //     <InputAdornment>
        //         <IconButton onClick={()=>{
        //             setOpenAction((prev)=>!prev)
        //         }}>
        //             <LinkSimple/>
        //         </IconButton>
        //     </InputAdornment>
        // </Stack>
        // ,
        // endAdornment: <InputAdornment>
        // <IconButton onClick={()=>{
        //     setOpenPicker((prev)=> !prev);
        // }}>
        //     <Smiley/>
        // </IconButton>
        // </InputAdornment>
      }}
    />
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  const [messageData, setMessageData] = useState('');
  const { uid, cid } = useParams();

  const handelSendMessage = async () => {
    if (messageData != '') {
      await dispatch(
        sendMessage({
          toId: uid,
          fromId: cid,
          body: messageData,
          customerId: cid,
        })
      );
      setMessageData('');
    }
  };

  return (
    <Box
      p={2}
      sx={{
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
      }}
    >
      <Stack direction="row" alignItems={'center'} spacing={3}>
        <Stack sx={{ width: '100%', borderRadius: '5rem', overflow: 'hidden' }}>
          {/* Chat Input */}
          <Box
            sx={{
              display: openPicker ? 'inline' : 'none',
              zIndex: 10,
              position: 'fixed',
              bottom: 81,
              right: 100,
            }}
          >
            <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
          </Box>
          <ChatInput
            setOpenPicker={setOpenPicker}
            setMessageData={setMessageData}
            messageData={messageData}
            handelSendMessage={handelSendMessage}
          />
        </Stack>

        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
          }}
        >
          <Stack
            sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <IconButton onClick={handelSendMessage}>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
