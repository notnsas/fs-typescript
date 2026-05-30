import { z } from 'zod';

export const Gender = {
  Female: 'female',
  Male: 'male',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// export type Diagnosis = DiagnoseEntry;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type Patients = PatientEntry[];

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  // entries: z.array(z.string())
});


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  type: z.enum(["HealthCheck", "Hospital", "OccupationalHealthcare"])
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ])
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;