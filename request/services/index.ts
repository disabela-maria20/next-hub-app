import { IEstados } from '../models'

import axios from 'axios'

export const getEstados: () => Promise<IEstados[]> = async () => {
  const res = await axios.get(
    `${process.env.ENDPOINT_ESTADOS_CIDADES}${process.env.FILME_ID}`
  )

  return res.data.estados
}

export const Sessoes = {
  Estados: getEstados
}
