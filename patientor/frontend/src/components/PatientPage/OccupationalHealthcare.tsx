import { OccupationalHealthcareEntry } from "../../types";
import { Typography, Card, CardContent } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
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
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Diagnosed by {entry.specialist}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Employer is the {entry.employerName}
          </Typography>
          <br />
          <WorkIcon />
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationalHealthcare;