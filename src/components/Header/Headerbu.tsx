import MainLogo from "../Logo/main_logo";
import DemoToggle from "./DemoToggle";
import { useAuth } from "../../contexts/AuthContext";

function Headerbu() {
  const { user } = useAuth();

  return (
    <div id="header-container">
      <div style={{maxWidth: '120px'}}>
        <MainLogo />
      </div>
      {
        !user &&
        <DemoToggle />
      }
    </div>
  );
}

export default Headerbu;