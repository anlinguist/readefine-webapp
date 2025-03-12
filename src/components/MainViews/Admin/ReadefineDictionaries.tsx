import Download from "../../Buttons/Download";
import { useState, useEffect, useContext } from 'react'
import DictionaryRow from "../../Dictionary_Row";
import { Virtuoso } from 'react-virtuoso';
import "./RD.css";
import { RDFNContext } from "../../../RDFNContext";
import { useAuth } from "../../../contexts/AuthContext";

function ReadefineDictionaries() {
  const [readefineDictionary, setReadefineDictionary] = useState([]),
    [addingWord, setAddingWord] = useState(''),
    [dictLoading, setDictLoading] = useState('dict-loading'),
    [q, setQ] = useState(""),
    [searchParam] = useState(["original"]),
    [showClearSearch, setShowClearSearch] = useState('hidden'),
    [dictionaryToSee, setDictionaryToSee] = useState<boolean | string>(false),
    [dictSelected, setDictSelected] = useState('dictnotselected'),
    [permissionLevels, setPermissionLevels] = useState('');

  // @ts-expect-error TS(2339): Property 'downloadLink' does not exist on type 'un... Remove this comment to see the full error message
  const { downloadLink, setDownloadLink } = useContext(RDFNContext);
  const { makeRdfnRequest } = useAuth();

  const readefineDictionaries = ['Main', 'US', 'UK']

  useEffect(() => {
    let dict_url = window.location.pathname.replace("/admin/readefine-dictionaries", "");
    dict_url = dict_url.replaceAll("/", "");
    if (!dictionaryToSee) {
      if (dict_url.length > 0) {
        setDictSelected('dictselected');
        setDictionaryToSee(decodeURI(dict_url));
      }
      else {
        setDictionaryToSee('Main');
      }
    }
    // if (dictionaryToSee !== 'Main') {
    //   setPermissionLevels('noneditable')
    // }
    // else {
    //   setPermissionLevels('editable')
    // }
    setPermissionLevels('editable');
    let fetch_data = async () => {
      if (dictionaryToSee) {
        setDictLoading('dict-loading');
        setReadefineDictionary([]);
        // obtain dictionaryToSee and set it to readefineDictionary
        var requestOptions = {
          method: 'GET',
          headers: {
            'dictionary': dictionaryToSee
          },
          redirect: 'follow'
        };
        let path = `/dictionary/readefinitions`;
        let rawResp = await makeRdfnRequest(path, 'GET', requestOptions.headers, null);
        let data = await rawResp.json();
        let readefineCommunityDictionary = data['readefinitions'];
        if (readefineCommunityDictionary) {
          readefineCommunityDictionary.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }));
          setReadefineDictionary(readefineCommunityDictionary);
          let output = '';
          for (var i = 0, len = readefineCommunityDictionary.length; i < len; i++) {
            output = output + readefineCommunityDictionary[i]['original'] + "\t" + readefineCommunityDictionary[i]['target'] + "\t" + (readefineCommunityDictionary[i]['definition'] ? readefineCommunityDictionary[i]['definition'] : '') + "\t" + (readefineCommunityDictionary[i]['link'] ? readefineCommunityDictionary[i]['link'] : '') + "\n";
          }
          setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
          setDictLoading('');
        }
      }
    };
    fetch_data().catch(console.error);
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70) || (e.metaKey && e.keyCode === 70))) {
        e.preventDefault();
        (document.querySelector('#search-form') as any).focus();
      }
    });
  }, [dictionaryToSee]);

  const submitNewReadefinition = async (e: any) => {
    e.preventDefault()
    let o = (document.querySelector("#addwordtod-original") as any).value.trim();
    let t = (document.querySelector("#addwordtod-target") as any).value.trim();

    let d = (document.querySelector("#addwordtod-definition") as any).value.trim();
    let l = (document.querySelector("#addwordtod-link") as any).value.trim();
    if (o === "" || t === "") {
      return
    }
    else {
      // add readefinition and fetch_data
      setAddingWord('addingWord');
      let rdfn_obj;
      switch (dictionaryToSee) {
        case 'Main':
          rdfn_obj = {
            "main": {
              "readefinitions": {
                [o]: {
                  "target": t
                }
              }
            }
          }

          if (d !== '') {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            rdfn_obj['main']['readefinitions'][o]['definition'] = d
          }
          if (l !== '') {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            rdfn_obj['main']['readefinitions'][o]['link'] = l
          }
          break;

        case 'US':
          rdfn_obj = {
            "US": {
              "readefinitions": {
                [o]: {
                  "target": t
                }
              }
            }
          }

          if (d !== '') {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            rdfn_obj['US']['readefinitions'][o]['definition'] = d
          }
          if (l !== '') {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            rdfn_obj['US']['readefinitions'][o]['link'] = l
          }
          break;

        case 'UK':
          rdfn_obj = {
            "UK": {
              "readefinitions": {
                [o]: {
                  "target": t
                }
              }
            }
          }

          if (d !== '') {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            rdfn_obj['UK']['readefinitions'][o]['definition'] = d
          }
          if (l !== '') {
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            rdfn_obj['UK']['readefinitions'][o]['link'] = l
          }
          break;

        default:
          break;
      }

      let add_raw = JSON.stringify(rdfn_obj);

      let path = '/dictionary/readefinitions';
      const add_response = await makeRdfnRequest(path, 'PUT', {}, add_raw);
      const add_data = await add_response.json();
      e.target.reset()
      if (add_data) {
        add_data.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }))
        setReadefineDictionary(add_data)
        let output = '';
        for (var i = 0, len = add_data.length; i < len; i++) {
          output = output + add_data[i]['original'] + "\t" + add_data[i]['target'] + "\t" + (add_data[i]['definition'] ? add_data[i]['definition'] : '') + "\t" + (add_data[i]['link'] ? add_data[i]['link'] : '') + "\n"
        }
        setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
        setDictLoading('')
        setAddingWord('')
      }
      (document.querySelector("#addwordtod-original") as any).focus();
    }
  },
    changedict = (e: any, val: any) => {
      if (e.target.classList.contains("addonenabler") || e.target.classList.contains("slider")) {
        console.log('clicked addon enabler')
      }
      else {
        console.log('switching dictionaries')
        window.history.replaceState(null, "", "/admin/readefine-dictionaries/" + encodeURI(val))
        setDictSelected('dictselected')
        setDictionaryToSee(val)
      }
    },
    search = (items: any) => {
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
    backtordlist = () => {
      setDictSelected('dictnotselected')
      window.history.replaceState(null, "", "/admin/readefine-dictionaries")
    },
    clearSearch = () => {
      (document.getElementById("search-form") as any).value = "";
      setQ("");
      setShowClearSearch('hidden');
      return;
    };

  return (
    <div id="readefine_dictionaries" className="checkedbyreadefine">
      <div id="rds_list_and_container" className="row">
        <div id="rds_list" className={dictSelected}>
          <div id="all_rds">
            {readefineDictionaries.map((item, index) => {
              return (
                <div key={index} onClick={((e) => changedict(e, item))} className={"user_enabled_rd rds " + ((dictionaryToSee && dictionaryToSee === item) ? 'selected' : "")}>
                  <div className="rds_title">{item}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div id="rd_view_container" className={dictSelected}>
          <div className={"side"} id="rd_add_container">
            <div id="lefttopbar">
              <div onClick={() => backtordlist()} id="back_button" className={dictSelected}>&#xe5c4;</div>
              {
                dictionaryToSee &&
                <Download permissionLevels={permissionLevels} link={downloadLink} doc_title={encodeURI(dictionaryToSee as string) + '_readefine_RD.tsv'} />
              }
            </div>
          </div>
          {/* main dictionary viewer */}
          <div className="main" id="rd_dictionary_container">
            <div id="readefine_rd" className={"dictionary_container " + dictLoading}>
              <div className="search-wrapper">
                <textarea
                  type="search"
                  name="search-form"
                  id="search-form"
                  className="search-input"
                  placeholder="Search"
                  autoComplete="off"
                  // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                  rows={"1"}
                  value={q}
                  onChange={function (e) {
                    if (e.target.value === "") {
                      setShowClearSearch('hidden')
                    }
                    else {
                      setShowClearSearch('')
                    }
                    setQ(e.target.value)
                  }}
                />
                <div id="clear-search" className={showClearSearch} onClick={(() => { clearSearch() })}>&#xe5cd;</div>
              </div>
              <div id="rd_readefinitions_container">
                {
                  readefineDictionary.length > 0 &&
                  <Virtuoso
                    data={search(readefineDictionary)}
                    increaseViewportBy={200}
                    itemContent={(index, item) => {
                      return (
                        <DictionaryRow className={index % 2 === 0 ? "RowEven" : "RowOdd"} key={item.index} index={item.index} target={item.target} original={item.original} definition={item['definition'] ? item['definition'] : ''} link={item['link'] ? item['link'] : ''} />
                      )
                    }}
                  />
                }
              </div>
            </div>
            <div id="dictionary_loader" className={dictLoading}><div className="loading"></div></div>
            <div id="readefine_add_rd_block" className={"readefine_add_box " + permissionLevels}>
              <form id="rdfn_add_sidebar_form" className="rdfn_add_sb_form" onSubmit={submitNewReadefinition}>
                <input placeholder="Original*" id="addwordtod-original" className="addwordtod-form-inputs" required />
                <input placeholder="Target*" id="addwordtod-target" className="addwordtod-form-inputs" required />
                <textarea id="addwordtod-definition" className="addwordtod-form-inputs" placeholder="Definition"></textarea>
                <input id="addwordtod-link" className="addwordtod-form-inputs" placeholder="Link" />
                <input value="Add" id="addwordtod-form-add" className={addingWord} type="submit"></input>
                <div id="addingWordLoader" className={addingWord}></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadefineDictionaries