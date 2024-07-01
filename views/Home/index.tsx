import s from './home.module.scss'

import { INFOFILMES } from './array'

import { Video } from '@/componentes'

const Home = () => {
  return (
    <>
      <section className={s.areaBanner}>
        <img src={INFOFILMES.bannerDesktop} className={s.banner} />
        <div className={s.flex}>
          <img src={INFOFILMES.logo} />
          <h1>Deadpool e Wolverine retornam ao cinema.</h1>
        </div>
      </section>
      <main className={s.infoFilme}>
        <div className="container">
          <div className={s.gridCartaz}>
            <img src={INFOFILMES.poster} alt="" />
            <Video url="https://www.youtube.com/embed/dEbe0rS4Z2A?si=XOplF2tTvRoXIrY4" />
          </div>
          <div className={s.textSinopse}>
            <h2>Sinopse</h2>
            <p>{INFOFILMES.sinopse}</p>
          </div>
          <div className={s.gridInfo}>
            <div className={s.textInfo}>
              <h2>Dirigido por</h2>
              <p>{INFOFILMES.dirigidoPor}</p>
            </div>
            <div className={s.textInfo}>
              <h2>Escrito por</h2>
              <p>{INFOFILMES.escritoPor}</p>
            </div>
            <div className={s.textInfo}>
              <h2>Produzido por</h2>
              <p>{INFOFILMES.produzidoPor}</p>
            </div>
            <div className={s.textInfo}>
              <h2>Elenco</h2>
              <p>{INFOFILMES.elenco}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default Home
