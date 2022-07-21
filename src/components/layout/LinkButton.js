import styles from './styles/LinkButton.module.css'
import { Link } from "react-router-dom";

function LinkButton(props) {

    return <Link className={`${styles.button} ${styles[props.className]}`} to={props.to}>{props.text}</Link>;
}

export default LinkButton;