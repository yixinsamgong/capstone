import React, { useState } from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom'
import styled from '@emotion/styled'


function Login({ setCurrentUser }) {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                if (res.ok) {
                    res.json().then(user => {
                        setCurrentUser(user)
                        history.push('/')
                    })
                } else {
                    res.json().then(errors => {
                        console.error(errors)
                    })
                }
            })
    }
    return (
        <div>

            <Redirect to="/" />
            <form onSubmit={handleSubmit}>
                {/* <h1>Log In</h1> */}
                <p>
                    <label htmlFor="username"
                        style={style}>
                        Username
                    </label>
                    &nbsp;
                    &nbsp;
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <label
                        htmlFor="password"
                        style={style}
                    >
                        Password
                    </label>
                    &nbsp;
                    &nbsp;
                    <input
                        type="password"
                        name=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <p><Link to="/signup" style={style}>No account here? OMG!</Link></p>
                <Button type="submit">Log In</Button>
            </form>
        </div>
    )
}


const Button = styled.button`
    padding: 20px;
    background-color: #f5ffe3;
    font-size: 24px;
    border-radius: 4px;
    font-weight: bold;
    margin: 10px;
    align: cetner
    &:hover {
    color: white;
    }
`
const style = {
    textAlign: 'left',
    fontFamily: 'Arial',
    fontWeight: "bold",
    textDecoration: "none"
}

export default Login