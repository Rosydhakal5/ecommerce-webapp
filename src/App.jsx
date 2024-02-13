import { Route, Routes } from 'react-router-dom'
import Login from './admin/auth/Login'
import SignUp from './admin/auth/SignUp'
import Dashboard from './admin/components/Dashboard'
import ResetPassword from './admin/auth/ResetPassword'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
