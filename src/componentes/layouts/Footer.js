import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './Footer.module.css'

function Footer(){
    return(
        <footer className={styles.footer}>
            <div>
                Costs &copy; <span> by Jean Pissineli </span>
                <ul className={styles.list}>
                    <li> <FaFacebook /> </li>
                    <li> <FaInstagram /> </li>
                    <li> <FaLinkedin /> </li>
                </ul>
            </div>
           
        </footer>
    )
}

export default Footer