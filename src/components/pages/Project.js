import styles from './styles/Project.module.css'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../projects/services/ServiceForm'
import ServiceCard from '../projects/services/ServiceCard'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {parse, v4 as uuidv4} from 'uuid'

function Project() {

    const {id} = useParams()

    const [project, setProject] = useState([])

    const [messageText, setMessageText] = useState()
    const [messageType, setMessageType] = useState()

    const [services, setServices] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((data) =>{
            setProject(data)
            setServices(data.services)
        })
        .catch((error) => {console.log(error)})
        }, 300)
    }, [id])

    function editPost(project) {
        
        setMessageText('')

        if (project.budget < project.costs){
            setMessageText('The budget cannot be less than the costs')
            setMessageType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(project)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
            setMessageText('Project successfully changed')
            setMessageType('sucess')
        })
        .catch((error) => {console.log(error)})
    }

    function createService(project) {

        setMessageText('')

        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost[0])

        //atialize cost
        project.costs = newCost

        //ataualize databank

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(project)
        }).then((response) => response.json())
        .then((data) => {
            //exibir serviços
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessageType('sucess')
            setMessageText('Criado com sucesso')
        })
        .catch((error) => {console.log(error)});
    }

    function removeService(id, cost) {
        const newServices = project.services.filter((service) => service.id !== id)

        const projectUpdated = project

        projectUpdated.services = newServices
        projectUpdated.costs = parseFloat(project.costs) - parseFloat(cost)

        console.log(projectUpdated)

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(projectUpdated)
        })
        .then((response) => response.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(newServices)
            setMessageText('Projeto removido com sucesso')
        })
        .catch(error => {console.log(error)})
    }

    const [showProjectForm, setShowProjectForm] = useState(false)

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    const [showServiceForm, setShowServiceForm] = useState(false)

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    return(
        <div className={styles.project_container}>
        {project.name ? (
            <div className={styles.project_details}>

                {messageText && (
                    <Message msg={messageText} type={messageType}/>
                )}
                
                <Container customClass="column">
                <h1>Projeto: {project.name}</h1>
                    <div className={styles.details_container}>

                        <h2>Details of project</h2>

                        <button onClick={toogleProjectForm} className={styles.btn}>
                            {!showProjectForm ? 'Edit project' : 'Return'}
                        </button>

                        {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Category:</span> {project.category.name}
                            </p>

                            <p>
                                <span>Total budget</span> U${project.budget}
                            </p>

                            <p>
                                <span>Total used</span> U${project.costs}
                            </p>
                        </div>)

                        :(<div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} Btntext="Seve edit" projectData={project}/>
                        </div>
                        )}
                    </div>

                    <div className={styles.service_form_container}>
                        <h2>Add Service</h2>

                        <button onClick={toogleServiceForm} className={styles.btn}>
                            {!showServiceForm ? 'New Service' : 'Return'}
                        </button>

                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                handleSubmit={createService}
                                btnText="Add service"
                                projectData={project}/>
                            )}
                        </div>
                    </div>

                    <h2>Serviços</h2>

                    <Container customClass="around">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <ServiceCard
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                                />
                            ))
                        ):(
                            <p>Não há serviços</p>
                        )}
                    </Container>
                </Container>
            </div>
        )
        : <Loading/>}
        </div>
    )
}

export default Project