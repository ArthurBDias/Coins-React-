import styles from '../styles/ProjectForm.module.css'

import {useState} from 'react'

import Input from '../../form/Input'
import SubmitButton from '../../form/SubmitButton'
import Message from '../../layout/Message'

function ServiceForm({btnText, handleSubmit, projectData}) {

    const [service, setService] = useState({})

    const [visibleMessage, setVisibleMessage] = useState(false)
    const [messageText, setMessageText] = useState('')

    function submit(e){
        e.preventDefault()
        setMessageText('')
        setVisibleMessage(false)
        console.log(service)


        if (service.name === undefined || service.name.length < 3 || service.name.length > 30) {
            setMessageText('O nome deve ter entre 3 e 30 caracteres')
            setVisibleMessage(true)
            return false
    
        }else if(service.cost < 0 || service.cost === undefined || service.cost === '' || service.cost > projectData.budget){
            setMessageText('Preencha o orçamento, com um valor a partir de 0')
            setVisibleMessage(true)
            return false
    
        }if (service.description === undefined || service.description.length < 5 || service.description.length > 80) {
            setMessageText('A descrição deve ter entre 5 e 80 caracteres')
            setVisibleMessage(true)
            return false
    
        }
    
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            
            <Input
            type="text"
            name="name"
            text="Name"
            placeholder="Name"
            handleOnChange={handleChange}/>

            <Input
            type="number"
            name="cost"
            text="Cost"
            placeholder="Cost"
            handleOnChange={handleChange}/>

            <Input
            type="text"
            name="description"
            text="Description"
            placeholder="Descripiton"
            handleOnChange={handleChange}/>

            <SubmitButton text={btnText}/>

            {visibleMessage && (
                <Message msg={messageText} type='error'/>
            )}

        </form>
    )
}

export default ServiceForm