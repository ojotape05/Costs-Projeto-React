import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./componentes/layouts/Header";
import Footer from "./componentes/layouts/Footer";
import Container from './componentes/layouts/Container'

import Home from './componentes/pages/Home'
import Contato from './componentes/pages/Contato'
import Projetos from './componentes/pages/Projetos';
import CriarProjeto from './componentes/pages/CriarProjeto';
import Projeto from './componentes/pages/Projeto';

function App() {
  return (
    <Router>

        <Header />
        <Container customClass="min-height">
          <Routes>
            
              <Route exact path='/' element={<Home />} />
              <Route exact path='/contato' element={<Contato />} />
              <Route exact path='/projetos' element={<Projetos />} />
              <Route exact path='/criar-projeto' element={<CriarProjeto />} />
              <Route path='/projeto/:id' element={<Projeto />} />
            
          </Routes>
        </Container>
        <Footer />

    </Router>
    
  );
}

export default App;
