import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useEffect, useState } from "react";
import diagnosesService from '../../services/diagnoses';

import type { Diagnosis } from "../../types";

interface Props {
  diagnosisCodes: string[];
  handleDiagnosisCodesChange: (event: SelectChangeEvent<string[]>) => void;
}

const EntryDialogContentBase = ({ diagnosisCodes, handleDiagnosisCodesChange }: Props) => {  
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
    
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const allDiagnosis = await diagnosesService.getAll();
      setDiagnosis(allDiagnosis);
    };

    fetchDiagnosis();
  }, []);
  return (
    <>
      <TextField
        autoFocus
        required
        margin="dense"
        id="date"
        name="date"
        label="Date"
        type="date"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="description"
        name="description"
        label="Description"
        type="text"
        fullWidth
        variant="standard"
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="specialist"
        name="specialist"
        label="Specialist"
        type="text"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "1em" }}
      />
      <InputLabel id="demo-multiple-name-label">Diagnosis Code</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="diagnosisCode"
          name="diagnosisCode"
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          input={<OutlinedInput label="Name" />}
          sx={{ marginBottom: "1em" }}
          // MenuProps={diagnosisMenuProps}
        >
          {diagnosis?.map((diagnose) => (
            <MenuItem
              key={diagnose.code}
              value={diagnose.code}
              // style={getStyles(name, personName, theme)}
            >
              {diagnose.code} {diagnose.name}
            </MenuItem>
          ))}
        </Select>
    </>
  );
};

export default EntryDialogContentBase;