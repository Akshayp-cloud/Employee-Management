import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const toast = document.querySelector('.toast');
      if (toast) {
        toast.classList.add('toast-hide');
      }
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === 'success' ? (
          <i className="fas fa-check-circle"></i>
        ) : (
          <i className="fas fa-exclamation-circle"></i>
        )}
      </div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;