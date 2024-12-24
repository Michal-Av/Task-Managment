import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../services/api-auth';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Containers/Form/Form';
import { useTranslation } from 'react-i18next';
import '../styles/Login.css';
import LanguageSelector from '../components/UIElements/Select/LanguageSelector';

interface ResetPasswordPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword: React.FC<ResetPasswordPageProps> = ({ setLoggedIn }) => {
  const { token } = useParams<Record<string, string>>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const passFields = [
    { label: t('Password :'), type: 'password', name: 'password', placeholder: '' },
    { label: t('Confirm Password :'), type: 'password', name: 'newpassword', placeholder: '' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = async (formData: { password: string; newpassword: string }) => {
    if (formData.password !== formData.newpassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!token) {
      setMessage('Token is missing');
      return;
    }

    try {
      await resetPassword(token, formData.newpassword);
      setResetSuccess(true);
      setMessage('Password reset successfully');
      navigate('/login');
    } catch (error) {
      setMessage('An error occurred while resetting the password');
    }
  };

  if (resetSuccess) {
    return (
      <div>
        <h2>Password Reset Successful</h2>
        <p>Your password has been successfully reset.</p>
      </div>
    );
  }

  return (
    <div className="lang-con">
      <LanguageSelector onLanguageChange={i18n.changeLanguage} />
      <div className="center-box">
        <Form
          onSubmit={handleSubmit}
          message={message}
          fields={passFields}
          buttonText={t('reset')}
          actionText={t('Reset Password')}
          onActionClick={() => {}}
          onForgotClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
