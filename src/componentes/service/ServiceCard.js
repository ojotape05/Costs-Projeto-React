import styles from './ServiceCard.module.css'

import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

function ServiceCard({id, name, cost, desc, handleRemove, handleEdit}){

    function formatReal(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }
    
    const edit = (e) => {
        e.preventDefault()
        handleEdit({id,name,cost,desc})
    }
    
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }
    
    return(
        <div className={styles.projeto_card}>
            <h4>{name}</h4>

            <p>
                <span>Custo:</span> {formatReal(parseFloat(cost))}
            </p>
            
            <p className={styles.categoria}>
                {desc}
            </p>

            <div className={styles.projeto_card_acoes}>
                <button onClick={edit}> <BsPencil /> Editar </button>
                <button onClick={remove}> <BsFillTrashFill /> Remover </button>
            </div>
        </div>
    )
}

export default ServiceCard