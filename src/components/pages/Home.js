import styles from './styles/Home.module.css';
import LinkButton from '../layout/LinkButton';
import logo from '../../midia/saving.svg'

function Home() {

    return(
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>Coins</span></h1>

            <p>Comece a gerenciar seus projetos, de forma facil e rapida agora mesmo!</p>

            <LinkButton to="/newproject" text="Create a new project"/>

            <img src={logo} alt="" />
        </section>
    )
}

export default Home