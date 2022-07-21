import styles from './styles/Conmpany.module.css'

import Title from '../layout/Title'
import Container from '../layout/Container'
import imageCompany from '../../midia/Contact.png'

function Contact() {

    return(
        <div className={styles.box}>
            <Title text="Contact"/>

            <Container customClass='align_center'>
                <img src={imageCompany} alt="company" className={styles.align_childrens}/>
                <p className={styles.align_childrens}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatum beatae veritatis atque commodi provident,
                    cumque asperiores aliquam, tempore a fuga molestias delectus ut explicabo neque mollitia ea recusandae quos nulla aut corrupti!
                    Nemo ut hic fugit animi perspiciatis iure deleniti odio accusantium obcaecati? Veniam quidem blanditiis saepe dicta modi.

                </p>
            </Container>
        </div>
    )
}

export default Contact