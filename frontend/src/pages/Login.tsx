import './Auth.css'

const Login = () => {
  return (
    <div className="auth-container">
        <div className="auth-box">
            <h1 className="title">Jur.ai</h1>
            <h2 className="subtitle">Prijava</h2>
            <input type="email" placeholder="e-mail adresa" />
            <input type="password" placeholder="lozinka" />
            <button>Prijava</button>
        </div>
    </div>
  )
}

export default Login;