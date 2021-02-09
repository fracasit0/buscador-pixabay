import React, { useState } from 'react'
import Error from './Error'


const Formulario = ({guardarBusqueda}) => {
    const [termino, guardarTermino] = useState('')
    const [error, guardarError] = useState(false)

    const BuscarImagenes = e => {
        e.preventDefault()

        //validar
        if(termino.trim() === '' ) {
            guardarError(true);
            return;
        }
        guardarError(false);


        //enviar termino de busqueda al componente principal
        guardarBusqueda(termino)
    }
  return (
    <form onSubmit={BuscarImagenes}>
        <div className="row">
            <div className="form-group col-md-8">
                <input 
                type="text"
                placeholder="Busca una imagen, ejemplo: cafe, futbol, juegos, etc."
                className="form-control form-control-lg"
                onChange={e => guardarTermino(e.target.value)} />
            </div>

            <div className="form-group col-md-4">
                <input 
                type="submit"
                placeholder="Busca una imagen, ejemplo: cafe, futbol, juegos, etc."
                className="btn btn-lg btn-danger btn-block"
                value="Buscar" />
            </div>
        </div>

        {error
        ? <Error mensaje = "Agrega un termino para buscar"/>
        : null }
    </form>
  );
}

export default Formulario;
