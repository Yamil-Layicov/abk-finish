import { Navigate } from 'react-router-dom'
import {useAuth2} from '../context/AuthContext2'

const PrivateRoute = ({children}) => {


  const {user2} = useAuth2()

  if(!user2){
    return <Navigate to="/account" />;
  }
  
  return children
}

export default PrivateRoute