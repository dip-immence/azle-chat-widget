import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';
import { useSelector } from 'react-redux';

const Message = ({ menu }) => {
  const { info } = useSelector((store) => store.checkCustomer.post);
  const { chatHistoryInfo } = useSelector((store) => store.chatHistory.get);

  const [chatRecode, setChatRecode] = useState([]);

  useEffect(() => {
    if (info && chatHistoryInfo) {
      const historyData = chatHistoryInfo?.liveChat?.map((data) => {
        const messageInfo = {
          type: 'msg',
          message: data?.body,
          incoming: data?.fromId != info.id && info.id == data.customerId ? true : false,
          outgoing: data?.fromId == info.id && info.id == data.customerId ? true : false,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
        };
        return messageInfo;
      });
      setChatRecode(historyData.sort((a, b) => new Date(a?.createdAt) - new Date(b?.createdAt)));
    }
  }, [info, chatHistoryInfo]);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {chatRecode?.map((el) => {
          switch (el.type) {
            case 'divider':
              return <TimeLine el={el} />;

            case 'msg':
              switch (el.subtype) {
                case 'img':
                  return <MediaMsg el={el} />;
                case 'doc':
                  return <DocMsg el={el} />;

                case 'link':
                  return <LinkMsg el={el} />;
                case 'reply':
                  return <ReplyMsg el={el} />;

                default:
                  return <TextMsg el={el} />;
              }
              break;

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
