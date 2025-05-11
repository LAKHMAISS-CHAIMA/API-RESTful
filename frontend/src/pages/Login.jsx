import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('session', JSON.stringify(user));
      setUser(user);
      
      toast.success('Connexion réussie !');
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    
    } else {
      setMessage('Identifiants invalides');
      toast.error('Identifiants invalides');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='relative flex w-96 flex-col rounded-xl bg-white text-gray-700 shadow-md mx-auto my-10 px-6 py-8'>
        <h2 className='text-3xl font-semibold text-center mb-6'>Se connecter</h2>

        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
          <input name='email' type='email' value={formData.email} onChange={handleChange} placeholder='vous@example.com' className='w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
        </div>

        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Mot de passe</label>
          <input name='password' type='password' value={formData.password} onChange={handleChange} placeholder='••••••••' className='w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500' required />
        </div>

        <div className='mb-4 flex items-center'>
          <input id='remember' name='remember' type='checkbox' checked={formData.remember} onChange={handleChange} className='h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded' />
          <label htmlFor='remember' className='ml-2 block text-sm text-gray-900'> Se souvenir de moi</label>
        </div>

        <button type='submit' className='block w-full rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg'> Connexion</button>

        {message && <p className='text-sm text-center text-red-500 mt-4'>{message}</p>}

        <p className='mt-6 text-center text-sm font-light'>Pas encore de compte ? 
          <a href='/register' className='ml-1 font-bold text-cyan-500 hover:underline'>Créer un compte</a>
        </p>
      </form>
    </div>
  ); 
};

export default Login;