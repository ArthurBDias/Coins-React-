import styles from './styles/Projects.module.css'

import Title from '../layout/Title'
import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import ProjectCard from '../projects/ProjectCard'

import Loading from '../layout/Loading'
import Message from '../layout/Message'

import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {BiSearchAlt} from 'react-icons/bi'


function Projects() {

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    const [visibleLoading, setVisibleLoading] = useState(true)

    const [projects, setProjects] = useState([])

    const [search, setSearch] = useState('')
    
    useEffect(() => {

            setTimeout(() => {
                fetch("http://localhost:5000/projects", {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then((response) => response.json())
            .then((data) => {
                setProjects(data)
                setVisibleLoading(false)
            }).catch((err) => { console.log(err)})
            }, 300)
        
    }, [])
        

    const [removeMessage, setRemoveMessage] = useState('')

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application'}
        }).then((response) => response.json())
        .then((data) => {
            setProjects(projects.filter(project => project.id !== id))
            setRemoveMessage('Project removed successfully')
        })


    }

    const filterProjects = projects.filter(({name}) => name.toLocaleLowerCase().includes(search))
    console.log(filterProjects)
  
    
    return(
        <div className={styles.project_container}>
        
                <Title text="My Projects" actions={
                    <div className={styles.actions}>
                    
                            <LinkButton 
                            to="/newproject" 
                            text="Create a new project" 
                            className={styles.actions_children}/>

                            <input 
                            type="text" 
                            placeholder="search" 
                            className={styles.actions_children}
                            onChange={(e) => {setSearch(e.target.value.toLocaleLowerCase())}} 
                            value={search}
                            />

                            <span><BiSearchAlt/></span>

                        
                    </div>
                }/>

                
        {message && (
             <Message msg={message}  type ="sucess"/>
        )}

        {removeMessage && (
             <Message msg={removeMessage}  type ="sucess"/>
        )}

        <Container customClass={"around"}>
            {filterProjects.length > 0 && 
                filterProjects.map((project) => 
                <ProjectCard id={project.id}  name={project.name} budget={project.budget} category={project.category.name} key={project.id} hanleRemove={removeProject}/> )
            }
            
        </Container>

        {visibleLoading && (
            <Loading/>
        )}

        {!visibleLoading && projects.length === 0 && (
            <h2>Não há Projetos</h2>
        )}
        </div>
    )
}

export default Projects