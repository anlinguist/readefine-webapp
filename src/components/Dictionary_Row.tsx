import { useContext, useState } from 'react'
import { RDFNContext } from '../RDFNContext';
import { useAuth } from '../contexts/AuthContext';
import { ActionIcon, LoadingOverlay, Menu, rem } from '@mantine/core';
import { IconDots, IconPencil, IconTrash } from '@tabler/icons-react';
import classes from './Dictionary_Row.module.css';
import { openContextModal } from '@mantine/modals';

function DictionaryRow(props: any) {
  // @ts-expect-error TS(2339): Property 'dictionaryName' does not exist on type '... Remove this comment to see the full error message
  const { dictionaryName, dictionaryType, editable, showToastMessage, setDictionaryContent, setDownloadLink, setWordObj } = useContext(RDFNContext);
  const { makeRdfnRequest } = useAuth();
  const [saving, setSaving] = useState(false);

  const editItem = () => {
    let obj = {
      original: props.original,
      target: props.target,
      definition: props.definition,
      link: props.link
    }

    openContextModal({
      modal: "edit-readefinition",
      title: "Edit this Readefinition",
      size: "sm",
      centered: true,
      innerProps: {
        wordObj: obj,
        setSaving: setSaving,
      },
    });
  },
    deleteItem = async () => {
      setSaving(true);
      let requestOptions: any = {
        headers: {}
      };

      let postObj = {
        [dictionaryType]: {
          readefinitions: {
            [props.original]: {
              "target": "placeholder"
            }
          }
        }
      }

      if (dictionaryType === "addon") {
        // @ts-expect-error TS(7015): Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        postObj['addon']['addonName'] = dictionaryName;
        requestOptions['headers']['dictionary'] = dictionaryName;
      }
      else if (dictionaryType === 'readefine') {
        switch (dictionaryName) {
          case 'Main':
            postObj = {
              // @ts-expect-error TS(2322): Type '{ main: { readefinitions: { [x: number]: { t... Remove this comment to see the full error message
              "main": {
                "readefinitions": {
                  [props.original]: {
                    "target": "placeholder"
                  }
                }
              }
            }
            break;
          default:
            postObj = {
              [dictionaryName]: {
                "readefinitions": {
                  [props.original]: {
                    "target": "placeholder"
                  }
                }
              }
            }
            break;
        }
      };
      let path = '/dictionary/readefinitions';
      const response = await makeRdfnRequest(path, 'DELETE', requestOptions.headers, postObj);

      const data = await response.json();
      if (!data['error']) {
        setSaving(false)
        data.sort((a: any, b: any) => a.original.localeCompare(b.original, undefined, { sensitivity: 'base' }))
        setDictionaryContent(data)
        let output = '';
        for (let i in data) {
          output = output + data[i]['original'] + "\t" + data[i]['target'] + "\t" + (data[i]['definition'] ? data[i]['definition'] : '') + "\t" + (data[i]['link'] ? data[i]['link'] : '') + "\n"
        }
        setDownloadLink("data:text/tab-separated-values," + encodeURIComponent(output));
        showToastMessage('Readefinition deleted!', "success")
      }
    }

  return (
    <div style={{
      paddingTop: 10,
      paddingBottom: 10,
      position: "relative"
    }} className={"dictionaryitem " + props.className} id={"dictionaryitem" + props.index}>
      <LoadingOverlay visible={saving} loaderProps={{ color: 'rdfnyellow.6' }} />
      <div className="dictionarycontainer" id={"dictionarycontainer" + props.index}>
        <span id={"name" + props.index} suppressContentEditableWarning={true}>
          {props.original}
        </span>
        <span>
          &rarr;
        </span>
        <span id={"replacement" + props.index} suppressContentEditableWarning={true}>
          {props.target}
        </span>
      </div>
      {
        editable &&
        <div className="neweditcontainer">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon classNames={{
                root: classes.actionIconRoot,
                icon: classes.actionIconIcon
              }} >
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
                onClick={editItem}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                onClick={deleteItem}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </div>
      }
    </div>
  )
}

export default DictionaryRow