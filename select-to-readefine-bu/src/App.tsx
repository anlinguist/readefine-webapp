import React, { useEffect, useState } from 'react';
import './App.css';
// @ts-expect-error TS(2307): Cannot find module './assets/testicon.png' or its ... Remove this comment to see the full error message
import logo from './assets/testicon.png';
import Select from './Components/Select';

function App() {
  const [selectedOperation, setSelectedOperation] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exceededDailyLimit, setExceededDailyLimit] = useState(false);
  const [operations, setOperations] = useState({});
  const [hasValueOptions, setHasValueOptions] = useState(false);

  const handleOperationChange = (operation: any) => {
    setSelectedOperation(operation);
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    setSelectedValue(operations[operation][0] || '');
  };

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
  };

  const updateUIs = async (retrieved_operations: any) => {
    if (Object.keys(retrieved_operations).length > 0) {
      let firstOperation = Object.keys(retrieved_operations).sort()[0]
      // @ts-expect-error TS(2345): Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      setSelectedOperation(firstOperation);
    }
  }

  useEffect(() => {
    const updateTargets = async() => {
      // @ts-expect-error TS(2538): Type 'boolean' cannot be used as an index type.
      if (operations && Object.keys(operations).length > 0 && operations[selectedOperation]) {
        // @ts-expect-error TS(2538): Type 'boolean' cannot be used as an index type.
        if (operations[selectedOperation].length > 0) {
          setHasValueOptions(true);
          // @ts-expect-error TS(2538): Type 'boolean' cannot be used as an index type.
          setSelectedValue(operations[selectedOperation][0]);
        } else {
          setHasValueOptions(false);
          setSelectedValue(false);
        }
      }
    }
    updateTargets();
  }, [operations, selectedOperation]);

  const checkDailyLimit = async() => {
    setLoading(true)
    let readefineAIDetails = {
      "reword": [
          "a pirate",
          "a love letter",
          "a sci-fi novel",
          "a mob boss",
          "Yoda",
          "Shakespeare",
          "a western cowboy",
          "a film noir detective"
      ],
      "complexify": [],
      "tone": [
          "friendly",
          "professional",
          "optimistic",
          "pessimistic",
          "angry",
          "sad",
          "happy",
          "excited",
          "bored",
          "confused",
          "scared",
          "surprised",
          "disgusted",
          "neutral",
          "sarcastic"
      ],
      "summarize": [],
      "simplify": [
          "Average Adult",
          "Children",
          "ESL",
          "Boomer",
          "Millenial",
          "Gen Z"
      ],
      "convert": [
          "Imperial",
          "Metric",
          "Celsius",
          "Fahrenheit"
      ],
      "translate": [
          "English",
          "Spanish",
          "Russian",
          "Italian",
          "French",
          "Portuguese",
          "German",
          "Chinese",
          "Japanese",
          "Korean",
          "Arabic",
          "Hindi",
          "Turkish",
          "Dutch",
          "Polish",
          "Romanian",
          "Greek",
          "Bulgarian",
          "Czech",
          "Danish",
          "Finnish",
          "Hebrew",
          "Hungarian",
          "Indonesian",
          "Malay",
          "Norwegian",
          "Persian",
          "Swedish",
          "Thai",
          "Ukrainian",
          "Vietnamese",
          "Old English",
          "Classical Latin",
          "Koine Greek",
          "Ancient Hebrew"
      ]
    }
    setExceededDailyLimit(false);
    setOperations(readefineAIDetails);
    await updateUIs(readefineAIDetails);
    setLoading(false);
  }

  useEffect(() => {
    checkDailyLimit();
  }, []);

  return (
    <div className="RDFNAI" onClick={(async(e) => {
      e.preventDefault();
      // @ts-expect-error TS(2339): Property 'tagName' does not exist on type 'EventTa... Remove this comment to see the full error message
      if (e.target.tagName === 'INPUT') {
        return;
      }
      window.parent.postMessage({ type: 'RECREATE_SELECTION' }, "*")
    })}>
      <div className='RDFNAITOP'>
        {
          !exceededDailyLimit &&
          <>
            <Select
              options={Object.keys(operations)}
              handleChange={handleOperationChange}
              // @ts-expect-error TS(2345): Argument of type '"operation"' is not assignable t... Remove this comment to see the full error message
              setActiveDropdown={() => setActiveDropdown('operation')}
              active={activeDropdown === 'operation'}
              deactivate={() => setActiveDropdown(null)}
              defaultSelection={selectedOperation} />
            {
              hasValueOptions &&
              operations &&
              // @ts-expect-error TS(2538): Type 'boolean' cannot be used as an index type.
              operations[selectedOperation] &&
              // @ts-expect-error TS(2538): Type 'boolean' cannot be used as an index type.
              operations[selectedOperation].length > 0 &&
              <Select
                // @ts-expect-error TS(2538): Type 'boolean' cannot be used as an index type.
                options={operations[selectedOperation]}
                handleChange={handleValueChange} 
                // @ts-expect-error TS(2345): Argument of type '"value"' is not assignable to pa... Remove this comment to see the full error message
                setActiveDropdown={() => setActiveDropdown('value')}
                active={activeDropdown === 'value'}
                deactivate={() => setActiveDropdown(null)}
                defaultSelection={selectedValue} />  // Pass the default selection as a prop
            }
          </>
        }
      </div>
      <div className='RDFNAIBTM'>
        <img src={logo} id="hl2rdfnlogo" alt="Logo" />
        <div className='RDFNAIBTMBTNS'>
          {
            !loading &&
            <button className="rdfnPlayButton" onClick={(async(e) => {
              e.preventDefault();
              setLoading(true);

              const messageData = {
                type: 'READEFINE_SELECTION',
                operation: selectedOperation,
                value: selectedValue
              };
              console.log("posting message for REDEFINE_SELECTION")
              window.parent.postMessage(messageData, "*");
            })}>
              <svg viewBox="0 0 32 32" width="20" height="20">
                <path d="M6 4l20 12-20 12z"></path>
              </svg>
            </button>
          }
          {
            loading &&
            <div className='readefineGPT-loader'></div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;