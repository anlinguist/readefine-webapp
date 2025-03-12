import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContext";
import Section1 from "../Sections/Section1";

function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      navigate(`/personal-dictionary`);
    }
  });
  return (
    <>
      {!loading &&
      <Section1 />
      }
      {
        loading &&
        <div className="loginloading">
          <div className="loading"></div>
        </div>
      }
    </>
  );
}
export default Login;