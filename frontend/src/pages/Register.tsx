import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="auth-container">
        <div className="auth-box">
            <div className="logos-wrapper">
                <img
            className="logo"
            src="/puni-logo.png"
            alt="Sveučilište Jurja Dobrile u Puli, Fakultet informatike"
                />
            </div>
            <h1 className="title">Jur.ai</h1>
            <h2 className="subtitle">Registracija</h2>
            <input type="text" placeholder="ime" />
            <input type="text" placeholder="prezime" />
            <input type="email" placeholder="e-mail adresa" />
            <input type="password" placeholder="lozinka" />

            <label className="checkbox-container">
                <input 
                type="checkbox" 
                checked={termsAccepted} 
                onChange={() => setTermsAccepted(!termsAccepted)} 
                />
                <span className="custom-checkmark"></span>
                    <span className="checkbox-label">Prihvaćam Jur.ai {' '}
                    <Link to="/terms" 
                    className="terms-link"><b>uvjete korištenja</b>
                    </Link>
                    </span>
            </label>

            <button disabled = {!termsAccepted} className={`register-button ${termsAccepted ? 'active' : 'disabled'}`}>Registracija</button>
        </div>
    </div>
  )
}

export default Register;