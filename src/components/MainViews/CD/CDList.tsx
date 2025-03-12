import { Button } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RDFNContext } from "../../../RDFNContext";
import SearchInput from "../../Search/SearchInput"; // Adjust import path as needed
import CDListItem from "./CDListItem";

function CDList() {
  // @ts-expect-error TS(2339): Property 'dictionaryName' does not exist on type 'unknown'.
  const { domains, setDomains, dictionaryName } = useContext(RDFNContext);
  const [dictQ, setDictQ] = useState("");
  const virtuosoRef = useRef<VirtuosoHandle>(null);

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

  useEffect(() => {
    if (dictionaryName && virtuosoRef.current) {
      const index = dictionariesData.findIndex(([name]) => name === dictionaryName);
      if (index > -1) {
        virtuosoRef.current.scrollToIndex({
          index,
          align: "start",
          behavior: "smooth",
        });
      }
    }
  }, [dictionaryName, dictionariesData]);





  const createNewDict = () => {
    openContextModal({
      modal: "new-dictionary",
      title: "New community dictionary",
      size: "sm",
      centered: true,
      innerProps: {},
    });
  };

  return (
    <div id="cds_list_container" className={`${
      dictionaryName ? "dictselected" : "dictnotselected"
    }`} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Button styles={{
        root: {
          padding: '5px',
          boxSizing: 'content-box'
        },
        label: {
          fontSize: 'var(--mantine-font-size-md)'
        }
      }} onClick={createNewDict} mt={0} mb={10} autoContrast color="rdfnyellow.6"  leftSection={<MdOutlineCreateNewFolder size={20} />} variant="filled" radius="md">
        New dictionary
      </Button>
      <div
        id="cds_list"
        className={`${
          dictionaryName ? "dictselected" : "dictnotselected"
        }`}
        style={{ position: "relative", flex: "1" }}
      >
        <Virtuoso
          ref={virtuosoRef}
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
              <CDListItem dictName={dictName} isEnabled={isEnabled} />
            );
          }}
        />
      </div>
    </div>
  );
}

export default CDList;