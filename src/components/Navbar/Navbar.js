import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css";

class Navbar extends React.Component{

    TYPE='live';

    state = {
        searchClicked: false,
        menuClicked: false,
        hideSearch: false,
        hideMenu: false
    }

    toggleSearch = () =>{
        this.setState({searchClicked: !this.state.searchClicked});
        this.setState({hideMenu: !this.state.hideMenu});
    }

    toggleMenu = () =>{
        this.setState({menuClicked: !this.state.menuClicked});
        this.setState({hideSearch: !this.state.hideSearch});
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.search.value);

        this.props.changeSearchParent(e.target.search.value, 1)
    }

    changeType = (type) => {
        if(type === 'live'){
            this.TYPE='live';
        }
        if(type === 'upcoming'){
            this.TYPE='upcoming';
        }

        this.props.changeTypeParent(this.TYPE, 1)
    }

    render(){
        return(
            <nav className="NavbarItems">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <h1 className="navbar-logo"><i className="fab fa-youtube"></i>Live</h1>
                </Link>
                <form className={this.state.searchClicked ? 'searchBar active' : 'searchBar'} onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Search" name="search"></input>
                    <button className='searchButton' type="submit"><i class="fa fa-search"></i></button>
                </form>

                <div className={this.state.hideSearch ? 'search-menu-icon hidden' : 'search-menu-icon'} onClick={this.toggleSearch}>
                    <i className={this.state.searchClicked ? 'fas fa-times' : 'fa fa-search'}></i>
                </div>

                <div className={this.state.hideMenu ? 'menu-icon hidden' : 'menu-icon'} onClick={this.toggleMenu}>
                    <i className={this.state.menuClicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className={this.state.menuClicked ? 'nav-menu active' : 'nav-menu'}>
                    <input type="radio" id="live" name="type" defaultChecked/><label for="live" onClick={() => this.changeType('live')}>Live</label>
                    <input type="radio" id="upcoming" name="type" /><label for="upcoming" onClick={() => this.changeType('upcoming')}>Upcoming</label>
                </ul>
            </nav>
        )
    }
}

export default Navbar