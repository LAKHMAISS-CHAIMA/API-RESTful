import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session) setUser(session);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/home') : '/login'} />} />
        <Route path='/login' element={!user ? <Login setUser={setUser} /> : <Navigate to='/' />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/home' element={user?.role === 'user' ? <Home /> : <Navigate to='/' />} />
        <Route path='/admin' element={user?.role === 'admin' ? <Admin /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;