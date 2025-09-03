import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import TrocarPagina from './components/TrocarPagina'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [conteudo, setConteudo] = useState(<>Carregando...</>)
  const [especieSelecionada, setEspecieSelecionada] = useState('')
  const [nomeSelecionado, setNomeSelecionado] = useState('')

  async function PegarConteudo(url) {
    // Vai realizar o fetch para a API do Rick and Morty - Usando AXIOS

    // GET     =  Buscar Informação
    // POST    =  Adicionar Informação
    // PUT     =  Alterar Informação
    // DELETE  =  Deletar Informação

    const requestOptions = {
      method: 'GET'
    }

    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      return []
    }

    // data = { info: {}, results: {} }
    const data = await response.json()

    return data.results
  }

  async function TransformaEmLista(url) {
    const todosPersonagens = await PegarConteudo(url)

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

  async function carregar(url) {
    setConteudo(await TransformaEmLista(url))
  }

  useEffect(() => {
    carregar('https://rickandmortyapi.com/api/character')
  }, [])

  function clickPesquisar() {
    if (especieSelecionada == '' && nomeSelecionado == ''){
      const url = 'https://rickandmortyapi.com/api/character'
      carregar(url)
    }
    else if (especieSelecionada != '' && nomeSelecionado == '') {
      const url = `https://rickandmortyapi.com/api/character?species=${especieSelecionada}`
      carregar(url)
    }
    else if (especieSelecionada == '' && nomeSelecionado != '') {
      const url = `https://rickandmortyapi.com/api/character?name=${nomeSelecionado}`
      carregar(url)
    }
    else if (especieSelecionada != '' && nomeSelecionado != '') {
      const url = `https://rickandmortyapi.com/api/character?name=${nomeSelecionado}&species=${especieSelecionada}`
      carregar(url)
    }
  }

  function handleEspecieSelecionada(evento) {
    return setEspecieSelecionada(evento.target.value)
  }

  function handleNomeSelecionado(evento) {
    return setNomeSelecionado(evento.target.value)
  }

  return (
    <>
      <Header />
      <main>
        <div className='filtro'>
          <label><b>Nome:</b></label>
          <input type="text" value={nomeSelecionado} onChange={handleNomeSelecionado}/>
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
          <button id='pesquisar' type='submit' onClick={clickPesquisar}>Pesquisar</button>
        </div>
        <div className='lista-principal'>
          {conteudo}
        </div>
        <TrocarPagina />
      </main>
      <Footer />
    </>
  )
}

export default App