
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{t('login')}</h1>
          <p>Connectez-vous à votre compte pour accéder à votre tableau de bord</p>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">{t('email')}</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">{t('password')}</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group text-right">
            <Link to="/forgot-password" className="forgot-password">
              {t('forgotPassword')}
            </Link>
          </div>
          
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Connexion en cours...' : t('signIn')}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {t('dontHaveAccount')} <Link to="/register">{t('signUp')}</Link>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          padding: 20px;
        }
        
        .auth-container {
          width: 100%;
          max-width: 400px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .auth-header h1 {
          color: #1a1a2e;
          margin-bottom: 10px;
        }
        
        .auth-header p {
          color: #6c757d;
          margin: 0;
        }
        
        .auth-form {
          margin-bottom: 20px;
        }
        
        .forgot-password {
          font-size: 0.9rem;
          color: #1a1a2e;
        }
        
        .auth-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 0.9rem;
        }
        
        .auth-footer a {
          color: #1a1a2e;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Login;