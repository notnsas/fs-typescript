import type { Patient } from "../types.ts";

export const getPatient = (patients: Patient[], patientId: string) => {
  console.log("Fetching patient with ID:", patientId);
  console.log("patients:", patients);
  const patient = patients.filter((patient) => (patient.id === patientId))[0];
  console.log("Found patient:", patient);
  return patient;
};