import "./CD.css";
import { useState, useEffect, useContext } from "react";
import DictionaryRow from "../../Dictionary_Row";
import { Virtuoso } from 'react-virtuoso';
import { CgPlayListAdd } from 'react-icons/cg';
import { useNavigate, useParams } from "react-router-dom";
import { RDFNContext } from "../../../RDFNContext";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../../contexts/AuthContext";
import { Group, Title } from "@mantine/core";
import Upload from "../../Buttons/Upload";
import Add from "../../Buttons/Add";
import Download from "../../Buttons/NewDownload";
import SearchInput from "../../Search/SearchInput";
import BackToDictionaries from "../../Buttons/BackToDictionaries";
import { openContextModal } from "@mantine/modals";
import CDList from "./CDList";

function CD() {
  // @ts-expect-error TS(2339): Property 'animateScroll' does not exist on type 'u... Remove this comment to see the full error message
  const { dictionaryContent, dictionaryName, dictLoading, domains, downloadLink, editable, setDictionaryContent, setDictionaryName, setDictionaryType, setDictLoading, setDomains, setDownloadLink, setEditable } = useContext(RDFNContext);
  const { makeRdfnRequest, user } = useAuth();
  const navigate = useNavigate();
  const { selectedCD } = useParams();
  const [q, setQ] = useState("");
  const [searchParam] = useState(["original"]);

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
  },
    backtocdlist = () => {
      setDictionaryName('');
      navigate(`/community-dictionaries`)
    },
    addToCDContainer = () => {
      openContextModal({
        modal: "add-readefinition",
        title: "Add a Readefinition",
        size: "sm",
        centered: true,
        innerProps: {},
      });
    },
    uploadToCDContainer = () => {
      openContextModal({
        modal: "upload-readefinitions",
        title: "Upload a .tsv Dictionary",
        size: "xl",
        centered: true,
        innerProps: {},
      });
    };

  useEffect(() => {
    const fetch_data = async () => {
      if (selectedCD === '' || selectedCD === undefined) {
        return;
      }
      setDictionaryType("addon");
      setDictionaryName(selectedCD);
      setEditable(false);
      setDictLoading(true);
      setDictionaryContent([]);
      let postInfo = {
        method: 'GET',
        headers: {
          "dictionary": selectedCD
        }
      };
      const path = '/dictionary/readefinitions';
      const response = await makeRdfnRequest(path, 'GET', postInfo.headers, null);
      let data = await response.json();
      let readefineCommunityDictionary = data['readefinitions'];
      if (readefineCommunityDictionary) {
        readefineCommunityDictionary.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }));
        setDictionaryContent(readefineCommunityDictionary);
        let output = '';
        for (let i in readefineCommunityDictionary) {
          output = output + readefineCommunityDictionary[i]['original'] + "\t" + readefineCommunityDictionary[i]['target'] + "\t" + (readefineCommunityDictionary[i]['definition'] ? readefineCommunityDictionary[i]['definition'] : '') + "\t" + (readefineCommunityDictionary[i]['link'] ? readefineCommunityDictionary[i]['link'] : '') + "\n";
        }
        setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
        setDictLoading(false);
      }
      if (data['admin']) {
        setEditable(true);
      }
    };
    if (user && (domains['UDomains'] || domains['NUDomains'])) {
      fetch_data().catch(console.error);
    }
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.metaKey && e.keyCode === 70))) {
        e.preventDefault();
        (document.querySelector('#search-form') as any).focus();
      }
    });
  }, [user, domains, navigate]);


  return (
    <div id="community_dictionaries" className="checkedbyreadefine row">
      <Helmet>
        <title>Community Dictionary: {selectedCD}</title>
      </Helmet>
      <CDList />
      <div id="cd_view_container" className={'dictselected'}>
        {
          !dictLoading &&
          <>
            <div className="main" id="cd_dictionary_container">
              <div id="readefine_cd" className={"dictionary_container " + dictLoading}>
                <Group >
                  <BackToDictionaries back={backtocdlist} label="Back to Community Dictionaries" />
                  <Title m={"auto"} flex={1} fw={'unset'} mb={'10px'} order={1}>{`${selectedCD}`}</Title>
                </Group>
                <Group mb={"10px"}>
                  <SearchInput q={q} setQ={setQ} placeholder={`Search ${dictionaryName} Readefinitions`} />
                  <Download permissionLevels={editable ? 'editable' : 'noneditable'} link={downloadLink} doc_title={encodeURI(dictionaryName) + '_readefine_CD.tsv'} />
                  {
                    editable &&
                    <>
                      <Upload upload={uploadToCDContainer} />
                      <Add add={addToCDContainer} label={"Add a Readefinition"} />
                    </>
                  }
                </Group>
                <div id="cd_readefinitions_container">
                  {
                    dictionaryContent.length > 0 &&
                    <Virtuoso
                      data={search(dictionaryContent)}
                      increaseViewportBy={200}
                      itemContent={(index, item) => {
                        return (
                          <DictionaryRow className={index % 2 === 0 ? "RowEven" : "RowOdd"} key={item.index} index={item.index} target={item.target} original={item.original} definition={item['definition'] ? item['definition'] : ''} link={item['link'] ? item['link'] : ''} />
                        )
                      }}
                    />
                  }
                  {
                    dictionaryContent.length === 0 &&
                    editable &&
                    <div className="emptyrdfndict" onClick={(() => addToCDContainer())}>
                      <CgPlayListAdd className="emptyrdfndicticon" />
                      <div className="emptyrdfndicttxt">This dictionary has no Readefinitions. Click here to add one!</div>
                    </div>
                  }
                  {
                    dictionaryContent.length === 0 &&
                    !editable &&
                    <div className="emptyrdfndict noneditable">
                      <CgPlayListAdd className="emptyrdfndicticon" />
                      <div className="emptyrdfndicttxt">This dictionary has no Readefinitions.</div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </>
        }
        <div id="dictionary_loader" className={dictLoading ? 'dict-loading' : ''}><div className="loading"></div></div>
      </div>
    </div>
  );
}
export default CD;