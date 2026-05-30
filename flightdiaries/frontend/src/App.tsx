import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './diaryService'
import DiaryList from './components/DiaryList'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'
import useNotification from './hooks/useNotification'
import { NewDiarySchema } from './types'
import { ZodError } from 'zod'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [NewDiary, setNewDiary] = useState({ 
    date: "", 
    visibility: "poor", 
    weather: "sunny", 
  });
  const { setNewNotification } = useNotification()
  
  useEffect(() => {
    diaryService.getAll(setNewNotification).then(initialNotes => {
      if (typeof initialNotes === "undefined") {
        return
      }
      setDiaries(initialNotes)
    })
  }, [setNewNotification])

  const diaryCreation = async (event: React.SyntheticEvent) => {    
    event.preventDefault()
    console.log('NewDiary', NewDiary)

    let diary: DiaryEntry | undefined;
    try {
      const newValidatedDiary = NewDiarySchema.parse(NewDiary)
      diary = await diaryService.create(newValidatedDiary, setNewNotification)
    } catch (error) {
      if (error instanceof ZodError) {
        setNewNotification(`Error: Incorrect ${error.issues[0].path}: ${error.issues[0].message}`)
      } else {
        console.error(error);
      }
    }

    console.log('diary', diary)

    if (typeof diary === "undefined") {
      return
    }

    setDiaries(diaries.concat(diary))
  };

  return (
    <div>
      <Notification/>
      <DiaryForm diaryCreation={diaryCreation} NewDiary={NewDiary} setNewDiary={setNewDiary}/>
      <DiaryList diaries={diaries}/>
    </div>
  )
}

export default App
