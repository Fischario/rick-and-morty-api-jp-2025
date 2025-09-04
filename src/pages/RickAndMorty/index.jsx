import './style.css'
import { useEffect, useState } from 'react'
import { getCharacters } from '../../api/character'

function RickAndMorty() {
    const [conteudo, setConteudo] = useState(<>Carregando...</>)
    const [especieSelecionada, setEspecieSelecionada] = useState('')
    const [nomeSelecionado, setNomeSelecionado] = useState('')

    async function TransformaEmLista() {
        const param = {
            name: nomeSelecionado,
            species: especieSelecionada
        }
        const todosPersonagens = await getCharacters(param)

        return todosPersonagens.map(personagem =>
            <div className='card char' key={personagem.id}>
                <img src={personagem.image} alt={personagem.name} />
                <h2>{personagem.name}</h2>
                <div className='char-info'>
                    <span> <b>Espécie: </b> {personagem.species} </span>
                    <span> <b>Gênero: </b> {personagem.gender} </span>
                </div>
                <div>
                    <div className='lista-secundaria'>
                        <b>Participações:</b>
                        <div className='episodios'>
                            {MapTodosEpisodios(personagem.episode)}
                        </div>
                    </div>
                    <h5> <b>Status: </b> {personagem.status} </h5>
                </div>
            </div>
        )
    }

    function MapTodosEpisodios(episode) {
        return episode.map((episodio) => {
            const id = episodio.split('/').pop();
            return <span key={id}>Ep. {id}</span>
        });
    }

    async function carregar() {
        setConteudo(await TransformaEmLista())
    }

    useEffect(() => {
        carregar()
    }, [])

    function handleEspecieSelecionada(evento) {
        return setEspecieSelecionada(evento.target.value)
    }

    function handleNomeSelecionado(evento) {
        return setNomeSelecionado(evento.target.value)
    }

    return (
        <main>
            <div className='filtro'>
                <label><b>Nome:</b></label>
                <input type="text" value={nomeSelecionado} onChange={handleNomeSelecionado} />
                <div className='filtro-opcoes'>
                    <label><b>Espécie:</b></label>
                    <select id="especie" value={especieSelecionada} onChange={handleEspecieSelecionada}>
                        <option value="">Todas</option>
                        <option value="human">Human</option>
                        <option value="alien">Alien</option>
                        <option value="robot">Robot</option>
                        <option value="animal">Animal</option>
                        <option value="humanoid">Humanoid</option>
                        <option value="unknown">Unknown</option>
                        <option value="poopybutthole">Poopybutthole</option>
                        <option value="mythological%20creature">Mythological Creature</option>
                    </select>
                </div>
                <button id='pesquisar' onClick={carregar}>Pesquisar</button>
            </div>
            <div className='lista-principal'>
                {conteudo}
            </div>
        </main>
    )
}

export default RickAndMorty