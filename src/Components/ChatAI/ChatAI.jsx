import React, { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Button, Typography, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { sendMessageAPI } from '../../apis'; // Thay đổi đường dẫn import tùy theo cấu trúc dự án của bạn

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotResponding, setIsBotResponding] = useState(false); // Thêm state cho trạng thái của bot

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
      setIsBotResponding(true); // Bắt đầu trạng thái đang đợi câu trả lời từ bot
    
      try {
        const userQuery = {
          conversation_id: "123",
          bot_id: "7448158819370795009",
          user: "29032201862555",
          query: input,
          stream: false
        };

        const botResponse = await sendMessageAPI(userQuery);
        console.log('Received response from API:', botResponse);

        if (botResponse.answer) {
          const botAnswerMessage = { sender: 'bot', text: botResponse.answer };
          setMessages(prevMessages => [...prevMessages, botAnswerMessage]);
        }

      } catch (error) {
        console.error('Error sending message:', error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi trong chat)
      } finally {
        setIsBotResponding(false); // Kết thúc trạng thái đang đợi câu trả lời từ bot
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <IconButton
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          bgcolor: 'transparent',
          color: 'white',
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/053/135/088/non_2x/chatbot-digital-information-free-png.png")',
          backgroundSize: 'contain',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {!isOpen && <div style={{ width: '100%', height: '100%' }} />}
      </IconButton>
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '350px',
            height: '500px',
            bgcolor: 'white',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            borderRadius: '16px', // Rounded borders for the chat box
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#0984e3', color: 'white', borderTopLeftRadius: 2, borderTopRightRadius: 2, p: 1, borderRadius: '16px 16px 0 0' }}>
            <IconButton sx={{ color: 'white' }} onClick={toggleChat}>
              <ArrowBackIcon />
            </IconButton>
            <Avatar
              alt="DevNghiepdu"
              src="https://static.vecteezy.com/system/resources/previews/053/135/088/non_2x/chatbot-digital-information-free-png.png"
              sx={{ width: 55, height: 55 }}
            />
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', flexDirection: 'column', marginRight: '40px', marginTop: '5px' }}>
              <Typography variant="subtitle1" sx={{ mr: 1, fontSize: '13px' }}>Trợ lý ảo của 2HM</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
                <Box sx={{ width: 8, height: 8, bgcolor: '#9bd529', borderRadius: '50%', mb: 0.5 }} />
                <Typography variant="caption" sx={{ ml: 0.5 }}>Online</Typography>
              </Box>
            </Box>
            <IconButton sx={{ color: 'white' }}>
              <MoreVertIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }} onClick={toggleChat}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  p: 1,
                  m: 1,
                  borderRadius: '12px',
                  bgcolor: message.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
              </Box>
            ))}
            {isBotResponding && ( // Hiển thị tin nhắn "Đang phản hồi..." khi bot đang xử lý
              <Box
                sx={{
                  p: 1,
                  m: 1,
                  borderRadius: '12px',
                  bgcolor: '#f1f8e9',
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                <Typography variant="body2" sx={{ color: '#777', fontStyle: 'italic' }}>Đang phản hồi...</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', p: 1, borderTop: '1px solid #ddd' }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} 
              sx={{ borderRadius: '12px' }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              endIcon={<SendIcon sx={{ color: 'white' }} />}
              sx={{ ml: 0.5, borderRadius: '12px', color: 'white', fontSize:'13px' }} 
            >
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ChatAI;
