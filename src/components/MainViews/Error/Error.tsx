import { FaExclamationTriangle } from 'react-icons/fa'

function Error() {
  return (
    <div id={"uhohmain"}>
        <FaExclamationTriangle />
        <p>Uh-oh! Something happened and we couldn't connect. Make sure you're online!</p>
    </div>
  )
}

export default Error