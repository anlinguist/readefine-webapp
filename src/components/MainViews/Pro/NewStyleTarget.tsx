import { useState } from 'react';

function NewStyleTarget({
  addTarget
}: any) {
  const [newTargetName, setNewTargetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleInputChange = (e: any) => {
    setNewTargetName(e.target.value);
  };

  const handleAddNewTarget = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await addTarget(newTargetName);
    console.log('New target added:', newTargetName);
    setIsLoading(false);
    setNewTargetName('');
  };

  return (
    <div id='addNewAIStyleContainer'>
      <form id='addNewAIStyleForm' onSubmit={handleAddNewTarget}>
        <input
        required
          type="text"
          maxLength={100}
          value={newTargetName}
          onChange={handleInputChange}
          placeholder="Enter new target name"
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

export default NewStyleTarget;
