import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [ conteudo, setConteudo ] = useState(<>Carregando...</>)

  async function PegarConteudo() {
    // Vai realizar o fetch para a API do Rick and Morty - Usando AXIOS

    // GET     =  Buscar Informação
    // POST    =  Adicionar Informação
    // PUT     =  Alterar Informação
    // DELETE  =  Deletar Informação

    const url = 'https://rickandmortyapi.com/api/character'

    const requestOptions = {
      method: 'GET'
    }

    const response = await fetch(url, requestOptions)

    if(!response.ok){
      return []
    }

    // data = { info: {}, results: {} }
    const data = await response.json()

    return data.results
  }

  async function TransformaEmLista() {
    const todosPersonagens = await PegarConteudo()

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
            {/* DESAFIO: Trazer as participações */}
          </div>
          <h5> <b>Status: </b> {personagem.status} </h5>
        </div>
      </div>
    )
  }

  // function PegarEpisodios(todosPersonagens, personagem) {
  //   todosPersonagens.forEach(personagem => {
      
  //   });
  // }

  useEffect(() => {
    async function carregar() {
      setConteudo(await TransformaEmLista())
    }
    carregar()
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* filtros */}
        <div className='lista-principal'>
          { conteudo }
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App