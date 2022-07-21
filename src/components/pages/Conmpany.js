import styles from './styles/Conmpany.module.css'
import Container from '../layout/Container'
import imageCompany from '../../midia/Company.png'
import LinkButton from '../layout/LinkButton'

import Title from '../layout/Title'


function Conmpany() {

    return(
        <div className={styles.box}>
            <Title text="Company"/>

            <Container customClass='align_center'>
                <img src={imageCompany} alt="company" className={styles.align_childrens}/>
                <p className={styles.align_childrens}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere voluptatum beatae veritatis atque commodi provident,
                    cumque asperiores aliquam, tempore a fuga molestias delectus ut explicabo neque mollitia ea recusandae quos nulla aut corrupti!
                    Nemo ut hic fugit animi perspiciatis iure deleniti odio accusantium obcaecati? Veniam quidem blanditiis saepe dicta modi.

                    <LinkButton to="/contact"
                     text="entre em contato"
                      className="position"/>

                </p>
            </Container>
        </div>
    )
}

export default Conmpany