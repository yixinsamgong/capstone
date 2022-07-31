import { useState, useEffect } from 'react'
import WordList from "./userpage/wordlist"
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import styled from '@emotion/styled'

function UserpageContainer({ setCurrentUser, currentUser }) {

  const [words, setWords] = useState([])

  useEffect(() => {
    fetch(`/users/${currentUser.id}/words`)
      .then((r) => r.json())
      .then(data => 
        setWords(data)
      // console.log(data)
      ) 
    
    // console.log("I am being called")
  }, [])

  // console.log("I am being called", words)

  
  function handleDelete(id) {
    console.log(id)
    fetch(`/userwords/${id}`, { 
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.id,
        word_id: id
      })
    })
      .then(r => {
        if (r.ok) {
          setWords(words => words.filter(word => word.id !== id))
        }
      })
  }

  return (
    <div>
      <WordList words={words} setCurrentUser={setCurrentUser} currentUser={currentUser} handleDelete={handleDelete} />
    </div>
  )
}

export default UserpageContainer