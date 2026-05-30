import EntryDialogContentBase from "./EntryDialogContentBase";
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface Props {
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  healthCheckRating: string;
  handleHealthCheckRatingChange: (event: SelectChangeEvent) => void;
  diagnosisCodes: string[];
  handleDiagnosisCodesChange: (event: SelectChangeEvent<string[]>) => void;
}

const EntryDialogContent = ({type, healthCheckRating, handleHealthCheckRatingChange, diagnosisCodes, handleDiagnosisCodesChange}: Props) => {

  console.log('type in EntryDialogContent', type);
  switch (type) {
    case 'HealthCheck':
      return (
        <>
          <EntryDialogContentBase diagnosisCodes={diagnosisCodes} handleDiagnosisCodesChange={handleDiagnosisCodesChange} />
          
          <InputLabel id="demo-multiple-name-label">Health Check Rating:</InputLabel>
          <Select
            labelId="healthCheckRating-label"
            id="healthCheckRating"
            name="healthCheckRating"
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={handleHealthCheckRatingChange}
          >
            <MenuItem value="0">0 -- Healthy</MenuItem>
            <MenuItem value="1">1 -- Low Risk</MenuItem>
            <MenuItem value="2">2 -- High Risk</MenuItem>
            <MenuItem value="3">3 -- Critical Risk</MenuItem>
          </Select>
        </>
      );
    case 'Hospital':
      return (
        <>
          <EntryDialogContentBase diagnosisCodes={diagnosisCodes} handleDiagnosisCodesChange={handleDiagnosisCodesChange} />
          <h3>Discharge information:</h3>
          <TextField
            autoFocus
            required
            margin="dense"
            id="dischargeDate"
            name="dischargeDate"
            label="Discharge Date"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="employerName"
            name="employerName"
            label="Employer Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </>
      );
    case 'OccupationalHealthcare':
      return (
        <>
          <EntryDialogContentBase diagnosisCodes={diagnosisCodes} handleDiagnosisCodesChange={handleDiagnosisCodesChange} />
          <TextField
            autoFocus
            required
            margin="dense"
            id="employerName"
            name="employerName"
            label="Employer Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <h3>Sick Leave information:</h3>
          <TextField
            autoFocus
            required
            margin="dense"
            id="sickLeaveStartDate"
            name="sickLeaveStartDate"
            label="Sick Leave Start Date"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="sickLeaveEndDate"
            name="sickLeaveEndDate"
            label="Sick Leave End Date"
            type="date"
            fullWidth
            variant="standard"
          />
        </>
        
      );
  }
};

export default EntryDialogContent;