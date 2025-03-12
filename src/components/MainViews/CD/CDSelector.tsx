/*global chrome*/
import { useContext, useEffect } from 'react';
import "./CD.css";
import { RDFNContext } from '../../../RDFNContext';
import CDWelcome from './CDWelcome';
import { Helmet } from 'react-helmet-async';
import CDList from './CDList';

function CDSelector() {
  // @ts-expect-error TS(2339): Property 'domains' does not exist on type 'unknown... Remove this comment to see the full error message
  const { domains, setDomains, setDictionaryType } = useContext(RDFNContext);

  useEffect(() => {
    setDictionaryType("addon");
  }, [setDictionaryType]);

  return (
    <div id="community_dictionaries" className="checkedbyreadefine row">
      <Helmet>
        <title>Community Dictionaries</title>
      </Helmet>
      
      <CDList />
      {/* welcome to community dictionaries */}

      <CDWelcome />
    </div>
  );
}

export default CDSelector