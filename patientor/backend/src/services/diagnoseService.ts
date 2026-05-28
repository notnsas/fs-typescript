import { diagnoses } from '../../data/entries.ts';
import type { Diagnosis } from '../types.ts';
// import typeNonSensitiveDiaryEntry

const getEntries = () : Diagnosis => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};