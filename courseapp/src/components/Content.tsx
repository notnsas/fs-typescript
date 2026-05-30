import Part from "./Part";
import type { CoursePart } from "../App";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} part={part}/>
      ))}
    </div>
  )
}

export default Content