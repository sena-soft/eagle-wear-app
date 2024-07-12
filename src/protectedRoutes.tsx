import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from './store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
