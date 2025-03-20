import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('userId'));

  useEffect(() => {
    const checkAuthentication = () => {
      const id = localStorage.getItem('userId');
      setIsAuthenticated(!!id);
    };

    // Lắng nghe thay đổi từ localStorage để cập nhật trạng thái đăng nhập
    window.addEventListener('storage', checkAuthentication);
    checkAuthentication();

    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
  }, []);

  const login = (id) => {
    localStorage.setItem('userId', id); // Lưu id vào localStorage
    setIsAuthenticated(true);
  };
  const signUp = (id) => {
    localStorage.setItem('userId', id); // Lưu id vào localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userId'); // Xóa id khỏi localStorage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login,signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
