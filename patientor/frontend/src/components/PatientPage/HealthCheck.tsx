import { HealthCheckEntry } from "../../types";
import { Typography, Card, CardContent } from "@mui/material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
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
          <br />
          <MonitorHeartIcon />
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthCheck;