import React, { memo, useCallback, useEffect, useState } from 'react' //O memo evita re-renderizar a pagina, utilizado em componentes que só precisam ser renderizados uma vez
import Api from '../../api'
import { ContainerStyled } from './style'
import Board from './components/Board'

function Main(){
    const [data, setData] = useState({})
    const [country, setCountry] = useState('brazil')

    //Memoriza o valor, caso não seja passado outro valor diferente no parametro country
    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
            .then((data) => setData(data))
    }, [])

    useEffect(() => {
        getCovidData(country)
    }, [getCovidData, country])

    return(
        <ContainerStyled>
            <div className="mb-2">

            </div>
            <Board data={data} />
        </ContainerStyled>
    )
}

export default memo(Main)