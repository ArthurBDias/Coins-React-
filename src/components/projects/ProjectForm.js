import styles from './styles/ProjectForm.module.css'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import Input from '../form/Input'
import Message from '../layout/Message'



import {useState, useEffect, useContext} from 'react'

function ProjectForm({Btntext, handleSubmit, projectData}) {

    var [categories, setCategories] = useState([])

    const [visibleMessage, setVisibleMessage] = useState(false)
    const [messageText, setMessageText] = useState('')

    //função responsavel por renderizar as categorias do select
    useEffect(() =>{
    fetch('http://localhost:5000/categories', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    })
    .then( (response) => response.json())
    .then((data) => {setCategories(data)})
    .catch((error) => {console.error(`Erro encontrado : ${error}`)})
   }, [])

   //funções responsaveis pela envio dos dados a criação de um novo formulario

   const [project, setProject] = useState(projectData || {})
   
   const submit = (e) =>{
    e.preventDefault(); 

    if (project.name === undefined || project.name.length < 3 || project.name.length > 30) {
        setMessageText('O nome deve ter entre 3 e 30 caracteres')
        setVisibleMessage(true)
        return false

    }else if(project.budget < 0 || project.budget === undefined || project.budget === '') {
        setMessageText('Preencha o orçamento, com um valor a partir de 0')
        setVisibleMessage(true)
        return false

    }else if(!project.category || project.category.id.length > 1){
        setMessageText('escolha uma categoria')
        setVisibleMessage(true)
        return false
    }

    handleSubmit(project)

   }

   const handleChange = (e) => {
    setProject({...project, [e.target.name]: e.target.value})
   }

   const handleSelect = (e) => {
    setProject({...project, category: {
        id:e.target.value,
        name: e.target.options[e.target.selectedIndex].text
    }})
   }
   

    return(
        <form onSubmit={submit} className={styles.form}>

            <Input
            type="text"
            name="name"
            text="Project name"
            placeholder="Enter the project name"
            handleOnChange={handleChange}
            value={project.name}/>

            <Input
            type="number"
            name="budget"
            text="Project budget"
            placeholder="Enter the total project budget"
            handleOnChange={handleChange}
            value={project.budget}/>

            <Select 
            name="id_category" 
            text="Select a categoty" 
            options={categories}
            value = {project.category ? project.category.id: ''}
            handleOnChange={handleSelect}/> 

            <SubmitButton text={Btntext}/>

            {visibleMessage && (
            <Message msg={messageText}  type ="error"/>
            )}
        </form>
    )
}

export default ProjectForm










// Problema da mensagem não se repitir para resolver