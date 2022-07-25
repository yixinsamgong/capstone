import './App.css';
import React from 'react';
import NavBar from './components/NavBar'
import UserpageContainer from './components/UserpageContainer'
import DatabaseContainer from './components/DatabaseContainer'
import Form from './components/Form'

import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

function AuthenticatedApp({ currentUser, setCurrentUser }) {
    const history = useHistory()


    // useEffect(() => {
    //     fetch('/posts')
    //         .then(res => res.json())
    //         // .then(posts => setPosts(posts))
    // }, [])

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    setCurrentUser(null)
                    history.push('/')
                }
            })
    }

    return (
        <div>
            <NavBar handleLogout={handleLogout} setCurrentUser={setCurrentUser} currentUser={currentUser} />
                <Switch>

                <Route exact path="/">
                    <div>
                        <UserpageContainer setCurrentUser={setCurrentUser} currentUser={currentUser} />
                    </div>
                </Route>

                <Route exact path="/database">
                    <div>
                        <DatabaseContainer setCurrentUser={setCurrentUser} currentUser={currentUser} />
                    </div>
                </Route>

                <Route exact path="/submit">
                    <div>
                        <Form setCurrentUser={setCurrentUser} currentUser={currentUser} />
                    </div>
                </Route>

                    <Redirect to="/" />
                </Switch>

         
        </div>

    );
}       


export default AuthenticatedApp;