import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './LogIn.scss';

export default function LogIn() {
    const [state, setState] = useState({ author: '', token: '' });
    const history = useHistory();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { author, token } = state;
        if (author && token) {
            history.push('/chat', { author, token });
        }
    }
    return (
        <div className="LogIn">
            <div className="log_wrapper">
                <div className="login_box">
                    <h1>Chat App</h1>
                    <form className="login_form" onSubmit={handleSubmit}>
                        <div className="author_field_box">
                            <input
                                className="field author_field"
                                autoComplete="off"
                                autoFocus
                                onChange={handleChange}
                                value={state.author}
                                type="text"
                                name="author"
                                placeholder="Name"
                            />
                        </div>

                        <input
                            className="field token_field"
                            autoComplete="off"
                            onChange={handleChange}
                            value={state.token}
                            type="text"
                            name="token"
                            placeholder="Token"
                        />
                        <button className='login_button' type="submit" >Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}