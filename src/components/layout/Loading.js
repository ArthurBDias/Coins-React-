import styles from './styles/Loading.module.css'

import load from '../../midia/loading.svg'

function Loading() {

    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={load} alt="Loading"/>
        </div>
    )
}

export default Loading