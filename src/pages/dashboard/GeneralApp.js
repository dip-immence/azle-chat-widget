import React, { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import Conversation from '../../components/Conversation';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { chatHistory } from '../../redux/chat-history/methods/get';
import { dispatch } from '../../redux/store';

const GeneralApp = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { uid, cid } = useParams();
  const { info } = useSelector((store) => store.checkCustomer.post);

  useEffect(() => {
    if (!info || info?.id != cid) {
      navigate(`/hello?userid=${uid}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, uid, cid]);

  useEffect(() => {
    if (uid && info?.id == cid) {
      dispatch(chatHistory({ businessOwnerId: uid, customerId: cid }));
    }
  }, [uid, cid, info]);

  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box
        sx={{
          height: '100%',
          width: '100vw',
          backgroundColor:
            theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default,
        }}
      >
        <Conversation />
      </Box>
    </Stack>
  );
};

export default GeneralApp;
