// import { NavLink } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

const NavBar = ({items,end}) => {
  return (
      <Menubar className='shadow-xl rounded-lg' model={items} end={end}/>
  )
};

export default NavBar;