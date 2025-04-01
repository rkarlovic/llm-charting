import './Auth.css';

const Register = () => {
  return (
    <div className="auth-container">
        <div className="auth-box">
            <h1 className="title">Jur.ai</h1>
            <h2 className="subtitle">Registracija</h2>
            <input type="text" placeholder="ime" />
            <input type="text" placeholder="prezime" />
            <input type="email" placeholder="e-mail adresa" />
            <input type="password" placeholder="lozinka" />
            <button>Registracija</button>
        </div>
    </div>
  )
}

export default Register;