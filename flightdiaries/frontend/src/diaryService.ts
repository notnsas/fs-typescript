import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from './types'

const baseUrl = '/api/diaries'

const getAll = async (setNewNotification: (message: string) => void) => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status)
      console.error(error.response);
      setNewNotification(`Error: Incorrect ${error.response?.data.error[0].format}: ${error.response?.data.error[0].message}`)
    } else {
      console.error(error);
    }
  }
}

const create = async (object: NewDiaryEntry, setNewNotification: (message: string) => void) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object)
    console.log("response", response)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error.status', error.status)
      console.error('error.response', error.response);
      setNewNotification(`Error: Incorrect ${error.response?.data.error[0].format}: ${error.response?.data.error[0].message}`)
    } else {
      console.error(error);
    }
  }
}

export default { getAll, create }
