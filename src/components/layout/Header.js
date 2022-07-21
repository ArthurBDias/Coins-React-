import {Link} from 'react-router-dom'
import styles from './styles/Header.module.css'
import logo from '../../midia/costs_logo.png'
import Container from './Container'

function Header() {

    return (
            <nav className={styles.navbar}>
                <Container customClass="maxWidth">
                    <Link to="/">
                        <img className={styles.logo} src={logo} alt="Logo"/>
                    </Link>

                    <ul className={styles.list}>
                        <li><Link className={styles.item} to="/">Home</Link></li>
                        <li><Link className={styles.item} to="/projects">Projects</Link></li>
                        <li><Link className={styles.item} to="/conmpany">Company</Link></li>
                        <li><Link className={styles.item} to="/contact">Contact</Link></li>
                    </ul>
                </Container>
            </nav>
      
    )
}

export default Header