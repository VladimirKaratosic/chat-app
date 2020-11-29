import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './MessageBox.scss';

const MessageBox = ({ chat, name }) => (
    <ScrollToBottom className="messagebox_wrapper" >
        {chat.length > 0 && chat.map(({ message, author, timeStamp }, i) => (
            <React.Fragment key={i}>
                {author === name ?
                    (<div className="my_message_box msg_box" >
                        <p className="message_text">{message}</p>
                        <p className="my_message_date">{timeStamp}</p>
                    </div>) : (<div className="message_box msg_box">
                        <p className="author_text">{author}</p>
                        <p className="message_text">{message}</p>
                        <p className="others_message_date">{timeStamp}</p>
                    </div>)}
            </React.Fragment>
        ))}
    </ScrollToBottom>
);

export default MessageBox;