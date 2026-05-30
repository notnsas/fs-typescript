import { Patient, Entry } from "../../types";

import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { apiBaseUrl } from "../../constants";
import patientsService from "../../services/patients";

const PatientPage = () => {
  const id = useParams().id;
  // console.log("patient", patient);
  // const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [entries, setEntries] = useState<Entry[]>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatient = async (id: string) => {
      // const newDiagnosis = await diagnosesService.getAll();
      // setDiagnoses(newDiagnosis);
      const data = await patientsService.get(id);
      
      setPatient(data);
      setEntries(data?.entries);
    };
    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

  // const getDiagnosis = (diagnosisCode: string) => {
  //   const diagnosis = diagnoses?.filter((diagnosis) => (diagnosis.code === diagnosisCode))[0];
  //   console.log('diagnosis in func', diagnosis);
  //   return diagnosis;
  // };
  

  if (patient == null) {
    return (
      <div>
        No data bruh no patient with that number
      </div>
    );
  }
  console.log('patient', patient);
  return (
    <div>
      <h2>{patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>

      <br />

      <h3>entries</h3>
      {entries?.map((entry)=> (
        <EntryDetails key={entry.id} entry={entry}/>
      ))}
      <br />
      
      <AddEntryForm id={patient.id} entries={entries} setEntries={setEntries}/>
    </div>
  );
};

export default PatientPage;