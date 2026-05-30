import { HospitalEntry } from "../../types";
import { Typography, Card, CardContent } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {entry.date} 
          </Typography>
          <Typography variant="body2">
            {entry.description}
          </Typography>
          <Typography variant="body2">
            {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Diagnosed by {entry.specialist}
          </Typography>
          <br />
          <LocalHospitalIcon />
        </CardContent>
      </Card>
    </div>
  );
};

export default Hospital;