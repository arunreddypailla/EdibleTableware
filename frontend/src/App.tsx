import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './features/auth/AuthModal';
import { CartPage } from './features/cart/CartPage';
import { CartProvider, useCart } from './features/cart/CartContext';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { ProductDetailPage } from './features/catalog/ProductDetailPage';
import { HomePage } from './features/home/HomePage';
import { clearSession, getCurrentUser, getStoredSession, saveSession } from './services/authService';
import type { User } from './types';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<User | null>(() => getStoredSession()?.user ?? null);
  const { recentMessage } = useCart();

  useEffect(() => {
    const session = getStoredSession();
    if (!session?.token) {
      return;
    }

    void getCurrentUser(session.token)
      .then((currentUser) => {
        setUser({ ...currentUser, token: session.token });
      })
      .catch(() => {
        clearSession();
        setUser(null);
      });
  }, []);

  return (
    <div className="app-shell">
      <Header onLoginClick={() => setShowAuthModal(true)} userName={user?.name} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/product/:id"
          element={<ProductDetailPage user={user} onLoginRequired={() => setShowAuthModal(true)} />}
        />
        <Route
          path="/cart"
          element={<CartPage user={user} onLoginRequired={() => setShowAuthModal(true)} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage user={user} onLoginRequired={() => setShowAuthModal(true)} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <div className={`cart-toast ${recentMessage ? 'visible' : ''}`} aria-live="polite">
        {recentMessage}
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSubmit={(loggedUser) => {
          setUser(loggedUser);
          if (loggedUser.token) {
            saveSession(loggedUser.token, loggedUser);
          }
          setShowAuthModal(false);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
