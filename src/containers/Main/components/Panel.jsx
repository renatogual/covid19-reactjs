import React, { memo } from 'react'
import RefreshIcon from '../../../assets/img/refresh.svg'
import { Card, Typography, Button, Select, MenuItem } from '../../../components'
import COUNTRIES from '../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style'

//Funcionalidade PWA
const navigatorHasShare = navigator.share

function Panel({updateAt, onChange, data, country, getCoviddata}) {
    const {cases, todayDeaths, recovered, deaths, todayCases} = data

    const renderCountries = (country, index) => (
        <MenuItem key={`country-${index}`} value={country.value}>
            <ItemStyled>
                <div>{country.label}</div>
                <img src={country.flag} alt={`País-${country.label}`}/>
            </ItemStyled>
        </MenuItem>
    )

    const textCovid19 = `País: ${country} - Recuperados: ${recovered}`

    const shareInfo = () => {
        navigator.share({
            title: `Dados do Covid19 - ${country}`,
            text: textCovid19,
            url: 'https://endereço-onde-esta-hospedado'

        })
    }

    const copyInfo = () => {
        navigator.clipboard.writeText(textCovid19)
    }

    const renderShareButton = (
        <div>
            <Button variant="contained" color="primary" onClick={shareInfo}>
                Compartilhar
            </Button>
        </div>
    )

    const renderCopyButton = (
        <div>
            <Button variant="contained" color="primary" onClick={copyInfo}>
                Copiar
            </Button>
        </div>
    )
    

    return (
        <Card>
            <CardPanelContentStyled>
                <div>
                    <Typography variant='h5' component='span' color='primary'>Painel Coronavírus</Typography>
                    <div>
                        <Typography variant='body2' component='span' color='primary'>Atualizado em: {updateAt}</Typography>
                    </div>
                    <div className='pt-2'>
                        <Select onChange={onChange} value={country}>
                            {COUNTRIES.map(renderCountries)}
                        </Select>
                    </div>
                </div>
                {navigatorHasShare ? renderShareButton : renderCopyButton}
            </CardPanelContentStyled>
        </Card>
    )
}

export default memo(Panel)