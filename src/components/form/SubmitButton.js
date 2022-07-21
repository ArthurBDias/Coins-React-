import styles from './styles/SubmitButton.module.css'

function SubmitButton({text}){

    return (
        <div className={styles.btn_container}>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton