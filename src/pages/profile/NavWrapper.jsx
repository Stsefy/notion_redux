import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import { REMOVE_USER } from '../../store/actionTypes';

const NavWrapper = ({ children, user, removeUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <nav className="flex justify-between p-4 w-full">
        <p>
          Hello,
          <span className="ml-1 font-bold">{user?.email}</span>
          !
        </p>
        <div className="flex gap-1 items-center">
          <Button customColor="white" handler={() => navigate('/profile')}>
            Profile
          </Button>
          <Button customColor="white" handler={() => navigate('/notes')}>
            Notes
          </Button>
          <Button customColor="red" handler={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
      {children}
    </div>
  )
};


const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  removeUser: () => dispatch({ type: REMOVE_USER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavWrapper);
