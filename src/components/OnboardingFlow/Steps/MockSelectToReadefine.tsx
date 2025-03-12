import { useEffect, useState } from 'react';
import './MockSelectToReadefine.css';
import logo from '../../../assets/testicon.png';
import Select from './Select';

function MockSelectToReadefine() {
  const [selectedOperation, setSelectedOperation] = useState('Simplify');
  const [selectedValue, setSelectedValue] = useState('Average Adults');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [between, setBetween] = useState('for');
  const [overLimit, setOverLimit] = useState(false);
  const loading = false;
  const exceededDailyLimit = false;

  const operations = {
    Simplify: ['Average Adults', 'ESL', 'Children', 'Boomers', 'Millenials', 'Gen Z'],
    Tone: ['friendly', 'professional', 'optimistic', 'pessimistic', 'angry', 'sad', 'happy', 'excited', 'bored', 'confused', 'scared', 'surprised', 'disgusted', 'neutral', 'sarcastic'],
    Summarize: [],
    Complexify: [],
    Translate: ['English', 'Spanish', 'Russian', 'Italian', 'French', 'Portuguese', 'German', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Turkish', 'Dutch', 'Polish', 'Romanian', 'Greek', 'Bulgarian', 'Czech', 'Danish', 'Finnish', 'Hebrew', 'Hungarian', 'Indonesian', 'Malay', 'Norwegian', 'Persian', 'Swedish', 'Thai', 'Ukrainian', 'Vietnamese', 'Old English', 'Classical Latin', 'Koine Greek', 'Ancient Hebrew'],
    Reword: ['a pirate', 'a love letter', 'a sci-fi novel', 'a mob boss', 'Yoda', 'Shakespeare', 'a western cowboy', 'a film noir detective'],
    Convert: ['Imperial', 'Metric', 'Celsius', 'Fahrenheit']
  };

  const handleOperationChange = (operation: any) => {
    setSelectedOperation(operation);
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    setSelectedValue(operations[operation][0] || '');
  };

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
  };
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const hasValueOptions = selectedOperation ? operations[selectedOperation].length > 0 : true;

  const updateBetweenText = (selectedOperation: any) => {
    switch (selectedOperation) {
      case 'Simplify':
        setBetween('for');
        break;
      case 'Translate':
        setBetween('into');
        break;
      case 'Reword':
        setBetween('as');
        break;
      default:
        setBetween('');
        break;
    }
  }

  useEffect(() => {
    updateBetweenText(selectedOperation);
  }, [selectedOperation]);

  useEffect(() => {
    function handleMessage(event: any) {
      if (event?.data?.type === 'SELECTION_OVER_LIMIT') {
        setOverLimit(true);
      }
    }

    window.addEventListener('message', handleMessage);
  
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  

  return (
    <div className="RDFNAI" onClick={(async(e) => {
      e.preventDefault();

    })}>
      <div className='RDFNAITOP'>
        <Select
          options={Object.keys(operations)}
          handleChange={handleOperationChange}
          // @ts-expect-error TS(2345): Argument of type '"operation"' is not assignable t... Remove this comment to see the full error message
          setActiveDropdown={() => setActiveDropdown('operation')}
          active={activeDropdown === 'operation'}
          deactivate={() => setActiveDropdown(null)}
          defaultSelection={selectedOperation} />
        <span className="between">{between}</span>
        {
          hasValueOptions &&
          <Select
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            options={selectedOperation ? operations[selectedOperation] : operations['Simplify']}
            handleChange={handleValueChange} 
            // @ts-expect-error TS(2345): Argument of type '"value"' is not assignable to pa... Remove this comment to see the full error message
            setActiveDropdown={() => setActiveDropdown('value')}
            active={activeDropdown === 'value'}
            deactivate={() => setActiveDropdown(null)}
            defaultSelection={selectedValue} />  // Pass the default selection as a prop
        }
      </div>
      <div className='RDFNAIBTM'>    
        <img src={logo} id="hl2rdfnlogo" alt="Logo" />
        {
          !overLimit &&
          !loading &&
          !exceededDailyLimit &&
          <button className="rdfnPlayButton" onClick={(async(e) => {
            e.preventDefault();
          })}>
            <svg viewBox="0 0 32 32" width="20" height="20">
              <path d="M6 4l20 12-20 12z"></path>
            </svg>
          </button>
        }
        {
          exceededDailyLimit &&
          <div className="errorMessage">You have exceeded your daily limit.</div>
        }
        {
          !overLimit &&
          loading &&
          <div className='readefineGPT-loader'></div>
        }
        {
          overLimit &&
          <div className="errorMessage">Selection is too long.</div>
        }
      </div>
    </div>
  );
}

export default MockSelectToReadefine;