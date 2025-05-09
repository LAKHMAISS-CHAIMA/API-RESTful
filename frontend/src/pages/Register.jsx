import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = users.some((u) => u.email === formData.email);
    if (emailExists) {
      setMessage('Cet email est déjà utilisé.');
      return;
    }

    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
    setMessage('Inscription réussie ! Redirection...');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='relative flex w-96 flex-col rounded-xl bg-white text-gray-700 shadow-md mx-auto my-10 px-6 py-8'>
        <h2 className='text-3xl font-semibold text-center mb-6'>Créer un compte</h2>

        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Nom</label>
          <input name='name' type='text' value={formData.name} onChange={handleChange} placeholder='Votre nom' className='w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500' required /></div>

        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
          <input name='email' type='email' value={formData.email} onChange={handleChange} placeholder='vous@example.com' className='w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500' required /></div>

        <div className='mb-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Mot de passe</label>
          <input name='password' type='password' value={formData.password} onChange={handleChange} placeholder='••••••••' className='w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500' required /></div>

        <div className='mb-6'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>Rôle</label>
          <select name='role' value={formData.role} onChange={handleChange} className='w-full rounded-md border border-blue-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <button type='submit' className='block w-full rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg'> S'inscrire</button>

        {message && <p className='text-sm text-center text-cyan-600 mt-4'>{message}</p>}

        <p className='mt-6 text-center text-sm font-light'> Vous avez déjà un compte ?
          <a href='/login' className='ml-1 font-bold text-cyan-500 hover:underline'>Se connecter</a></p>
      </form>
    </div>
  );
};

export default Register;
