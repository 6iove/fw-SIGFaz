import apiSigfaz from './api'

export async function buscarTalhoes() {
  const response = await apiSigfaz.get('/talhoes/')

  return response.data
}