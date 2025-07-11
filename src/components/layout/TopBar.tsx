
import React, { useState } from 'react';
import { useTranslation } from '../../i18n/index';
import { useAuth } from '../../contexts/AuthContext';

const TopBar: React.FC = () => {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  return (
    <div className="topbar">
      <div className="search-container">
        <input type="text" placeholder={t('search')} className="search-input" />
      </div>
      
      <div className="topbar-right">
        <div className="language-selector">
          <button 
            className={`lang-btn ${currentLanguage === 'fr' ? 'active' : ''}`} 
            onClick={() => handleLanguageChange('fr')}
          >
            FR
          </button>
          <button 
            className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`} 
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </button>
        </div>
        
        <div className="profile-container">
          <button className="profile-btn" onClick={toggleProfileMenu}>
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="profile-img" 
            />
            <span className="profile-name">{user?.name || 'Utilisateur'}</span>
          </button>
          
          {showProfileMenu && (
            <div className="profile-menu">
              <ul>
                <li><a href="/profile">{t('profile')}</a></li>
                <li><a href="/settings">{t('settings')}</a></li>
                <li><button onClick={logout}>{t('logout')}</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .topbar {
          height: 60px;
          background-color: #ffffff;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          position: fixed;
          top: 0;
          right: 0;
          left: 250px;
          z-index: 99;
        }
        
        .search-container {
          flex: 1;
          max-width: 400px;
        }
        
        .search-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .topbar-right {
          display: flex;
          align-items: center;
        }
        
        .language-selector {
          margin-right: 20px;
          display: flex;
          gap: 5px;
        }
        
        .lang-btn {
          background: none;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        
        .lang-btn.active {
          background-color: #1a1a2e;
          color: white;
        }
        
        .profile-container {
          position: relative;
        }
        
        .profile-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 5px;
        }
        
        .profile-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        
        .profile-name {
          font-size: 0.9rem;
        }
        
        .profile-menu {
          position: absolute;
          top: 50px;
          right: 0;
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 150px;
          z-index: 100;
        }
        
        .profile-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .profile-menu li {
          padding: 10px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .profile-menu li:last-child {
          border-bottom: none;
        }
        
        .profile-menu a, .profile-menu button {
          text-decoration: none;
          color: #333;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0;
        }
        
        .profile-menu a:hover, .profile-menu button:hover {
          color: #1a1a2e;
        }
      `}</style>
    </div>
  );
};

export default TopBar;