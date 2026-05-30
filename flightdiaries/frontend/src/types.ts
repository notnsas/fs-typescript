import * as z from 'zod'

export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = typeof Weather[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = typeof Visibility[keyof typeof Visibility];

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
} 

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export const NewDiarySchema = z.object({
  date: z.string(),
  visibility: z.enum(Visibility),
  weather: z.enum(Weather),
})

export interface DiaryProps {
  diary: DiaryEntry;
}

export interface DiaryListProps {
  diaries: DiaryEntry[];
}

interface NewDiaryState {
  date: string;
  weather: string;
  visibility: string;
} 

export interface DiaryFormProps {
  diaryCreation: (event: React.SyntheticEvent) => void;
  NewDiary: NewDiaryState;
  setNewDiary: React.Dispatch<React.SetStateAction<{
      date: string;
      visibility: string;
      weather: string;
  }>>
}

