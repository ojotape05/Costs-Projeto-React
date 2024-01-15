# Projeto COSTS
Este é um projeto em REACT desenvolvido durante uma bateria de estudos que fiz para me aprofundar na ferramenta. <br>

A ideia foi fazer um <b>CRUD</b> simples pegando todos os escopos estudados, como Hooks, Icons, Componentes, Lazy Load, Mensagens de retorno e assim por diante.<br>
Para isso, fiz um gestor de projetos capaz de receber um título, um orçamento, uma categoria e alguns serviços (com nome, custo e descrição). Ele conta com tratativas de inserção e retorno de dados, além de regras de negócios simples para funcionamento coeso do projeto.

## Tela - Home
A <b>Tela Home</b> apresenta o projeto no seu body, faz uma chamada pra uso e já conta com alguns componentes de suporte (Container, Button), bem como os componentes Header e Footer.<br><br>
Usei a <b>componentização</b> nos <b><i>buttons, container, header e footer</i></b> por serem elementos bem genéricos na minha aplicação e que se repetem em todas as telas.<br>
No caso dos buttons, utilizei os <b>parâmetros</b> para passar o link e o texto que compõem. No container, fiz alguns estilos padronizados no css do componente e que pode ser acessado passando um parâmetro de estilo ao container (melhor visualizado no código).

## Tela - Criar Projeto
A <b>Tela de criar projeto</b> contém o que chamei de "formulário de projeto".<br><br>
Fiz a componentização desse formulário pois temos a possibilidade de <b>fazer a edição</b> de projetos criados posteriormente utilizando exatamente a mesma estrutura, mudando somente o preenchimento dos campos de cadastro.<br>
Já contém aqui as primeiras validações e comunicação com o backend. O formulário contém o campo select que é dinâmicamente preenchido atráves da consulta ao banco de dados. Para isso, foi utilizado o <b>Hook useEffect</b> para consultar os dados e <b>Hook useState</b> para armazenar temporariamente essa informação e preencher no Select como parâmetro.<br>

Uma vez que todos os campos foram devidamente preenchidos, vamos para a próxima tela.

## Tela - Projetos
A <b>Tela de Projetos</b> contém todos os projetos criados na aplicação.<br><br>
Essa tela propõe ao usuário uma visão geral de todos os projetos, contendo alguns detalhes de cada um deles e dois botões interativos para <b>edição e exclusão</b> do projeto.<br>
Enquanto o botão de <b>edição</b> abre uma página a ser abordada logo abaixo na tela "Projeto", o botão de <b>excluir</b> apenas exclui o registro no banco de dados e retorna uma mensagem ao usuário. Também há de se destacar que na utilização do projeto ou na leitura do código, pode-se ver um tempo de 1,5s para carregamento dos projetos pós requisição ao backend, fiz isso para testar o <b>loading</b>.<br>
As <b>Mensagens de Retorno</b> são customizadas a partir das respostas recebidas.

## Tela - Projeto
A <b>Tela de Projeto</b> aborda os projetos de forma única e mais detalhada, dando espaço para a customização dos <b>serviços</b> que o compõe.<br><br>
Nessa tela, além de enxergarmos com mais detalhes o projeto selecionado, podemos fazer a edição do projeto usando o componente "formulário de projeto" preenchido (conforme mencionado anteriormente) e também trabalhar nos serviços.<br>
Os serviços são mostrados numa divisória a parte em cards, podem ser editados e excluídos seguindo praticamente a mesma mecânica da tela "Projetos".

## Tela - Contato
A <b>Tela de Contato</b> é uma tela pra disponibilizar os meios de contato comigo.

<i>obs.: Como é um projeto totalmente para portfólio, nosso "banco de dados" será um arquivo .json</i>
