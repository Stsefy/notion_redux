import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { getEntity } from '../../services/api';
import { SAVE_USER } from '../../store/actionTypes';

const Login = ({ saveUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setError('');
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError('');
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userEntity = await getEntity('users', { email, password });    
    if (!userEntity) {
      setError('Login failed. Please check your credentials and try again.');
      return;
    }

    saveUser(userEntity);
    navigate('/profile');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Email"
            value={email}
            handler={handleEmailChange}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            handler={handlePasswordChange}
          />
          {error && <p className="mb-2 block text-sm font-medium text-red-600">{error}</p>}
          <Button full type="submit">Login</Button>
        </form>
        <div className="mt-4 text-center">
          <p>Don&apos;t have an account? <Link to="/signUp" className="text-blue-500">Sign up</Link></p>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (data) => dispatch({ type: SAVE_USER, payload: data }),
});

export default connect(null, mapDispatchToProps)(Login);
