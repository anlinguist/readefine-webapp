import { useContext } from 'react'
import { RDFNContext } from '../../RDFNContext'

function Download(props: any) {
  // @ts-expect-error TS(2339): Property 'downloadLink' does not exist on type 'un... Remove this comment to see the full error message
  const { downloadLink } = useContext(RDFNContext)
  return (
    <a className={props.permissionLevels} href={downloadLink} download={props.doc_title} id="download-container"><label className="pd-download"><span className="download-icon">&#xe2c4;</span></label></a>
  )
}

export default Download