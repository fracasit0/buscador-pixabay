import React, { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'


function App() {
  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaactual, guardarPaginaactual] = useState(1)
  const [totalpagina, guardarTotalpagina] = useState(1)

  useEffect(() => {
    const ConsultarApi = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const _key = '6590996-d9747d6ba4eeeb340102ca45a';
      const _url = `https://pixabay.com/api/?key=${_key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(_url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits)

      //calcular total paginas
      const calculoTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina);
      guardarTotalpagina(calculoTotalPaginas)

      //mover pagina al top
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    ConsultarApi();
  }, [busqueda, paginaactual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if(nuevaPaginaActual === 0) return;
    guardarPaginaactual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if(nuevaPaginaActual > totalpagina) return;
    guardarPaginaactual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <div className="lead text-center">Buscador de imagenes</div>

        <Formulario guardarBusqueda={guardarBusqueda}/>
      </div>

      <div className="row justifiy-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {(paginaactual === 1)
         ? null
         : <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}> 
          &laquo; Anterior</button>}

        {(paginaactual > totalpagina)
          ? null
          : <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaSiguiente}> 
          Siguiente &raquo;</button>}
      </div>
    </div>
  );
}

export default App;
