/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.common['token'] = process.env.API_TOKEN

export async function getFilme(slug: string) {
  const res = await axios.get(`/movie/get/${slug}`)
  return res.data
}

export async function getSession(slug: string, city: string) {
  const res = await axios.get(`/session/get/${slug}?city=${city}`)
  return res.data
}

export async function getLocation(slug: string) {
  const res = await axios.get(`/session/location/${slug}`)
  return res.data
}

export const Sessoes = {
  getFilme,
  getSession,
  getLocation
}
