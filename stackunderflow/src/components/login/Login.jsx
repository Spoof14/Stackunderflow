import React, { PureComponent } from 'react'
import './Login.css'

export default class Login extends PureComponent {
    render() {
        let {onChange, onSubmit, username, password} = this.props
        return (
            <form className="login-container" onSubmit={onSubmit}>
                <div className="login-input">
                    <label>
                        Username:
                        <input type="text" name="username" onChange={onChange} value={username}></input>
                    </label>
                </div>
                <div className="login-input">
                    <label>
                        Password:
                        <input type="password" name="password" onChange={onChange} value={password}></input>
                    </label>
                </div>
                <input type="submit" onClick={onSubmit} value="Login"></input>
            </form>
        )
    }
}
