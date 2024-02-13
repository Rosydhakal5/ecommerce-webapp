import {
  Link,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { sendPasswordResetEmail } from 'firebase/auth'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const inputs = [
  {
    name: 'email',
    type: 'email',
    id: 1,
    label: 'Enter your email...',
    required: true
  }
]

const ResetPassword = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email } = formData
    try {
      const userReset = await sendPasswordResetEmail(auth, email)
      enqueueSnackbar('Password Reset Link Sent👩🏻‍💻', { variant: 'success' })
      navigate('/')
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
      console.log(error)
    }
  }
  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 5,
            border: '2px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Enter your email here...
          </Typography>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <TextField
                key={input.name}
                label={input.label}
                name={input.name}
                type={input.type}
                required={input.required}
                fullWidth
                margin="normal"
                variant="outlined"
                value={formData[input.name]}
                onChange={handleChange}
              />
            ))}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            <Link href="/"> Retry Login? </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  )
}
export default ResetPassword
