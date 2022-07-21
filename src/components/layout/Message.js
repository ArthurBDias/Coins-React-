import styles from './styles/Message.module.css'
import {useState, useEffect} from 'react'

function Message({type, msg}) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        
        if(!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])

    function removeMessage() {
        setVisible(false)
    }

    return (
        <>
        {visible && (
            <div className={styles.background_message}>
                <div className={`${styles.message} ${styles[type]}`}>
                    <p>{msg}</p>

                    <button onClick={removeMessage}>OK</button>
                </div>

            </div>
        )}
        </>
    )
}

export default Message