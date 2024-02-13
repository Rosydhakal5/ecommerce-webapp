import {
  Link,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const inputs = [
  {
    name: 'fName',
    id: 1,
    type: 'text',
    label: 'Enter your First Name...',
    required: true
  },
  {
    name: 'lName',
    id: 2,
    type: 'text',
    label: 'Enter your Last Name...',
    required: true
  },
  {
    name: 'phone',
    id: 3,
    type: 'number',
    label: 'Enter your phone number...',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    id: 4,
    label: 'Enter your email...',
    required: true
  },
  {
    name: 'address',
    type: 'location',
    id: 5,
    label: 'Enter your address...',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    id: 6,
    minLength: 6,
    label: '******',
    required: true
  }
]

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    address: '',
    phone: '',
    lName: '',
    fName: ''
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
    const { email, password } = formData
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const { uid } = userCredential.user
      //storing info in database
      await setDoc(doc(db, 'users', uid), {
        uid,
        ...formData
      })

      enqueueSnackbar('New User Created', { variant: 'success' })
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
          <Typography variant="h4" gutterBottom>
            Sign Up
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
            <Link href="/"> Already have an account?</Link>
          </Typography>
        </Paper>
      </Container>
    </>
  )
}
export default SignUp

