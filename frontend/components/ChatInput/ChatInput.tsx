import React, { FC, FormEvent, useRef, useState } from 'react';
import classes from './ChatInput.module.scss';
import { FaSmile } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { IEmojiData } from 'emoji-picker-react';

import { useClickOnBackground } from 'utils/useClickOnBackground';

const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
});

interface ChatInputProps {
  sendMessage: (text: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ sendMessage }) => {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const pickerRef = useRef<HTMLDivElement>();

  const onEmojiClick = (_: any, emojiObject: IEmojiData) => {
    setText(text + emojiObject.emoji);
  };

  const closePicker = () => {
    setVisible(false);
  };

  useClickOnBackground(pickerRef, closePicker);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(text);
    setText('');
  };

  return (
    <>
      <form className={classes.Container} onSubmit={handleSubmit}>
        <div className={classes.TextInput}>
          <input
            value={text}
            placeholder={'Aa'}
            autoComplete={'off'}
            onChange={(e) => setText(e.target.value)}
          />
          <FaSmile onClick={() => setVisible(!visible)} />
        </div>
        {visible && (
          <div className={classes.Picker} ref={pickerRef}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </form>
    </>
  );
};

export default ChatInput;
