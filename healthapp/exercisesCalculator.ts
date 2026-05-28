import { checkInputNan, inputNotNumberError, ErrorCatcher } from "./utils.ts";

interface ExercisesInput {
  dailyExerciseHours: number[];
  target: number;
}

const exercisesParseArguments = (args: string[]): ExercisesInput => {
  if (args.length < 4) throw new Error('Doesnt have argument');

  const isInputNan = checkInputNan(args);

  if (!isInputNan) {
    return {
      dailyExerciseHours: args.slice(2, -1).map((arg) => Number(arg)),
      target: Number(args.slice(-1))
    };
  } else {
    throw inputNotNumberError;
  }
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult =>  {
  const periodLength = dailyExerciseHours.length;
  
  const trainingDays = dailyExerciseHours.reduce(
    (accumulator, currentValue) => accumulator + (currentValue !== 0 ? 1 : 0),
    0,
  );

  const average = dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
  const success = (average >= target);
  const rating = Math.round((average / target) * 3);
  
  const ratingExplanation = 'its the round up number of average divided by the target, multiplied by 3. ';
  const concatExplanation = (isRatingGoodText: string) => ratingExplanation + isRatingGoodText;
  const ratingDescription = 
   (rating <= 1) ? concatExplanation('Your performance is bad you shouldve reflected more') :
   (rating <= 2) ? concatExplanation('Your performance is not too bad but could be better') : 
   concatExplanation('Your performance is really good keep it up');
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { dailyExerciseHours, target } = exercisesParseArguments(process.argv);
    console.log('dailyExerciseHours', dailyExerciseHours);
    console.log('target', target);
    console.log(calculateExercises(dailyExerciseHours, target));
  } catch (error: unknown) {
    ErrorCatcher(error);
  }
}

export default calculateExercises;