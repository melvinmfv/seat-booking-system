import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

const Checkin: FC<{}> = memo(({}) => {
  const param = useParams();
  const code = param?.code || null;

  return (
    <div>
      <h2>Checkin</h2>
      <p>Code: {code}</p>
    </div>
  );
});

export default Checkin;
