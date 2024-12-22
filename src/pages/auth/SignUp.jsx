import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { getEntity, postEntity } from '../../services/api';
import { SAVE_USER } from '../../store/actionTypes';
import { validateEmail, validatePassword } from '../../validators/validation';

const SignUp = ({ saveUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeated, setRepeated] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setError('');
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError('');
    setPassword(event.target.value);
  };

  const handleRepeatedChange = (event) => {
    setError('');
    setRepeated(event.target.value);
  };

  const isFormValid = () => {
    if (!email || !password || !repeated) {
      setError('All fields are required.');
      return false;
    }

    if (password !== repeated) {
      setError('Passwords do not match.');
      return false;
    }
    
    const emailResult = validateEmail(email);
    if (!emailResult.success) {
      setError(emailResult.error.errors.at(0).message);
      return false;
    }

    const passwordResult = validatePassword(password);
    if (!passwordResult.success) {
      setError(passwordResult.error.errors.at(0).message);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const userFromDb = await getEntity('users', { email });
    if (userFromDb) {
      setError('User with same email already exists.');
      return;
    }

    const user = {
      email,
      password,
      createdDate: Date.now(),
    };
    const createdUser = await postEntity('users', user);

    saveUser(createdUser);
    navigate('/profile');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
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
          <Input
            type="password"
            label="Repeat password"
            value={repeated}
            handler={handleRepeatedChange}
          />
          {error && <p className="mb-2 block text-sm font-medium text-red-600">{error}</p>}
          <Button full type="submit">SignUp</Button>
        </form>
        <div className="mt-4 text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (data) => dispatch({ type: SAVE_USER, payload: data }),
});

export default connect(null, mapDispatchToProps)(SignUp);
