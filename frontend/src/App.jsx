import { Routes, Route, Link } from 'react-router-dom';
import Orders from './routes/Orders.jsx';
import Subscriptions from './routes/Subscriptions.jsx';
import BillingWidget from './components/BillingWidget.jsx';

export default function App() {
  return (
    <div className="app-root">
      <header className="topbar">
        <div className="container">
          <h1 className="brand">NANDIYAL POS Cockpit</h1>
          <nav className="nav">
            <Link to="/" className="nav-link">Orders</Link>
            <Link to="/subscriptions" className="nav-link">Subscriptions</Link>
          </nav>
          <BillingWidget />
        </div>
      </header>

      <main className="container content">
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">© NANDIYAL POS</div>
      </footer>
    </div>
  );
}
