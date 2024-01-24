import { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatMessages = ({ messages, isLoading, companion }) => {
  const scrollRef = useRef(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className='flex-1 overflow-y-auto pr-4'>
      <ChatMessage
        isLoading={fakeLoading}
        role='system'
        src={companion.src}
        content={`Hello i am ${companion.name}, ${companion.description}`}
      />

      {messages.map((message) => {
        return (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            src={companion.src}
          />
        );
      })}

      {isLoading && <ChatMessage role='system' src={companion.src} isLoading />}

      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
