import { z } from 'zod';

export const Gender = {
  Female: 'female',
  Male: 'male',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];


export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type Diagnosis = DiagnoseEntry[];


export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: number;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type Patients = PatientEntry[];







