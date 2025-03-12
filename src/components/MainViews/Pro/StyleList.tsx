import { ActionIcon, Menu, rem } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { RDFNContext } from '../../../RDFNContext';
import { IconDots, IconTrash } from '@tabler/icons-react';
import classes from './StyleList.module.css';
import SearchInput from '../../Search/SearchInput';

function StyleListItem({styleName, removeHandler}: any) {
    // @ts-expect-error TS(2339): Property 'setChosenAIStyle' does not exist on type ... Remove this comment to see the full error message
    const { setChosenAIStyle, chosenAIStyle, proStatus } = useContext(RDFNContext);
    return (
        <div onClick={((e) => {
            e.stopPropagation();
            setChosenAIStyle(styleName);
        })} className={`user_enabled_cd cds ${chosenAIStyle === styleName ? 'selected' : ''}`}>
            <div className="cds_title">{styleName}</div>
            <div className="neweditcontainer">
                    {
                      proStatus &&
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <ActionIcon onClick={event => event.stopPropagation()}  classNames={{
                            root: classes.actionIconRoot,
                            icon: classes.actionIconIcon
                        }} >
                            <IconDots size={16} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            color="red"
                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                            onClick={(e) => {
                                removeHandler(e, styleName);
                            }}
                        >
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                    }
            </div>
        </div>
    )
}

function StyleList({ setIsConfirmOpen, setCardToRemove }: any) {
  // @ts-expect-error TS(2339): Property 'aiPromptOptions' does not exist on type ...
  const { aiPromptOptions } = useContext(RDFNContext);

  const [searchTerm, setSearchTerm] = useState("");

  const styleData = useMemo(() => {
    return [
      ["__search_bar__"],
      ...Object.keys(aiPromptOptions)
        .filter((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort()
        .map((s) => [s])
    ];
  }, [aiPromptOptions, searchTerm]);

  const removeHandler = async (e: any, styleName: string) => {
    e.stopPropagation();
    setIsConfirmOpen(true);
    setCardToRemove(styleName);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Virtuoso
        topItemCount={1}
        data={styleData}
        style={{ flex: 1 }}
        increaseViewportBy={200}

        itemContent={(_, item) => {
            if (item[0] === "__search_bar__") {
              return (
                <SearchInput
        q={searchTerm}
        setQ={setSearchTerm}
        placeholder="Search styles..."
        noBorder
      />
              );
            }
            const styleName = item[0];
            return <StyleListItem styleName={styleName} removeHandler={removeHandler} />;
          }}
      />
    </div>
  );
}

export default StyleList;