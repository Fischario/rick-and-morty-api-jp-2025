import './style.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <h1>Rick and Morty API</h1>
            <nav>
                <Link to={'/home'}>
                    <h2>Home</h2>
                </Link>
                <Link to={'/characters'}>
                    <h2>Characters</h2>
                </Link>
            </nav>
        </header>
    )
}