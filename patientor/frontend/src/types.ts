import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Discharge {
  date: string;
  criteria:string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}
export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// export const HealthCheckSchema = z.object({
//   date: z.string(),
//   description: z.string(),
//   specialist: z.string(),
//   type: z.literal("HealthCheck"),
//   healthCheckRating: z.union([
//     z.literal(HealthCheckRating.Healthy),
//     z.literal(HealthCheckRating.LowRisk),
//     z.literal(HealthCheckRating.HighRisk),
//     z.literal(HealthCheckRating.CriticalRisk),
//   ]),
//   diagnosisCodes: z.array(z.string()).optional()
// });


export const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
  // type: z.enum(["HealthCheck", "Hospital", "OccupationalHealthcare"])
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
  ]),
  type: z.literal("HealthCheck")
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  }),
  type: z.literal("Hospital")
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional(),
  type: z.literal("OccupationalHealthcare")
});