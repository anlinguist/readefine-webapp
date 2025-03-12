import { useState } from 'react';

function NewAIStyle({
  addStyle
}: any) {
  const [newStyleName, setNewStyleName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: any) => {
    setNewStyleName(e.target.value);
  };

  const handleAddNewStyle = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await addStyle(newStyleName);
    console.log('New style added:', newStyleName);
    setIsLoading(false);
    setNewStyleName('');
  };

  return (
    <div id='addNewAIStyleContainer'>
      <form id='addNewAIStyleForm' onSubmit={handleAddNewStyle}>
        <input
        required
          type="text"
          maxLength={100}
          value={newStyleName}
          onChange={handleInputChange}
          placeholder="Enter new style name"
        />
          {
              isLoading ? 
              <div className='loaderContainer'><div className='loader'></div></div> :
              <button id='addNewAIStyleSubmit' disabled={isLoading}>
                  Add
              </button>
          }
      </form>
    </div>
  );
}

export default NewAIStyle;
