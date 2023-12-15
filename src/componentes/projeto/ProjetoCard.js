import styles from './ProjetoCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function ProjetoCard({id, nome, valor, categoria, handleRemove}){

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return(
        <div className={styles.projeto_card}>
            <h4>{nome}</h4>

            <p>
                <span>Orçamento:</span> R${valor}
            </p>
            
            <p className={styles.categoria}>
                <span className={`${styles[categoria.toLowerCase()]}`}></span> {categoria}
            </p>

            <div className={styles.projeto_card_acoes}>
                <Link to={`/projeto/${id}`}> <BsPencil /> Editar </Link>
                <button onClick={remove}> <BsFillTrashFill /> Remover </button>
            </div>
        </div>
    )
}

export default ProjetoCard