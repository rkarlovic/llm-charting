import {Link} from 'react-router-dom'

const TermsConds = () => (
    <div className = "auth-container">
        <div className="auth-box">
            <h1 className="title">Uvjeti korištenja</h1>
            <p>
                Ovdje idu uvjeti korištenja. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <Link to="/" className="terms-link">Natrag na registraciju</Link>

        </div>
    </div>
)

export default TermsConds;