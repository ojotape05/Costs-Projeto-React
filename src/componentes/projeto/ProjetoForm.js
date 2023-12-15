import {useEffect, useState} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjetoForm.module.css'

function ProjetoForm({handleSubmit, projetoData, btnText}){

    const [categorias,setCategorias] = useState([])
    const [projeto, setProjeto] = useState(projetoData || {})

    useEffect(() => {
        fetch("http://32.30.14.74:5000/categorias", {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then( json => {
            setCategorias(json)
        })
        .catch(err => console.log(err)) 
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log(projeto)
        handleSubmit(projeto)
    }

    function handleChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value})
    }

    function handleSelect(e){
        setProjeto({...projeto, categoria:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                text='Nome do Projeto'
                name='nomeProjeto'
                type='text'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={projeto.nomeProjeto}
                required={true}
            />
            <Input
                text='Orçamento do Projeto'
                name='orcamentoProjeto'
                type='number'
                placeholder='Insira o orçamento'
                handleOnChange={handleChange}
                value={projeto.orcamentoProjeto}
                required={true}
            />
            <Select
                name='categoria'
                text='Selecione a categoria'
                options={categorias}
                handleOnChange={handleSelect}
                value={projeto.categoria ? projeto.categoria.id : ""}
                required={true}
            />
            <SubmitButton text={btnText} />
            
        </form>
    )
}

export default ProjetoForm