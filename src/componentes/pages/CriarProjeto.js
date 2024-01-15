import { useNavigate } from 'react-router-dom'
import styles from './CriarProjeto.module.css'
import ProjetoForm from '../projeto/ProjetoForm'

function CriarProjeto(){

    const navigate = useNavigate()

    function criarPost(projeto){
        // inicializando custo e serviços
        projeto.cost = 0
        projeto.services = []

        fetch(`http://localhost:5000/projetos`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then(resp => resp.json())
        .then(data => {
            // redirect
            navigate('/projetos', {state: {message: 'Projeto criado com sucesso.'}})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.novoprojeto_container}>
            <h1> Criar Projeto </h1>
            <p> Crie seu projeto para depois adicionar os serviços.</p>
            <ProjetoForm handleSubmit={criarPost} btnText='Criar Projeto'/>
        </div>
    )
}

export default CriarProjeto