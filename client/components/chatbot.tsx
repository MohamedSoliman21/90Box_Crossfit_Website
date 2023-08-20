import { LanguageDirectionContext } from '@/helpers/langDirection';
import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react';
import {FormattedMessage, useIntl} from "react-intl"

interface Message {
  content: string;
  isUser: boolean;
}

interface QAPair {
  Question: string;
  Answer: string;
  ArabicQuestion: string;
  ArabicAnswer: string;
}

const Chatbot: React.FC = () => {
  const {formatMessage} = useIntl();

  const { isRTL } = useContext(LanguageDirectionContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const [qaPairs, setQAPairs] = useState<QAPair[]>([]);


  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = formatMessage({ id: 'bot.welcome' });
      setMessages([{ content: welcomeMessage, isUser: false }]);
    } else {
      if (chatWindowRef.current) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    fetchQAPairs();
  }, []);
  
  const fetchQAPairs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/bot');

      if (response.status !== 200) {
        throw new Error('Failed to fetch Q&A pairs');
      }

      setQAPairs(response.data);
      console.log(qaPairs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleChatbot = () => {
    setIsOpen(!isOpen);
  }

  const handleUserMessage = (message: string) => {
    if(message != '') {
      const response = getBotResponse(message);

      setMessages(prevMessages => [...prevMessages, { content: message, isUser: true }]);
      setIsBotTyping(true);
  
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { content: response, isUser: false }]);
        setIsBotTyping(false);
      }, 1000);
    }
  };

  const getBotResponse = (userInput: string): string  => {
      if(isRTL) {
        const matchedQAPair = qaPairs.find(qaPair =>
          userInput.toLowerCase().includes(qaPair.ArabicQuestion.toLowerCase())
        );
    
        return matchedQAPair ? matchedQAPair.ArabicAnswer : "";
      } else {
        const matchedQAPair = qaPairs.find(qaPair =>
          userInput.toLowerCase().includes(qaPair.Question.toLowerCase())
        );
    
        return matchedQAPair ? matchedQAPair.Answer : "";
      }
  };

return (
  <div className="fixed bottom-4 right-4 z-50">
    <button
      className={`bg-pyellow flex justify-center items-center  ${
        !isOpen ? 'w-20 h-20 rounded-full shadow-md shadow-black/50' : 'w-full h-10 rounded-t-lg max-w-md mx-auto'
      } `}
      onClick={handleToggleChatbot}
    >
      {isOpen ? formatMessage({id: 'bot.head'}) : <img src='http://localhost:3000/chatbot.svg' width={100}/>}
    </button>

    {isOpen &&    
      <div className="bg-white rounded-b-lg shadow-md p-4 max-w-md mx-auto">
        <div id="chat-window" ref={chatWindowRef} className="overflow-y-auto w-full max-h-60">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              {!message.isUser && (
                <img
                  src="http://localhost:3000/chatbot.svg"
                  alt="Bot Avatar"
                  className="w-10 h-10 bg-pyellow rounded-full mr-2 fill-primary"
                />
              )}
              <p className={`rounded-lg p-2 ${message.isUser ? 'ml-2 bg-gray-300' : 'mr-2 bg-pyellow'}`}>
                {message.content}
              </p>
              {message.isUser && (
                <img
                  src="http://localhost:3000/avatar.svg"
                  alt="User Avatar"
                  className="w-10 h-10 bg-pgrey rounded-full ml-2"
                />
              )}
            </div>
          ))}
          {isBotTyping && (
            <div className="flex mb-2 justify-start">
              <div className="w-8 h-8 rounded-full mr-2 bg-gray-200 animate-pulse" />
              <div className="bg-gray-200 rounded-lg p-2 animate-pulse w-1/2" />
            </div>
          )}
        </div>
        <div className="border border-gray-300 rounded px-2 py-1 w-full mt-2 text-black relative">
  <select
    className="w-full h-full appearance-none bg-transparent focus:outline-none"
    placeholder="Type your message..."
    onFocus={(e)=>{e.target.size = 3}}
    onChange={e => {
      handleUserMessage(e.currentTarget.value);
      e.currentTarget.value = '';
    }}
  >
    <option value="" className="text-black">
      <FormattedMessage id="bot.select" />
    </option>
    {qaPairs.map((qaPair, index) => (
      <option key={index} value={isRTL? qaPair.ArabicQuestion :qaPair.Question} className="text-black">
        {isRTL? qaPair.ArabicQuestion : qaPair.Question}
      </option>
    ))}
  </select>
</div>
      </div>
    }
  </div>
);

};

export default Chatbot;