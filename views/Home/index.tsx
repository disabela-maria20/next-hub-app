'use client'

import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'

import s from './home.module.scss'

import { INFOFILMES } from './array'

import { Ingressos, Loading, Video } from '@/componentes'
import { IFilmeProps } from '@/request/models'
import { Sessoes } from '@/request/services'
import { useFormatarData } from '@/utils/hooks/useFormatarData'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const [open, setOpen] = useState<boolean>()

  const { converterParaHorasEMinutos } = useFormatarData()

  const filme = useQuery<IFilmeProps>({
    queryKey: ['filmes'],
    queryFn: async () => {
      const response = await Sessoes.getFilme(process.env.API_SLUG as string)
      return response
    }
  })

  return (
    <>
      {filme.isLoading && <Loading style={{ height: '100vh' }} />}
      {filme.isSuccess && (
        <>
          <section className={s.areaBanner}>
            <img src={filme.data?.movie.bannerDesktop} className={s.banner} />
            <div className={s.flex}>
              <img src={INFOFILMES.logo} />
              <h1>Deadpool e Wolverine retornam ao cinema.</h1>
              <button onClick={() => setOpen(!open)}>
                saiba
                <FaPlus />
              </button>
            </div>
          </section>
          {open && (
            <main className={s.infoFilme}>
              <div className="container">
                <div className={s.gridCartaz}>
                  <img
                    src={filme.data?.movie.cover}
                    alt={filme.data?.movie.title}
                  />
                  <Video url={filme.data?.movie.trailer} />
                </div>
                <div className={s.textSinopse}>
                  <h2>Sinopse</h2>
                  <p>{filme.data?.movie.shortSynopsis}</p>
                </div>
                <div className={s.gridInfo}>
                  <div className={s.textInfo}>
                    <h2>Dirigido por</h2>
                    <p>{filme.data?.movie.director}</p>
                  </div>
                  <div className={s.textInfo}>
                    <h2>Elenco</h2>
                    <p>{filme.data?.movie.cast}</p>
                  </div>
                  <div className={s.textInfo}>
                    <h2>Duração</h2>
                    <p>
                      {converterParaHorasEMinutos(
                        filme.data?.movie.duration as number
                      )}
                    </p>
                  </div>
                  <div className={s.textInfo}>
                    <h2>Gênero</h2>
                    <p>{filme.data?.movie.genre}</p>
                  </div>
                </div>
              </div>
            </main>
          )}

          <Ingressos />
        </>
      )}
    </>
  )
}
export default Home
