import { useState } from 'react';
import AdminLogin from './components/AdminLogin/AdminLogin';
import Signup from './components/Signup/Signup';
import type { LoginFormData } from './components/AdminLogin/AdminLogin.types';
import type { SignupFormData } from './components/Signup/Signup.types';

import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import type { ForgotPasswordFormData } from './components/ForgotPassword/ForgotPassword.types';

import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'forgot-password' | 'dashboard'>('login');

  const handleLogin = (formData: LoginFormData) => {
    console.log('Login submitted:', formData);
    setCurrentPage('dashboard');
  };

  const handleSignup = (formData: SignupFormData) => {
    console.log('Signup submitted:', formData);
    // Add your signup logic here
  };

  const handleForgotPassword = (formData: ForgotPasswordFormData) => {
    console.log('Forgot password request:', formData);
    // Add your logic here
  };

  const navigateToLogin = () => setCurrentPage('login');
  const navigateToSignup = () => setCurrentPage('signup');
  const navigateToForgotPassword = () => setCurrentPage('forgot-password');

  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }

  if (currentPage === 'signup') {
    return <Signup onSubmit={handleSignup} onNavigateToLogin={navigateToLogin} />;
  }

  if (currentPage === 'forgot-password') {
    return <ForgotPassword onSubmit={handleForgotPassword} onNavigateToLogin={navigateToLogin} />;
  }

  return (
    <AdminLogin
      onSubmit={handleLogin}
      onNavigateToSignup={navigateToSignup}
      onNavigateToForgotPassword={navigateToForgotPassword}
    />
  );
}



export default App;


