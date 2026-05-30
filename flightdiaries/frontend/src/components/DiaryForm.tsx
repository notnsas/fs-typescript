import type { DiaryFormProps } from "../types"
import { useState } from "react";
import { Visibility, Weather } from "../types";

const DiaryForm = ({ diaryCreation, NewDiary, setNewDiary }: DiaryFormProps) => {
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility>('poor');
  const [selectedWeather, setSelectedWeather] = useState<Weather>('sunny');
  
  const handleChangeVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVisibility(event.target.value as Visibility);
    setNewDiary({...NewDiary, visibility: event.target.value})
  };
  
  const handleChangeWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.value", event.target.value);
    setSelectedWeather(event.target.value as Weather);
    setNewDiary({...NewDiary, weather: event.target.value})
  };

  return (
    <div>
      <h2>add new diary</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>
            date
            <input
            type="date"
            value={NewDiary.date}
            onChange={(event) => setNewDiary({...NewDiary, date: event.target.value})}
          />
          </label>
        </div>
        <div>
          <label>
            visibility
            <label>
              <input 
                type="radio" 
                value="poor"
                checked={selectedVisibility === 'poor'} 
                onChange={handleChangeVisibility} 
              />
              Poor
            </label>
            <label>
              <input 
                type="radio" 
                value="great"
                checked={selectedVisibility === 'great'} 
                onChange={handleChangeVisibility} 
              />
              Great
            </label>
            <label>
              <input 
                type="radio" 
                value="good"
                checked={selectedVisibility === 'good'} 
                onChange={handleChangeVisibility} 
              />
              Good
            </label>
            <label>
              <input 
                type="radio" 
                value="ok"
                checked={selectedVisibility === 'ok'} 
                onChange={handleChangeVisibility} 
              />
              Ok
            </label>
          </label>
        </div>
        <div>
          <label>
            weather
            <label>
              <input 
                type="radio" 
                value="sunny"
                checked={selectedWeather === 'sunny'} 
                onChange={handleChangeWeather} 
              />
              Sunny
            </label>
            <label>
              <input 
                type="radio" 
                value="rainy"
                checked={selectedWeather === 'rainy'} 
                onChange={handleChangeWeather} 
              />
              Rainy
            </label>
            <label>
              <input 
                type="radio" 
                value="cloudy"
                checked={selectedWeather === 'cloudy'} 
                onChange={handleChangeWeather} 
              />
              Cloudy
            </label>
            <label>
              <input
                type="radio" 
                value="stormy"
                checked={selectedWeather === 'stormy'} 
                onChange={handleChangeWeather} 
              />
              Stormy
            </label>
            <label>
              <input
                type="radio" 
                value="windy"
                checked={selectedWeather === 'windy'} 
                onChange={handleChangeWeather} 
              />
              Windy
            </label>
          </label>
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm
