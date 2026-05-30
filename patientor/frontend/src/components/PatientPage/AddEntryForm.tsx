import { Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import patientService from "../../services/patients";
import { useNotificationActions } from '../../store';
import axios from 'axios';
import { assertNever } from './utils';

import { Entry, HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema, Diagnosis } from '../../types';

import * as z from 'zod';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import EntryDialogContent from './EntryDialogContent';

interface Props {
  id: string;
  entries: Entry[] | undefined;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | undefined>>;
}

const AddEntryForm = ({ id, entries, setEntries }: Props) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'>('HealthCheck');
  const [healthCheckRating, setHealthCheckRating] = useState<"0" | "1" | "2" | "3">("0");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);
  
  const { setNotification } = useNotificationActions();

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  console.log('diagnosisCodes in AddEntryForm', diagnosisCodes);  

  const handleHealthCheckRatingChange = (event: SelectChangeEvent) => {
    setHealthCheckRating(event.target.value as "0" | "1" | "2" | "3");
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log('event.target.value', event.target.value);
    setType(event.target.value as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare');
    console.log('type', type);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData).entries());

    console.log('formJson', formJson);

    let EntrySchema;
    let newEntry;
    switch (type) {
      case 'HealthCheck':
        EntrySchema = HealthCheckEntrySchema;
        newEntry = {
          ...formJson,
          type: "HealthCheck",
          healthCheckRating: Number(formJson.healthCheckRating),
          diagnosisCodes: diagnosisCodes
            // .split(",")
            // .map(code => code.trim())
        };
        break;
      case 'Hospital':
        EntrySchema = HospitalEntrySchema;
        newEntry = {
          ...formJson,
          type: "Hospital",
          discharge: {
            date: String(formJson.dischargeDate),
            criteria: String(formJson.dischargeCriteria)
          },
          diagnosisCodes: diagnosisCodes
        };
        break;
      case 'OccupationalHealthcare':
        EntrySchema = OccupationalHealthcareEntrySchema;
        newEntry = {
          ...formJson,
          type: "OccupationalHealthcare",
          employerName: String(formJson.employerName),
          sickLeave: {
            startDate: String(formJson.startDate),
            endDate: String(formJson.endDate)
          },
          diagnosisCodes: diagnosisCodes
        };
        break;
      default:
        assertNever(type);
    }
    
    // const newEntry = {
    //   ...formJson,
    //   type: "HealthCheck",
    //   healthCheckRating: Number(formJson.healthCheckRating),
    //   diagnosisCode: String(formJson.diagnosisCode)
    //     .split(",")
    //     .map(code => code.trim())
    // };

    console.log('id in form', id);
    console.log("newEntry", newEntry);
    
    if (!EntrySchema) {
      return;
    }

    try {
      const safeNewEntry = EntrySchema.parse(newEntry);
      console.log('safeNewEntry', safeNewEntry);
      const createdEntry = await patientService.createEntries(id, safeNewEntry);

      console.log('createdEntry', createdEntry);
      if (entries != null) {  
        setEntries([...entries, createdEntry]);
      }
    } catch(error) {
      if (error instanceof z.ZodError) {
        setNotification(`Error: Incorrect ${error.issues[0].path}: ${error.issues[0].message}`);
      } else if (axios.isAxiosError(error)) {
        setNotification(`Error: Incorrect ${error.response?.data.error[0].format}: ${error.response?.data.error[0].message}`);
      } else {
        console.error(error);
      }
    }
    
    handleClose();
  };

  return (
    <Fragment>
      <Button onClick={handleClickOpen} variant="contained">Add New Entry</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the field below to add entries
          </DialogContentText>
          <form onSubmit={handleSubmit} id="healthcheck-form">
            <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={type}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
              </Select>
            </FormControl>
            <EntryDialogContent type={type} healthCheckRating={healthCheckRating} handleHealthCheckRatingChange={handleHealthCheckRatingChange} diagnosisCodes={diagnosisCodes} handleDiagnosisCodesChange={handleDiagnosisCodesChange} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="healthcheck-form">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default AddEntryForm;