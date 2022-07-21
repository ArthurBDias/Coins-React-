import styles from './styles/ProjectCard.module.css'

import {Link} from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'

function ProjectCard({id, name, budget, category, hanleRemove}) {

    function remove(e) {
        e.preventDefault()
        hanleRemove(id)
    }

    return(
        <div className={styles.project_card}>
            <h4>{name}</h4>

            <p> <span>Budget:</span> U${budget}</p>

            <p className={styles.category_text}> <span className={`${styles[category.toLowerCase()]}`}></span> {category}</p>

            <div className={styles.project_card_actions}>

                <Link to={`/project/${id}`}>
                    <BsPencil/>
                </Link>

                <button onClick={remove}>
                    <BsFillTrashFill/>
                </button>
            </div>

        </div>
    )
}

export default ProjectCard