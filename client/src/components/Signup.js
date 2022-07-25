// client/src/components/Signup.js
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from '@emotion/styled'


function Signup({ setCurrentUser }) {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                fullname: fullname,
                email: email
            })
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
          
            <form onSubmit={handleSubmit}>
                {/* <h1>Sign Up</h1> */}
                <p>
                    <label
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>
                <p>
                    <label
                        htmlFor="fullname"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </p>

                <p>
                    <label
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                
                <p>
                    <label
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </p>
                <p><Link to="/login">You have account? Then why u here?</Link></p>
                <Button type="submit">Sign Up</Button>
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
`

export default Signup