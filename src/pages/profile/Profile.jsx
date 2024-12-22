import { useNavigate } from 'react-router-dom';
import NavWrapper from "./NavWrapper";
import Button from '../../components/Button';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <NavWrapper>
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">About Me</h1>
        <p className="mb-2 w-full">Email: example@example.com</p>
        <p className="mb-4 w-full">Date: November 19, 2024</p>
        <Button handler={() => navigate('/notes')}>
          Go to Notes
        </Button>
      </div>
    </NavWrapper>
  )
};

export default Profile;