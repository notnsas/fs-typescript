import { assertNever } from "./utils";
import { Entry } from "../../types";

import HealthCheck from "./HealthCheck";
import OccupationalHealthcare from "./OccupationalHealthcare";
import Hospital from "./Hospital";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;