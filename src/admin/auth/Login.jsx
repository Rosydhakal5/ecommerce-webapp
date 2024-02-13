import React, { useEffect, useState } from 'react'
import {
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfoAction } from '../../redux/auth/authAction'
import { enqueueSnackbar } from 'notistack'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const input = [
  { name: 'email', label: 'your username...', type: 'email', required: true },
  {
    name: 'password',
    label: '******',
    type: 'password',
    required: true,
    minLength: 6
  }
]
const Login = () => {
  const [formData, seFormData] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth)
  const handleChange = (e) => {
    const { name, value } = e.target
    seFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Button is clicked')

    const { email, password } = formData
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const { user } = userCredential

      dispatch(getUserInfoAction(user.uid))
      // console.log(getUserInfoAction)
      console.log('logged in')
      navigate('/dashboard')
    } catch (e) {
      enqueueSnackbar('Error: something went wrong', { variant: 'error' })
      console.log(e)
    }
  }

  // useEffect(() => {
  //   if (userInfo?.uid) {
  //     navigate('./dashboard')
  //   }
  // }, [])

  return (
    <>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            <Link href="/reset-password">Forget password?</Link>
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            <Link href="/signup"> New User?</Link>
          </Typography>
        </Paper>
      </Container>
    </>
  )
}

export default Login
