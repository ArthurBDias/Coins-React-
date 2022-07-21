import styles from './styles/NewProject.module.css'
import ProjectForm from '../projects/ProjectForm'

import {useNavigate} from 'react-router-dom'

function NewProject() {

    const navigate = useNavigate()

    //função que envia os dados do novo projeto ao servidor
    function createPost(projectData) {

    projectData.costs = 0
    projectData.services = []

    fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
    }).then((response) => response.json())
    .then((data) => {
        console.log(data)
        //redirect

        navigate('/projects', {state:{message: 'Project created successfully' }})

    })
    .catch((error) => {console.log(error)})
}

    return(
        <div className={styles.newProject_container}>
            <h1>Create Project</h1>

            <p>Create your project and then add the services</p>

            <ProjectForm Btntext="Create Project" handleSubmit={createPost}/>

        </div>

    )
}

export default NewProject