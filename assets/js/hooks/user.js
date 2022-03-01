import { useSelector } from 'react-redux';

export function useIsConnected() {
  const user = useSelector(state => state.user);

  return user !== false;
}

export function useIsAdmin() {
  const admin = useSelector(state => state.admin);

  return admin !== false;
}