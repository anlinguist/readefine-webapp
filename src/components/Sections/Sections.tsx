import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import "./Sections.css";

function Sections() {
  return (
    <div id="sections-container">
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}

export default Sections;