// import { Gender, type NewPatientEntry } from './types.ts';
// import { z } from 'zod';

// export const NewEntrySchema = z.object({
//   name: z.string(),
//   dateOfBirth: z.string().date(),
//   ssn: z.string(),
//   gender: z.nativeEnum(Gender),
//   occupation: z.string()
// });

// const NewEntrySchema = z.object({
//   weather: z.enum(Weather),
//   visibility: z.enum(Visibility),
//   date: z.iso.date(),
//   comment: z.string().optional()
// });

// export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
//   return NewEntrySchema.parse(object);
// };