import { useContext, useMemo, useState } from "react";
import { RDFNContext } from "../../../RDFNContext";
import { useAuth } from "../../../contexts/AuthContext";
import { LoadingOverlay, Switch, Title } from "@mantine/core";
import { Virtuoso } from "react-virtuoso";
import SearchInput from "../../Search/SearchInput";

const OBCD = (props: any) => {
  // @ts-expect-error TS(2339): Property 'domains' does not exist on type '() => a... Remove this comment to see the full error message
  const { domains, setDomains } = useContext(RDFNContext);
  const { makeRdfnRequest } = useAuth();
  const [dictQ, setDictQ] = useState("");
  const [toggling, setToggling] = useState(false);
  // eslint-disable-next-line
  (Array.prototype as any).remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };

  const toggleCD = async (e: any, dict: any) => {
    setToggling(true);
    let cUDomains = domains['UDomains']
    if (e.target.checked) {
      cUDomains.push(dict)
    }
    else {
      cUDomains.remove(dict)
    }
    let raw = {
      "readefineAddons": cUDomains
    }

    const path = '/user/details';
    const enable_response = await makeRdfnRequest(path, 'POST', {}, raw);
    const enable_data = await enable_response.json();
    setDomains({ UDomains: enable_data['readefineAddons'], NUDomains: enable_data['disabledAddons'] })
    setToggling(false);
  }

  if (props.currentStep !== 7) {
    return null;
  }

  const allDictionaries = useMemo(() => {
    if (!domains) return [];
    const { UDomains = [], NUDomains = [] } = domains;
    const combined = [
      ...UDomains.map((name: string) => ({ name, enabled: true })),
      ...NUDomains.map((name: string) => ({ name, enabled: false })),
    ];
    return combined.filter((dict) =>
      dict.name.toLowerCase().includes(dictQ.toLowerCase())
    );
  }, [domains, dictQ]);

  const dictionariesData = useMemo(() => {
    return [
      ["__search_bar__"],
      ...allDictionaries.map((dict) => [dict.name, dict.enabled]),
    ];
  }, [allDictionaries]);

  const changedict = (e: React.MouseEvent<HTMLDivElement>, dictName: string) => {
    const switchRoot = (e.target as HTMLElement).closest(".mantine-Switch-root");
    if (switchRoot) {
      return;
    }
    window.open(`/community-dictionaries/${dictName}`, '_blank');
  };

  return (
    <div className='rdfn-onboarding-desc-wider enable-dictionaries'>
      <Title m={"auto"} ta={'center'} fw={'unset'} mb={'10px'} order={1}>Enable Community Dictionaries</Title>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <p>You can enable any Community Dictionary or make your own. These are created by Readefine users to target a specific kind of language.</p>
        <div id='rdfn-ob-cd-list'>
          <LoadingOverlay visible={toggling} loaderProps={{ color: "rdfnyellow.6" }} />
          <Virtuoso
            data={dictionariesData}
            style={{ height: "100%", width: "100%" }}
            topItemCount={1}
            itemContent={(_, item) => {
              if (item[0] === "__search_bar__") {
                return (
                  <SearchInput
                    q={dictQ}
                    setQ={setDictQ}
                    placeholder="Search Dictionaries"
                    noBorder
                  />
                );
              }
              const [dictName, isEnabled] = item;
              return (
                <div
                  key={dictName}
                  onClick={(e) => changedict(e, dictName as string)}
                  className={
                    "cds user_enabled_cd "
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="cds_title">{dictName}</div>
                  <Switch
                    checked={Boolean(isEnabled)}
                    onChange={(e) => toggleCD(e, dictName as string)}
                    color="rdfnyellow.6"
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
    </div>
  )
};

export default OBCD