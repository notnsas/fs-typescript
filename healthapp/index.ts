import express from 'express';
import { checkExist } from './utils.ts';

import calculateBmi from './bmiCalculator.ts';
import calculateExercises from './exercisesCalculator.ts';

const app = express();

app.use(express.json()); 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const inputExist = checkExist(height, weight);
  if (!inputExist) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const inputIsNumber = (!isNaN(heightNum) && !isNaN(weightNum));
  if (!inputIsNumber) {
    res.status(400).send({ error: "malformatted parameters" });
  } 
  res.status(200).send({ bmi: calculateBmi(heightNum, weightNum), weight: weightNum, height: heightNum });
});

app.post('/exercises', (req, res) => {
  console.log('req.body', req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: dailyExercises, target } = req.body;
  console.log('dailyExercises', dailyExercises);
  const inputExist = checkExist(dailyExercises, target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const inputIsValidType = (Array.isArray(dailyExercises) && dailyExercises.every((hours) => (typeof hours === "number") && !Number.isNaN(hours)) && !isNaN(Number(target)));

  if (!inputExist) {
    res.status(400).send({error: "parameters missing"});
  }
  if (!inputIsValidType) {
    res.status(400).send({ error: "malformatted parameters" });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(calculateExercises(dailyExercises, target));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});