import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Message from '../layouts/Message'
import Container from '../layouts/Container'
import LinkButton from '../layouts/LinkButton'
import ProjetoCard from '../projeto/ProjetoCard'

import styles from './Projetos.module.css'
import Loading from '../layouts/Loading'

function Projetos(){

    const navigate = useNavigate()
    const [projetos, setProjetos] = useState([])
    const [loading, setLoading] = useState(false)
    const [justifyContent, setJustifyContent] = useState('start')
     
    // Coleta a messagem enviada (caso exista)
    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    // Handle para remover projeto
    function removeProjeto(id){
        fetch(`http://localhost:5000/projetos/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(() => {
            setProjetos(projetos.filter( projeto => projeto.id !== id))
            navigate('/projetos', {state: {message: 'Projeto excluido com sucesso.'}})
        })
    }

    // Renderiza os projetos
    useEffect(() => {
        setLoading(true)
        setTimeout( () => {
            fetch(`http://localhost:5000/projetos`,{
                method: 'GET',
                header:{
                    'Content-Type': 'application/json'
                }
            })
            .then( resp => resp.json())
            .then( data => {
                setProjetos(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
        }, 1500)
    }, [])

    
    // Responsividade da janela
    window.addEventListener('resize', () => {
        if(window.screen.width >= 1150){
            setJustifyContent('start')
        }else{
            setJustifyContent('center')
        }
    })
    

    return(
        
        <div className={styles.div_projetos}>
            <div className={styles.width_adjust}>

                <div className={styles.title_projeto}>
                    <h1> Projetos </h1>
                    <LinkButton to='/criar-projeto' text='Criar projeto' />
                </div>

                {message &&
                    (<Message msg={message} type='sucess'/>)
                }

                <Container customClass={`${justifyContent}`}>
                {loading ?
                        <Loading />
                            :
                        projetos.length > 0 ?
                            projetos.map((projeto) => (
                                <ProjetoCard
                                    id={projeto.id}
                                    nome={projeto.nomeProjeto}
                                    valor={projeto.orcamentoProjeto}
                                    categoria={projeto.categoria.name}
                                    key={projeto.id}
                                    handleRemove={removeProjeto}
                                />
                            ))
                            :
                            "Não há projetos"
                }
                
                </Container>
                
                    
            </div>
        </div>            

    )
}

export default Projetos