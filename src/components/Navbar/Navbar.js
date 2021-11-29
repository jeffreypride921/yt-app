import React from "react";
import { Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

class Navbar extends React.Component{
    render(){
        return(
            <nav className="NavbarItems">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <h1 className="navbar-logo"><i className="fab fa-youtube"></i>Live</h1>
                </Link>
                {/* <div className="searchBar">
                    <input type="text" placeholder="Search..." name="search"></input>
                    <button type="submit"><i class="fa fa-search"></i></button>
                </div> */}
                <ul className='nav-menu'>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}> 
                                <Link to={item.url} className={item.cName}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar