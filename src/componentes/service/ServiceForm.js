import {v4 as uuidv4} from 'uuid'

import { useState } from 'react'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'

import styles from './ServiceForm.module.css'

function ServiceForm({serviceData,btnText,handleSubmit}){

    const [service, setService] = useState(serviceData || {})
    
    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        e.preventDefault()
        if(!serviceData){
            service.id = uuidv4()
        }
        handleSubmit(service)
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                text='Nome do Serviço'
                name='name'
                type='text'
                placeholder='Insira um Nome'
                value={service.name}
                handleOnChange={handleChange}
                required={true}
            />
            <Input
                text='Custo do Serviço'
                name='cost'
                type='number'
                placeholder='Insira o Custo'
                value={service.cost}
                handleOnChange={handleChange}
                required={true}
            />
            <Input
                text='Descrição do Serviço'
                name='desc'
                type='text'
                placeholder='Descreva o serviço'
                value={service.desc}
                handleOnChange={handleChange}
                required={true}
            />
            <SubmitButton text={btnText} />
            
        </form>
    )
}

export default ServiceForm