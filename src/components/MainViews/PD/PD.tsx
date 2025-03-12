import "./PD.css";
import { useState, useEffect, useContext } from "react";
import DictionaryRow from "../../Dictionary_Row";
import { Virtuoso } from 'react-virtuoso';
import { RDFNContext } from "../../../RDFNContext";
import PDEmpty from "./PDEmpty";
import { Helmet } from "react-helmet-async";
import Download from "../../Buttons/NewDownload";
import { Center, Group, Title } from "@mantine/core";
import Upload from "../../Buttons/Upload";
import Add from "../../Buttons/Add";
import SearchInput from "../../Search/SearchInput";
import { openContextModal } from "@mantine/modals";

function PD() {
  // @ts-expect-error TS(2339): Property 'dictLoading' does not exist on type 'unk... Remove this comment to see the full error message
  const { dictLoading, dictionaryContent, setDictionaryType, setEditable } = useContext(RDFNContext)

  const [q, setQ] = useState(""),
    [searchParam] = useState(["original"]);
  const search = (items: any) => {
    let a = items.filter((item: any, index: any) => {
      return searchParam.some(function (newItem) {
        if (item[newItem].toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) > -1) {
          items[index]['index'] = index
          return (items[index])
        }
        return false;
      });
    });
    return a
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.metaKey && e.keyCode === 70))) {
        e.preventDefault();
        (document.querySelector('#search-form') as any).focus();
      }
    });
  }, []);

  useEffect(() => {
    setDictionaryType("user");
    setEditable(true);
  }, [setDictionaryType, setEditable]);

  const addToPDContainer = () => {
    openContextModal({
      modal: "add-readefinition",
      title: "Add a Readefinition",
      size: "sm",
      centered: true,
      innerProps: {},
    });
  }

  const uploadToPDContainer = () => {
    openContextModal({
      modal: "upload-readefinitions",
      title: "Upload a .tsv Dictionary",
      size: "xl",
      centered: true,
      innerProps: {},
    });
  }

  return (
    <>

      <div id="personal_dictionary" className="checkedbyreadefine row">
        <Center >
          <Title fw={'unset'} mb={'10px'} order={1}>Personal Dictionary</Title>
        </Center>
        <Helmet>
          <title>Personal Dictionary</title>
        </Helmet>
        {/* main dictionary viewer */}
        {
          !dictLoading &&
          <div className="main" id="pd_dictionary_container">
            <div id="readefine_pd" className={"dictionary_container" + (dictLoading ? ' dict-loading' : '')}>
              <Group mb={"10px"} style={{ flexWrap: 'nowrap' }}>
                <SearchInput q={q} setQ={setQ} />
                <Download doc_title='personal_dictionary.tsv' />
                <Upload upload={uploadToPDContainer} />
                <Add add={addToPDContainer} label={"Add a Readefinition"} />
              </Group>

              <div id="pd_readefinitions_container">
                {
                  dictionaryContent.length > 0 &&
                  <Virtuoso
                    data={search(dictionaryContent)}
                    increaseViewportBy={200}
                    itemContent={(index, item) => (
                      <DictionaryRow className={index % 2 === 0 ? "RowEven" : "RowOdd"} key={item.index} index={item.index} target={item.target} original={item.original} definition={item['definition'] ? item['definition'] : ''} link={item['link'] ? item['link'] : ''} />
                    )}
                  />
                }
                {
                  dictionaryContent.length === 0 &&
                  <PDEmpty />
                }
              </div>
            </div>
          </div>
        }
        <div id="dictionary_loader" className={dictLoading ? 'dict-loading' : ''}><div className="loading"></div></div>
      </div>
    </>
  );
}
export default PD;