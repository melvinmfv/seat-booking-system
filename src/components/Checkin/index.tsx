import { FC, memo, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useUser } from '@/context/UserContent';

const Checkin: FC<{}> = memo(({}) => {
  const param = useParams();
  const code = param?.code || null;
  const {userInfo} = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // redirect to login page
      navigate('/');
    }
  }, [userInfo, navigate]);

  

  return (
    <div>
      <h2>Checkin</h2>
      <p>Code: {code}</p>
    </div>
  );
});

export default Checkin;
