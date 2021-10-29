/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import axios from "axios"
import { connect } from "react-redux"
import userApi from "../api/userApi"
const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("invalid password")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setError(null)
        setLoading(true)

        axios({
            method: "Post",
            url: "http://localhost:3000/users/login",
            data: { username: username, password: password }
        }).then(response => {
            setLoading(false)
            // console.log("datatra ve " + response.data._id)
            props.addUserRedux(response.data.username, response.data._id);
            props.history.push("./product")

        }).catch(
            error => {
                setLoading(false)
                if (error.response.status === 401 || error.response.status === 400) {
                    setError(error.response.data.message)
                }
                else {
                    setError("Error.Please try later")
                }
            }
        )
    }
    return (
        <div className="main-container">
            <div className="login-form">
                <h1 className="form-title">Login</h1>
                <div className="input-box">
                    <input type="text"
                        placeholder="username"
                        valua={username}
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-box">
                    <input type="password"
                        placeholder="password"
                        valua={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>
                {error && <div className="error">{error}</div>}
                <input type="button" value={loading ? "Loading.." : "Login"} disabled={loading}
                    onClick={handleLogin} />
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return { usernameRedux: state.users }
}
function mapDispatchToState(dispatch) {
    return { addUserRedux: (username, userID) => dispatch({ type: "LOGIN_USER", payload: { username: username, userId: userID } }) }
}

export default connect(mapStateToProps, mapDispatchToState)(Login);