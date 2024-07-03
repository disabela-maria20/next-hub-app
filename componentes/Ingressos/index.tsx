/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import ReactLoading from 'react-loading'

import s from './ingressos.module.scss'

import {
  ESTADOS,
  Locais,
  Sessions,
  SessionsArrayResponse
} from '@/request/models'
import { Sessoes } from '@/request/services'
import { useLocationContext } from '@/utils/Context/Location'
import { useFormatarData } from '@/utils/hooks/useFormatarData'
import { useQuery } from '@tanstack/react-query'

const Ingressos = () => {
  const [filteredSessions, setFilteredSessions] = useState<Sessions[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const [state, setState] = useState<string>('')
  const [cities, setCities] = useState<string>('')

  const { formatDia, formatMes, formatDiaDaSemana } = useFormatarData()
  const { location, loading, locationArea } = useLocationContext()

  const localFilmes = useQuery<Locais[], Error>({
    queryKey: ['estados'],
    queryFn: async () => {
      const response = await Sessoes.getLocation(process.env.API_SLUG as string)
      return response
    }
  })

  function obterNomeEstado(sigla: string): string {
    return ESTADOS[sigla] || 'Estado não encontrado'
  }

  const programacao = useQuery<SessionsArrayResponse, Error>({
    queryKey: ['programacao', cities],
    queryFn: async () => {
      const response = await Sessoes.getSession(
        process.env.API_SLUG as string,
        cities
      )
      return response
    },
    enabled: !!cities
  })

  const calculateDistance = (lat2: number, lon2: number) => {
    const lat1 = location.latitude
    const lon1 = location.longitude

    if (lat1 === 0 && lon1 === 0) {
      return 0
    }

    const R = 6371 // Raio da Terra em quilômetros
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distanceInKilometers = R * c

    return distanceInKilometers
  }

  const groupSessoes = (sessao: Sessions[] | undefined) => {
    const groupedSessions: { [key: string]: Sessions } = {}

    sessao?.map((sessionsArray) => {
      // @ts-ignore: Unreachable code error
      sessionsArray?.map(
        // @ts-ignore: Unreachable code error
        ({ theaterName, hour: sessionHour, link: links, ...rest }) => {
          const key = `${theaterName}`
          const distance = calculateDistance(Number(rest.lat), Number(rest.lng))
          const stateName = obterNomeEstado(rest.state)
          if (!groupedSessions[key]) {
            // @ts-ignore: Unreachable code error
            groupedSessions[key] = {
              theaterName,
              hour: sessionHour,
              // @ts-ignore: Unreachable code error
              hours: [],
              // @ts-ignore: Unreachable code error
              distance,
              // @ts-ignore: Unreachable code error
              stateName,
              ...rest
            }
          }
          // @ts-ignore: Unreachable code error
          groupedSessions[key].hours.push({ hour: sessionHour, links: links })
        }
      )
    })

    const groupedSessionsArray = Object.values(groupedSessions)

    const sortedSessionsByDistance = groupedSessionsArray.sort((a, b) => {
      return a.distance - b.distance
    })

    return sortedSessionsByDistance
  }

  function handleDataClick(date: string): void {
    setSelectedDate(date)
    const selectedSession = programacao.data?.sessions.find(
      (session) => session?.date === date
    )
    const filteredSessions = selectedSession
      ? groupSessoes([selectedSession.sessions])
      : []
    setFilteredSessions(filteredSessions)
  }

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (programacao.data) {
      const getDate = programacao.data.sessions.find(
        (session) => session?.date === selectedDate
      )
      if (getDate) {
        setFilteredSessions(groupSessoes([getDate.sessions]))
      } else {
        setSelectedDate(programacao.data.sessions[0]?.date)
        setFilteredSessions(
          groupSessoes([programacao.data.sessions[0]?.sessions])
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, location, programacao.data])

  function formatarHora(hora: string): string {
    return hora?.slice(0, 5)
  }

  return (
    <section className={s.AreaIngresso}>
      <div className="container">
        <h2>Comprar Ingressos</h2>
        <div className={s.gridIngressos}>
          <select
            value={state}
            onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
              setState(target.value)
            }
          >
            <option value="">Estado</option>
            {localFilmes.data
              ?.sort((a, b) => a.state.localeCompare(b.state))
              ?.map((data) => (
                <option key={data.state} value={data.state}>
                  {obterNomeEstado(data.state)}
                </option>
              ))}
          </select>
          <select
            value={cities}
            onChange={({ target }: ChangeEvent<HTMLSelectElement>) =>
              setCities(target.value)
            }
          >
            <option value="">Cidade</option>
            {localFilmes.data &&
              localFilmes.data
                .find((item) => item.state === state)
                ?.cities.slice()
                .sort((a, b) => a.localeCompare(b))
                .map((city: string) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
          </select>
        </div>
        {programacao.isLoading && <ReactLoading type="bubbles" color="#000" />}
        {programacao.isSuccess && (
          <>
            <h3 className={s.tituloData}>Selecione a data</h3>
            <div className={s.gridDatas}>
              {programacao.data?.sessions.map((data) => (
                <section key={data.date}>
                  <button
                    className={selectedDate === data.date ? s.active : ''}
                    onClick={() => handleDataClick(data.date)}
                  >
                    {formatDiaDaSemana(data.date)}
                    &nbsp;{formatDia(data.date)}&nbsp;
                    {formatMes(data.date)}
                  </button>
                </section>
              ))}
            </div>
            {filteredSessions &&
              filteredSessions.map((session, key) => (
                <div className={s.areaCinema} key={key + 1}>
                  <div className={s.gridCinemas}>
                    <div>
                      <h2>{session.theaterName}</h2>
                      <p>
                        {session.address}, {session.number} <br />
                        {session.addressComplement}, {session.city} {' - '}
                        {session.state} - &nbsp;
                        {session.distance.toFixed(2) + 'km'}
                      </p>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${session.lat},${session.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className={s.map}
                      aria-label="Local"
                    >
                      <FaMapMarkerAlt />
                    </a>
                  </div>
                  <div className={s.gridHoras}>
                    <div>
                      <h3>Salas</h3>
                      {session?.hours
                        ?.sort((a, b) => a.hour.localeCompare(b.hour))
                        ?.map((hour, i) => (
                          <a
                            key={1 + i}
                            href={hour?.links}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {formatarHora(hour?.hour)}
                          </a>
                        ))}
                    </div>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${session.lat},${session.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className={s.map}
                    aria-label="Local"
                  >
                    <FaMapMarkerAlt />
                  </a>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Ingressos
