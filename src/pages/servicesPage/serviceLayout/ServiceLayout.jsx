import { Outlet } from 'react-router-dom';
import './serviceLayout.scss';

const ServiceLayout = () => {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ServiceLayout