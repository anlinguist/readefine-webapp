import { useNavigate } from "react-router-dom";
import { RDFNContext } from "../../../RDFNContext";
import { useContext, useState } from "react";
import { LoadingOverlay, Switch } from "@mantine/core";
import { useAuth } from "../../../contexts/AuthContext";

function CDListItem({dictName, isEnabled}: any) {
    // @ts-expect-error TS(2339): Property 'enabling' does not exist on type 'unknown'.
    const { domains, setDomains, dictionaryName } = useContext(RDFNContext);
    const navigate = useNavigate();
      const { makeRdfnRequest } = useAuth();
    const [enabling, setEnabling] = useState(false);

      const changedict = (e: React.MouseEvent<HTMLDivElement>, dictName: string) => {
        const switchRoot = (e.target as HTMLElement).closest(".mantine-Switch-root");
        if (switchRoot) {
          return;
        }
        navigate(`/community-dictionaries/${dictName}`);
      };

        const toggleCD = async (e: React.ChangeEvent<HTMLInputElement>, dictName: string) => {
          setEnabling(true);
          const enabled = e.target.checked;
          let { UDomains = [], NUDomains = [] } = domains || {};
      
          if (enabled) {
            NUDomains = NUDomains.filter((d: string) => d !== dictName);
            if (!UDomains.includes(dictName)) UDomains.push(dictName);
          } else {
            UDomains = UDomains.filter((d: string) => d !== dictName);
            if (!NUDomains.includes(dictName)) NUDomains.push(dictName);
          }
          const raw = {
            readefineAddons: UDomains,
          };
          const path = "/user/details";
          const enable_response = await makeRdfnRequest(path, "POST", {}, raw);
          const enable_data = await enable_response.json();
          setDomains({
            UDomains: enable_data["readefineAddons"],
            NUDomains: enable_data["disabledAddons"],
          });
          setEnabling(false);
        };
    return (
        <div
            key={dictName}
            onClick={(e) => changedict(e, dictName as string)}
            className={
                "cds user_enabled_cd " +
                (dictionaryName === dictName ? "selected" : "")
            }
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative"
            }}
        >
            <LoadingOverlay visible={enabling} loaderProps={{ color: "rdfnyellow.6" }} />
            <div className="cds_title">{dictName}</div>
            <Switch
                checked={Boolean(isEnabled)}
                onChange={(e) => toggleCD(e, dictName as string)}
                color="rdfnyellow.6"
            />
        </div>
    )
}

export default CDListItem