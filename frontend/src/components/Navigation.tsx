import React from 'react';
import './Navigation.css';

interface NavigationProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeView = 'weekly',
  onViewChange
}) => {
  const handleViewClick = (view: string) => {
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <div className="navigation">
      <div className="navigation-header">
        <div className="navigation-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="#312785" />
            </svg>
            <div className="logo-notification">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="#4CAF50" />
              </svg>
            </div>
          </div>
          <div className="logo-text">
            <h2>Aurora</h2>
            <p>Planificador IA</p>
          </div>
        </div>
      </div>

      <nav className="navigation-menu">
        <button
          className={`nav-button ${activeView === 'weekly' ? 'active' : ''}`}
          onClick={() => handleViewClick('weekly')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3h12v10H2V3z M3 4v8h10V4H3z M5 6h6v1H5V6z M5 8h6v1H5V8z" fill="currentColor" />
          </svg>
          <div className="nav-text">
            <span className="nav-title">Vista Semanal</span>
            <span className="nav-subtitle">Calendario semanal</span>
          </div>
        </button>

        <button
          className={`nav-button ${activeView === 'monthly' ? 'active' : ''}`}
          onClick={() => handleViewClick('monthly')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2h10v12H3V2z M4 3v10h8V3H4z M5 5h6v1H5V5z M5 7h6v1H5V7z M5 9h6v1H5V9z" fill="currentColor" />
          </svg>
          <div className="nav-text">
            <span className="nav-title">Vista Mensual</span>
            <span className="nav-subtitle">Calendario mensual</span>
          </div>
        </button>

        <button
          className={`nav-button ${activeView === 'wellness' ? 'active' : ''}`}
          onClick={() => handleViewClick('wellness')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2L9.5 6.5L14 6.5L10.5 9.5L12 14L8 11L4 14L5.5 9.5L2 6.5L6.5 6.5L8 2Z" fill="currentColor" />
          </svg>
          <div className="nav-text">
            <span className="nav-title">Bienestar</span>
            <span className="nav-subtitle">Dashboard de bienestar</span>
          </div>
        </button>

        <button
          className={`nav-button ${activeView === 'assistant' ? 'active' : ''}`}
          onClick={() => handleViewClick('assistant')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1C4.686 1 2 3.686 2 7c0 1.5.5 2.9 1.4 4.1L2 15l3.9-1.4C6.9 14.5 7.4 15 8 15c3.314 0 6-2.686 6-6S11.314 1 8 1z" fill="currentColor" />
          </svg>
          <div className="nav-text">
            <span className="nav-title">Asistente IA</span>
            <span className="nav-subtitle">Chat conversacional</span>
          </div>
        </button>

        <button
          className={`nav-button ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => handleViewClick('settings')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5a3 3 0 100 6 3 3 0 000-6zM6.5 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" fill="currentColor" />
            <path fillRule="evenodd" d="M6.5 2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1.086l.943.464a.5.5 0 01.235.664l-.5 1a.5.5 0 01-.664.235L8.5 5.086V6.5a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V5.086l-1.019.363a.5.5 0 01-.664-.235l-.5-1a.5.5 0 01.235-.664L5.5 3.086V2z" fill="currentColor" />
          </svg>
          <div className="nav-text">
            <span className="nav-title">Configuración</span>
            <span className="nav-subtitle">Perfil y preferencias</span>
          </div>
        </button>
      </nav>

      <div className="navigation-footer">
        <button className="dark-mode-toggle">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12a4 4 0 100-8 4 4 0 000 8z" fill="currentColor" />
          </svg>
          <span>Modo Oscuro</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;