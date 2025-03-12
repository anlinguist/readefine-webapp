import { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';

function AdminSearch() {
  const [results, setResults] = useState();
  const [searchTerm, setSearchTerm] = useState<any>();
  const [searching, setSearching] = useState('');
  const { makeRdfnRequest } = useAuth();

  const searchForTerm = async (e: any) => {
    e.preventDefault();
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setResults();
    if (searchTerm.length === 0) {
      return
    }

    setSearching('searching');



    let path = `/v2/admin/findReadefinition/${encodeURIComponent(searchTerm)}`;
    let queryResultsRaw = await makeRdfnRequest(path, 'GET', {}, null);
    let queryResults = await queryResultsRaw.json();

    if (Object.keys(queryResults).length === 0) {
      // @ts-expect-error TS(2345): Argument of type 'false' is not assignable to para... Remove this comment to see the full error message
      setResults(false)
    }
    else {
      setResults(queryResults)
    }

    setSearching('');
    // set server response to results
  }

  return (<div id='adminSearchContainer'>
      <form id='adminSearchForm' onSubmit={((e) => { searchForTerm(e); })}>
        <input id='adminSearchField' placeholder='Search...' onChange={((e) => { setSearchTerm(e.target.value.trim()); })}/>
        <button id='adminSearchSubmit' className={searching}>Search</button>
        <div id='adminSearchSearching' className={searching}></div>
      </form>
      <div id='resultsContainer'>
        {results &&
        <>
            {'readefineDictionaries' in results &&
                <>
                <h3 className='adminSearchDictionaryClass'>Readefine Dictionaries</h3>
                <ul className='adminSearchResult'>
                {(results['readefineDictionaries'] as any).map((dictionary: any) => {
                        return (<li className='adminSearchResult'>{dictionary}</li>);
                    })}
                </ul>
              </>}
            {'communityDictionaries' in results &&
                <>
                <h3 className='adminSearchDictionaryClass'>Community Dictionaries</h3>
                <ul className='adminSearchResult'>
                {(results['communityDictionaries'] as any).map((dictionary: any) => {
                        return (<li className='adminSearchResult'>{dictionary}</li>);
                    })}
                </ul>
              </>}
            {'userDictionaries' in results &&
                <>
                <h3 className='adminSearchDictionaryClass'>User Dictionaries</h3>
                <ul className='adminSearchResult'>
                {(results['userDictionaries'] as any).map((dictionary: any) => {
                        return (<li className='adminSearchResult'>{dictionary}</li>);
                    })}
                </ul>
              </>}
          </>}
        {results === false &&
        <div>This term is not Readefined by any dictionaries.</div>}
      </div>
    </div>);
}

export default AdminSearch