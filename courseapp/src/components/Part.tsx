import type { CoursePart } from "../App";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface ContentProps {
  part: CoursePart;
}

const Part = ({ part }: ContentProps) => {
  const partContent = () => {
      switch (part.kind) {
        case "basic":
          return (
          <div>
            <p>
              {part.description}
            </p>
          </div>
          )
        case "group":
          return (
          <div>
            <p>
              project exercises {part.groupProjectCount}
            </p>
          </div>
          )
        case "background":
          return (
          <div>
            <p>
              {part.description}
            </p>
            <p>
              submit to {part.backgroundMaterial}
            </p>
          </div>
          )
        case "special":
          return (
          <div>
            <p>
              {part.description}
            </p>
            <p>
              required skills: {part.requirements.map((req, index) => (<span key={index}>{req}{(index !== part.requirements.length - 1) ? "," : ""} </span>))}
            </p>
          </div>
          )
        default:
          return assertNever(part);
  }}

  return (
    <div>
      <h3>{part.name} {part.exerciseCount}</h3> 
      {partContent()}
    </div>
  )
}

export default Part