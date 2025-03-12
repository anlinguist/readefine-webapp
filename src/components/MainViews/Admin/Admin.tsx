import { NavLink } from "react-router-dom";

function Admin() {
  return (
    <div id='adminOptionsContainer'>
      <NavLink className='adminbtns' to="/admin/search">Find a Readefinition</NavLink>
      <NavLink className='adminbtns' to="/admin/readefine-dictionaries">Edit Dictionaries</NavLink>
    </div>
  )
}

export default Admin