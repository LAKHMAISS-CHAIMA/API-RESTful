import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur inconnue');
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen'
    >
      <div className='w-full bg-white rounded-lg shadow border sm:max-w-md p-6 space-y-6'>
        <h2 className='text-xl font-bold text-gray-900'>Créer un compte</h2>

        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Nom d'utilisateur</label>
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder=''
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
            required
          />
        </div>

        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Mot de passe</label>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
            required
          />
        </div>

        <div>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Confirmer le mot de passe</label>
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Créer un compte
        </button>

        {message && <p className='text-sm text-center text-red-500'>{message}</p>}
      </div>
    </form>
  );
}

export default Register;
