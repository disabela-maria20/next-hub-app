'use client'

import { useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

import s from './ingressos.module.scss'

import { IEstados } from '@/request/models'
import { Sessoes } from '@/request/services'
import { useQuery } from '@tanstack/react-query'

const Ingressos = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('')
  const [cidades, setCidades] = useState<string[]>([])

  const estadoCidade = useQuery<IEstados[], Error>({
    queryKey: ['todos'],
    queryFn: async () => {
      return await Sessoes.Estados()
    }
  })
  if (!estadoCidade.data) return null

  const estadosUnicos = Array.from(
    new Set(estadoCidade.data.map((data) => data.ESTADO))
  ).sort((a, b) => a.localeCompare(b))

  const handleEstadoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const estado = event.target.value
    setEstadoSelecionado(estado)

    const cidadesFiltradas = estadoCidade.data
      .filter((ec) => ec.ESTADO === estado)
      .map((ec) => ec.CIDADE)
      .sort((a, b) => a.localeCompare(b))

    setCidades(cidadesFiltradas)
  }

  return (
    <section className={s.AreaIngresso}>
      <div className="container">
        <h2>Comprar Ingressos</h2>
        <div className={s.gridIngressos}>
          <select value={estadoSelecionado} onChange={handleEstadoChange}>
            <option disabled value="">
              Estado
            </option>
            {estadosUnicos.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <select>
            <option disabled value="">
              Cidade
            </option>
            {cidades.map((cidade, index) => (
              <option key={index} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>
        <h3 className={s.tituloData}>Selecione a data</h3>
        <div className={s.gridDatas}>
          <button>Quinta 11 Jan</button>
          <button>Quinta 12 Jan</button>
          <button>Quinta 13 Jan</button>
        </div>
        <div className={s.areaCinema}>
          <div className={s.gridCinemas}>
            <div>
              <h2>Cinépolis Jardim Pamplona </h2>
              <p>Rua Pamplona, 1704, São Paulo - SP</p>
            </div>
            <a href="" className={s.map} aria-label="Local">
              <FaMapMarkerAlt />
            </a>
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
          <a href="" className={s.map} aria-label="Local">
            <FaMapMarkerAlt />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Ingressos
