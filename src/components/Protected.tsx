import { Navigate } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext()
  if (!user) {
    return <Navigate to="/" />
  }

  return children
}
