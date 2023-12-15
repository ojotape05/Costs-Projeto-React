import {Link} from 'react-router-dom'
import styles from './Header.module.css'

function Header(){
    return(
        // #0f0f6d
        <header className={styles.header}>

            <h3> Costs </h3>

            <ul>
                <li> <Link to='/'> Home </Link> </li>
                <li> <Link to='/contato'> Contato </Link> </li>
                <li> <Link to='/projetos'> Projetos </Link> </li>
            </ul>
        </header>
    )
}

export default Header