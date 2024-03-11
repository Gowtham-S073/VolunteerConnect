import Sidenav from './sidebar';
import Safety from './SafetyTips';
import Requests from './ShowRequest'; 
import { ApiContext } from './Context/ApiContext';
import { useContext } from 'react';

const File = () => {
  const { safe, request, setRequestNot, setSafe } = useContext(ApiContext);

  return (
    <>
      <div>
        <div>
          <Sidenav />
        </div>
        <div>
          {safe ? <Safety /> : null}
          {request ? <Requests /> : null}
        </div>
      </div>
    </>
  );
};

export default File;
