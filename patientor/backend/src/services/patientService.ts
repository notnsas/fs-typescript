import { v1 as uuid } from 'uuid';
// import { stringify } from 'uuid';
import { patients } from '../../data/entries.ts';
import type { Patients, NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types.ts';

const getEntries = () : Patients => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,    
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: id,
    ...entry  
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
};