import styles from './Contato.module.css'

import Container from '../layouts/Container'

import { RiCellphoneFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

function Contato(){
    return(
        <Container customClass='center'>
            <div className={styles.div_contact}>
                <h3> Jean P. B. Pissineli</h3>

                <div className={styles.info_div}>
                    <div>
                        <RiCellphoneFill/>
                        <p>+55 27 99795-2590</p>
                    </div>
                    <div>
                        <MdEmail/>
                        <p>jpbpissineli05@gmail.com</p>
                    </div>
                </div>
                
            </div>
        </Container>
    )
}

export default Contato