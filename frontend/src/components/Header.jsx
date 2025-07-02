import UserNavigation from './user/Navigation';
import GuestNavigation from './guest/Navigation';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { token } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-50  shadow-md">
      <div className="w-full mx-auto flex">
        {token ? 
        <UserNavigation /> 
        : <GuestNavigation />}
      </div>
    </header>
  );
}

export default Header;