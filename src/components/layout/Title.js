import styles from './styles/Title.module.css'

function Title({text, actions}) {

    return (
        <div className={styles.title_container}>
            <span className={styles.text_reavel}></span>

            <div className={styles.title}>
                <h1>{text}</h1>

                    {actions}
                
            </div>

            <hr/>
        </div>
    )
}

export default Title