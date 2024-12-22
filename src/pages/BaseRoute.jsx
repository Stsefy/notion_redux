import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { SAVE_USER } from '../store/actionTypes';
import { getUser } from '../services/sessionStorage';

const BaseRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = getUser();
    
    if (savedUser) {
      dispatch({ type: SAVE_USER, payload: savedUser })
    } else {
      navigate('/login');
    }
  }, [navigate, dispatch]);

  return (
    <div className="max-w-3xl min-w-80 w-full">
      <Outlet />
    </div>
  );
};

export default BaseRoute;
