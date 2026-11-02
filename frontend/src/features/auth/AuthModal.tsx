import type { FormEvent } from 'react';
import { useState } from 'react';
import { loginUser, registerUser } from '../../services/authService';
import type { User } from '../../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
};

export function AuthModal({ isOpen, onClose, onSubmit }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!form.email || !form.password || (!isLogin && !form.name.trim())) {
      setError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = isLogin
        ? await loginUser(form.email, form.password)
        : await registerUser(form.name, form.email, form.password);

      const authenticatedUser: User = {
        ...response.user,
        token: response.token,
      };

      onSubmit(authenticatedUser);
      setForm({ name: '', email: '', password: '' });
      onClose();
    } catch (submissionError) {
      const message = submissionError instanceof Error ? submissionError.message : 'Authentication failed.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <div className="auth-header">
          <h3>{isLogin ? 'Welcome back' : 'Create an account'}</h3>
          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="auth-toggle">
          <button type="button" className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
            Login
          </button>
          <button type="button" className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <label>
              Full name
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="your@email.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="Enter password"
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="primary-btn auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : isLogin ? 'Login' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
