import { diagnoses } from '../../data/entries.ts';
import type { Diagnosis } from '../types.ts';
// import typeNonSensitiveDiaryEntry

const getEntries = () : Diagnosis[] => {
  return diagnoses;
};

const getEntry = (id: string): Diagnosis | undefined => {
  return diagnoses.find((diagnosis) => diagnosis.code === id);
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  getEntry,
  addDiagnose
};