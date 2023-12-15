import styles from './Projeto.module.css'

import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

import Loading from '../layouts/Loading'
import SubmitButton from '../form/SubmitButton'
import Container from '../layouts/Container'
import ProjetoForm from '../projeto/ProjetoForm'
import Message from '../layouts/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Projeto(){

    const { id } = useParams()

    const [projeto, setProjeto] = useState({})

    const [projetoButtonText, setProjetoButtonText] = useState('Editar Projeto')
    const [showEdit, setShowEdit] = useState(false)

    const [serviceButtonText, setServiceButtonText] = useState('Adicionar')
    const [showService, setShowService] = useState(false)
    const [serviceToEdit, setServiceToEdit] = useState({})
    const [showEditService, setShowEditService] = useState(false)

    const [message, setMessage] = useState('')
    const [type, setType] = useState('')  

    useEffect(() => {
        setTimeout( () =>{
            fetch(`http://32.30.14.74:5000/projetos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setProjeto(data)
                })
                .catch(err => console.log(err))
        }, 1000)
        
    },[id])

    function formatReal(value){
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2});
    }

    function showDescricao(){
        setShowEdit(!showEdit)
        setProjetoButtonText(showEdit ? 'Editar' : 'Detalhes')
    }

    function showServices(){
        setShowService(!showService)
        setServiceButtonText(showService ? 'Adicionar' : 'Listar')
        setServiceToEdit({})
        setShowEditService(false)
    }

    function editPost(projeto){
        setMessage('')
        setType('')

        if(projeto.orcamentoProjeto < projeto.cost){
            setMessage('Orçamento menor que custas')
            setType('error')
        }else{
            fetch(`http://32.30.14.74:5000/projetos/${projeto.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(projeto)
            })
            .then( resp => resp.json())
            .then( data => {
                setProjeto(data)
                setType('sucess')
                setMessage('Edição realizada com sucesso!')
                setShowEdit(!showEdit)
                setProjetoButtonText(showEdit ? 'Editar' : 'Detalhes')
            })
            .catch(err => console.log(err))
        }
    }

    function addService(service){
        setMessage('')
        setType('')
        
        if(parseFloat(service.cost) <= parseFloat(projeto.orcamentoProjeto)){
            let projetoTemp = projeto
            projetoTemp.cost += parseFloat(service.cost) 
            projetoTemp.services.push(service)
            projetoTemp.orcamentoProjeto = parseFloat(projetoTemp.orcamentoProjeto) - parseFloat(service.cost)

            fetch(`http://32.30.14.74:5000/projetos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(projetoTemp)
            })
            .then(resp => resp.json())
            .then(data => {
                setProjeto(projetoTemp)
                setMessage('Serviço adicionado com sucesso!')
                setType('sucess')

                setShowEditService(false)
                setServiceToEdit({})
                setShowService(true)
            })
            .catch(err => console.log(err))
        }
        else{
            setMessage('Custo ultrapassa o orçamento do Projeto')
            setType('error')
        }
        
    }

    function editService(service){
        setMessage('')
        setType('')

        let projetoTemp = {...projeto}
        let serviceAntigo = projetoTemp.services.filter( serv => serv.id === service.id)[0]
        
        if(parseFloat(service.cost) <= parseFloat(projeto.orcamentoProjeto)){
            
            projetoTemp.cost = parseFloat(projetoTemp.cost) - parseFloat(serviceAntigo.cost) + parseFloat(service.cost)
            projetoTemp.orcamentoProjeto = parseFloat(projetoTemp.orcamentoProjeto) + parseFloat(serviceAntigo.cost) - parseFloat(service.cost)
            
            projetoTemp.services.map( serv => {
                if(serv.id === service.id){
                    serv.name = service.name
                    serv.cost = service.cost
                    serv.desc = service.desc
                }
            })

            fetch(`http://32.30.14.74:5000/projetos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(projetoTemp)
            })
            .then(resp => resp.json())
            .then(data => {
                setProjeto(projetoTemp)
                setMessage('Serviço editado com sucesso!')
                setType('sucess')

                setShowEditService(!showEditService)
                setServiceToEdit({})
                setShowService(false)
            })
            .catch(err => console.log(err))
        }
        else{
            setMessage('Custo ultrapassa o orçamento do Projeto')
            setType('error')
        }
    }

    function handleRemoveService(id){
        console.log(id)
        setMessage('')
        setType('')

        let serviceTemp = projeto.services.filter( service => service.id === id)[0]

        let projetoTemp = {...projeto}

        projetoTemp.services = projeto.services.filter( service => service.id !== id)
        projetoTemp.orcamentoProjeto += parseFloat(serviceTemp.cost)
        projetoTemp.cost = parseFloat(projeto.cost) - parseFloat(serviceTemp.cost)

        fetch(`http://32.30.14.74:5000/projetos/${projeto.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(projetoTemp)
        })
        .then(resp => resp.json())
        .then(data => {
            setProjeto(projetoTemp)
            setMessage('Serviço excluído com sucesso!')
            setType('sucess')
        })
        .catch(err => console.log(err))
    }

    function handleEditService(service){
        showServices()
        setServiceToEdit(service)
        setShowEditService(true)
    }

    return(
        <>
            <div className={styles.editarprojeto_container}>   

                {
                    projeto.nomeProjeto !== undefined ?
                        <Container>

                            <div className={styles.title_edit}>
                                <h1> Projeto: {projeto.nomeProjeto}</h1>
                                <SubmitButton text={projetoButtonText} handleOnClick={showDescricao} />
                            </div>

                            {message && (<Message type={type} msg={message} />)}

                            {
                                !showEdit ? (
                                    <div className={styles.descricao}>
                                        <p> <span>Categoria:</span>  {projeto.categoria.name}</p>
                                        <p> <span>Total de Orçamento:</span> {formatReal(parseFloat(projeto.orcamentoProjeto))} </p>
                                        <p> <span>Total Utilizado:</span> {formatReal(projeto.cost)}</p>
                                    </div>
                                ) : (
                                    <div className={styles.descricao}>
                                        <ProjetoForm
                                            btnText='Concluir edição'
                                            projetoData={projeto}
                                            handleSubmit={editPost}
                                        />
                                    </div>
                                )
                            }

                            <div className={styles.title_edit}>
                                <h3> Serviços </h3>
                                <SubmitButton text={serviceButtonText} handleOnClick={showServices} />
                            </div>

                            {
                                !showService ? (
                                    <div className={styles.services_container}>
                                        {projeto.services.map((service) => (
                                            <ServiceCard
                                                key={service.id}
                                                id={service.id}
                                                name={service.name}
                                                cost={service.cost}
                                                desc={service.desc}
                                                handleEdit={handleEditService}
                                                handleRemove={handleRemoveService}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    
                                    !showEditService ? (
                                        <div className={styles.descricao}>
                                            <ServiceForm
                                                btnText='Adicionar'
                                                handleSubmit={addService}
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.descricao}>
                                            <ServiceForm
                                                serviceData={serviceToEdit}
                                                btnText='Editar'
                                                handleSubmit={editService}
                                            />
                                        </div>
                                    )
                                    
                                )
                            }

                        </Container>
                        :
                        <Loading />
                }

            </div>
        </>
        
    )
}

export default Projeto