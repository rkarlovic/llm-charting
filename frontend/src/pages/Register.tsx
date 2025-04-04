import { useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showError, setShowError] = useState(false);
    const [firstEmptyField, setFirstEmptyField] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameRef = useRef<HTMLInputElement>(null);
    const surnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const validateEmail = (email: string) =>{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const handleRegister = () => {
        if(!name.trim()){
            setFirstEmptyField('name');
            nameRef.current?.focus();
            setShowError(true);
            return;
        }
        if(!surname.trim()){
            setFirstEmptyField('surname');
            surnameRef.current?.focus();
            setShowError(true);
            return;
        }
        if(!email.trim() || !validateEmail(email)){
            setFirstEmptyField('email');
            emailRef.current?.focus();
            setShowError(true);
            return;
        }
        if(!password || password.length < 6){
            setFirstEmptyField('password');
            passwordRef.current?.focus();
            setShowError(true);
            return;
        }

        setFirstEmptyField(null);
        setShowError(false);
    }

    const clearErrorWhenTyped = (field: string, value: string) => {
        if (showError && field !== 'email' && field !== 'password') {
            setShowError(false);
    }

    switch(field){
        case 'name':
            setName(value);
            break;
        case 'surname':
            setSurname(value);
            break;
        case 'email':
            setEmail(value);
            break;
        case 'password':
            setPassword(value);
            break;
        default:
            break;
    }
}

  return (
    <div className="auth-container">
        <div className="auth-box">
            <div className="logos-wrapper">
                <img className="logo"
                src="/puni-logo.png"
                alt="Sveučilište Jurja Dobrile u Puli, Fakultet informatike"
                />
            </div>
            <h1 className="title">Jur.ai</h1>
            <h2 className="subtitle">Registracija</h2>
            
            { showError && (
                <div className="error-popup">
                    Nisu ispunjena sva polja za registraciju.
                </div>
                )
            }
            
            <input type="text" 
                placeholder="ime*" 
                value ={name} 
                onChange={(e) => clearErrorWhenTyped('name', e.target.value)} 
                ref={nameRef} 
                className={firstEmptyField === 'name' ? 'input-error': ''} />
            {firstEmptyField === 'name' && (<div className="error-message">*Ovo polje je obavezno</div>)}
            <input type="text" 
                placeholder="prezime*" 
                value ={surname} 
                onChange={(e) => clearErrorWhenTyped('surname', e.target.value)} 
                ref={surnameRef} 
                className={firstEmptyField === 'surname' ? 'input-error': ''} />
            {firstEmptyField ==='surname' && (<div className="error-message">*Ovo polje je obavezno</div>)}
            <input type="email" 
                placeholder="e-mail adresa*" 
                value ={email} 
                onChange={(e) => clearErrorWhenTyped('email', e.target.value)} 
                ref={emailRef} 
                className={firstEmptyField === 'email' ? 'input-error': ''}   />
            {firstEmptyField === 'email' && (<div className="error-message">{!email.trim() ? '*Ovo polje je obavezno' : 'Email nije ispravan.'}</div>)}
            <input type="password" 
                placeholder="lozinka*" 
                value ={password} 
                onChange={(e) => clearErrorWhenTyped('password',e.target.value)} 
                ref={passwordRef} 
                className={firstEmptyField === 'password' ? 'input-error': ''} />
            {firstEmptyField === 'password' && (<div className="error-message">{!password ? '*Ovo polje je obavezno': 'Lozinka mora imati bar 6 znakova.'}</div>)}

            <label className="checkbox-container">
                <input 
                type="checkbox" 
                checked={termsAccepted} 
                onChange={() => setTermsAccepted(!termsAccepted)} 
                />
                <span className="custom-checkmark"></span>
                    <span className="checkbox-label">Prihvaćam Jur.ai {' '}
                    <Link to="/terms" className="terms-link"><b>uvjete korištenja</b></Link>
                    </span>
            </label>

            <button disabled = {!termsAccepted} 
            className={`register-button ${termsAccepted ? 'active' : 'disabled'}`}
            onClick = {handleRegister}
            >Registracija
            </button>
        </div>
    </div>
  )
}

export default Register;