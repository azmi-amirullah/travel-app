import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Error404 from './components/Error404'
import Profile from './pages/Profle/Profile'
import Users from './pages/Users/Users'
import { useAppSelector } from './stores/hook'

function App() {
  const user = useAppSelector((state) => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {user.roles.permission?.Destination.Read && (
          <Route path="/" element={<Dashboard />} />
        )}
        <Route path="/profile" element={<Profile />} />
        {user.roles.permission?.User.Read && (
          <Route path="/users" element={<Users />} />
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
