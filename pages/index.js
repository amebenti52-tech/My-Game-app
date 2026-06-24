import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState(null);
  const [gameStatus, setGameStatus] = useState('Waiting...');
  const [winningNumber, setWinningNumber] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db) return;

    try {
      const q = query(collection(db, 'game'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id === 'current') {
            setGameStatus(doc.data()?.drawStatus || 'Waiting...');
            setWinningNumber(doc.data()?.winningNumber || null);
          }
        });
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error listening to game:', error);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('✅ Logged in successfully');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage('❌ ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMessage('Logged out');
  };

  return (
    <div className="container">
      <h1>🎰 Mini Bingo Game</h1>

      {!user ? (
        <div className="auth-section">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      ) : (
        <div className="user-section">
          <p>👤 Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div className="game-section">
        <h2>Game Status</h2>
        <div className="status-box">
          <p><strong>Status:</strong> {gameStatus}</p>
          <p><strong>Winning Number:</strong> {winningNumber || 'Waiting...'}</p>
        </div>
      </div>
    </div>
  );
}