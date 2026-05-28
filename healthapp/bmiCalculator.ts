import { checkInputNan, ErrorCatcher, inputNotNumberError } from "./utils.ts";

interface BmiInput {
  weight: number;
  height: number;
}

const bmiParseArguments = (args: string[]): BmiInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const isInputNan = checkInputNan(args);

  if (!isInputNan) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    };
  } else {
    throw inputNotNumberError;
  }
};

type BmiCategories =
  | 'Underweight (Severe thinness)'
  | 'Underweight (Moderate thinness)'
  | 'Underweight (Mild thinness)'
  | 'Normal range'
  | 'Overweight (Pre-obese)'
  | 'Obese (Class I)'
  | 'Obese (Class II)'
  | 'Obese (Class III)';

const calculateBmi = (height: number, weight: number): BmiCategories =>  {
  const bmi = weight / ( height / 100 ) ** 2;
  
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { weight, height } = bmiParseArguments(process.argv);
    console.log(calculateBmi(weight, height));
  } catch (error: unknown) {
    ErrorCatcher(error);
  }
}

export default calculateBmi;