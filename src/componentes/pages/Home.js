import styles from './Home.module.css'
import LinkButton from '../layouts/LinkButton'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1> Bem vindo ao <span> Costs </span> </h1>
            <p> Comece a gerenciar os seus projetos agora mesmo! </p>
            <LinkButton to='/criar-projeto' text='Criar projeto' />
        </section>
    )
}

export default Home