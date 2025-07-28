import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  if (!user || Object.keys(user).length === 0)
    return <Navigate to="/signin" replace />;
  
  return children;
}
