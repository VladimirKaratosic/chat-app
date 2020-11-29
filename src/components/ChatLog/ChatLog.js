import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import './ChatLog.scss';
import MessageBox from '../MessageBox/MessageBox';

const SOCKET_END_POINT = 'http://localhost:8000';
let socket;

export default function ChatLog(props) {
    const [state, setState] = useState({ author: '', token: '' });
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const { history } = props;

    useEffect(() => {
        socket = io(SOCKET_END_POINT);
    }, [])

    useEffect(() => {
        if (history && history.location && history.location.state) {
            const { author, token } = history.location.state;
            setState({ author, token });
        }
    }, [history])

    useEffect(() => {
        const chatCallback = ({ message, author, timeStamp }) => {
            setChat([...chat, { message, author, timeStamp }])
        };
        socket.on('chat', chatCallback)
        return () => {
            socket.removeListener('chat', chatCallback);
        }
    }, [message, chat])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { author } = state;
        if (author && message) {
            socket.emit('message', { message, author });
            setMessage('');
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }
    return (
        <React.Fragment>
            <div className="message-area">
                <MessageBox chat={chat} name={state.author} />
            </div>
            <div className="typing-area">
                <div className="typing_wrapper">
                    <form className="form" onSubmit={handleSubmit}>
                        <input name="message" className="input_field" autoFocus autoComplete="off" type="text" placeholder="Message" 
                            onChange={handleChange} value={message} />
                        <button className="send_button" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
