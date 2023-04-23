import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

function GenerateUser() {
  const [message, setMessage] = useState(null) 
  const [user, setUser] = useState({
    mail: "",
    name: "",
    password: ""
  });

  function saveUser() {
    fetch('/api/user/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then((response) => {
      if (response.error) {
        setMessage({ 
          severity: 'error',
          text: response.error
        })
      } else {
        setMessage({ 
          severity: 'success',
          text: 'User successfully created!'
        })
      }
    })
    
  }

  function handleChange(event) {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.id]: value
    });
  }

  return <Box component="form" 
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
        '& button': { m: 1 }
      }}
    >
      <Box sx={{margin: 1, width: "100%"}}>
        { message ? 
          <Alert severity={message.severity}>{message.text}</Alert>
          : null }
      </Box>
      <div>
        <TextField id="mail" label="email" onChange={handleChange}/>
      </div>
      <div>
      <TextField id="name" label="name" onChange={handleChange}/>
      </div>
      <div>
        <TextField id="password" label="Password" type="password" 
          onChange={handleChange}/>
      </div>
      <div>
        <Button variant="contained" onClick={saveUser} id="generate">
          Generate
        </Button>
      </div>
    </Box>
}

export default GenerateUser
