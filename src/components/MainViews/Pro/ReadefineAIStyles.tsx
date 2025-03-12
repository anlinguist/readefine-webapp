import { useContext, useEffect, useState } from 'react'
import { RDFNContext } from '../../../RDFNContext'
import AITargetCard from '../../MainViews/Pro/AITargetCard'
import Confirm from '../../Confirm/Confirm'
import { Virtuoso } from 'react-virtuoso'
import { Group, Title } from '@mantine/core'
import BackToDictionaries from '../../Buttons/BackToDictionaries'
import SearchInput from '../../Search/SearchInput'
import Add from '../../Buttons/Add'
import { openContextModal } from '@mantine/modals'

const ReadefineAIStyles = () => {
  // @ts-expect-error TS(2339): Property 'updateTargets' does not exist on type 'unkn... Remove this comment to see the full error message
  const { updateTargets, chosenAIStyle, setChosenAIStyle, aiPromptOptions, setAIPromptOptions, showToastMessage, proStatus } = useContext(RDFNContext)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [cardToRemove, setCardToRemove] = useState(false);
  const [q, setQ] = useState('');
  const handleDelete = () => {
    setIsConfirmOpen(false);
    removeTarget(cardToRemove);
  };

  const removeTarget = async (targetName: any) => {
    const msg = `Removed ${targetName} style`;
    await updateTargets(targetName, "DELETE", msg);
  }

  const addNewTarget = async () => {
    openContextModal({
      modal: "add-new-target",
      title: "Add a new target",
      size: "sm",
      centered: true,
      innerProps: {},
    });
  }

  const backToStyles = () => {
    setChosenAIStyle('');
  }
  useEffect(() => {
    console.log('aiPromptOptions:', aiPromptOptions);
    console.log('chosenAIStyle:', chosenAIStyle);
    console.log('aiPromptOptions[chosenAIStyle].sort():', aiPromptOptions[chosenAIStyle].sort())
  }, [aiPromptOptions])

  return (
    <>
      <Confirm
        isOpen={isConfirmOpen}
        message={`Are you sure you want to delete the ${cardToRemove} target from the ${chosenAIStyle} Readefine AI style?`}
        onConfirm={((e: any) => {
          e.stopPropagation();
          handleDelete();
        })}
        onCancel={() => setIsConfirmOpen(false)}
      />
      <div id='rdfnaistylescontainer' className='selectedStyle'>
        <Group >
          <BackToDictionaries back={backToStyles} label="Back to AI Styles" />
          <Title m={"auto"} fw={'unset'} mb={'10px'} order={1}>{`${chosenAIStyle}`}</Title>
        </Group>

        <Group mb={"10px"}>
          <SearchInput q={q} setQ={setQ} placeholder={`Search targets`} />
          {
            proStatus &&
            <Add add={addNewTarget} label={"Add a new target for this style"} />
          }
        </Group>

        <div className={'aitargetcontent'}>
          {/* <NewStyleTarget addTarget={addTarget} /> */}
          <div id="targetlist">
            {
              aiPromptOptions &&
              chosenAIStyle !== '' &&
              aiPromptOptions[chosenAIStyle].length > 0 &&
              <Virtuoso
                data={aiPromptOptions[chosenAIStyle]}
                increaseViewportBy={200}
                itemContent={(index, item) => (
                  <AITargetCard key={index} className={index % 2 === 0 ? "RowEven" : "RowOdd"} targetName={item} setIsConfirmOpen={setIsConfirmOpen} setCardToRemove={setCardToRemove} />
                )}
              />
            }
            {
              aiPromptOptions &&
              chosenAIStyle !== '' &&
              aiPromptOptions[chosenAIStyle].length === 0 &&
              <div id="noaistylestext">There are no targets for this style yet</div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ReadefineAIStyles