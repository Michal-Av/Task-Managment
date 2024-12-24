import React from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import Logo from '../../../assets/images/logo/3.png';
import './Header.css';
import { logout } from '../../../services/api-auth';

interface HeaderProps {
  username?: string; // Making the username prop optional
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User has logged out');
      navigate("/login");
    } catch (error) {
      console.log('User has not logged out');
    }
  };

  return (
    <nav>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="user-info">
        <span>Welcome {username}</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Header;
