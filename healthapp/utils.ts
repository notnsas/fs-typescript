export const checkInputNan = (args: string[]) => args.slice(2).some((arg: string) => isNaN(Number(arg)));

export const inputNotNumberError = new Error('Provided values were not numbers!');

export const ErrorCatcher = (error: unknown) => {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkExist = (var1: any, var2: any) => {
  const inputExist = (typeof var1 !== 'undefined' && typeof var2 !== 'undefined');

  return inputExist;
};