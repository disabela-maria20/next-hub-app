import s from './ingressos.module.scss'

const Ingressos = () => {
  return (
    <section className={s.AreaIngresso}>
      <div className="container">
        <h2>Comprar Ingressos</h2>
        <div className={s.gridIngressos}>
          <select>
            <option value="">Escolha a cidade</option>
          </select>
          <select>
            <option>Escolha o cinema</option>
          </select>
        </div>
        <h3 className={s.tituloData}>Selecione a data</h3>
        <div className={s.gridDatas}>
          <button>Quinta 11 Jan</button>
          <button>Quinta 12 Jan</button>
          <button>Quinta 13 Jan</button>
        </div>
        <div className={s.gridCinemas}>
          <div>
            <h2>Cinépolis Jardim Pamplona </h2>
            <p>Rua Pamplona, 1704, São Paulo - SP</p>
          </div>
        </div>
        <div className={s.gridHoras}>
          <div>
            <h3>salas</h3>
            <a href="http://">13:45</a>
            <a href="">18:35</a>
          </div>
          <div>
            <h3>salas</h3>
            <a href="http://">13:45</a>
            <a href="">18:35</a>
          </div>
        </div>
        <a href="">local</a>
      </div>
    </section>
  )
}

export default Ingressos
