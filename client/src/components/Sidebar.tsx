import { useState } from "react";
import { Link } from "react-router-dom";
function Sidebar() {
    const [toggle, setToggle] = useState(true);

    function toggleMenu() {
        if (window.innerWidth < 430) {
            setToggle(true);
        }
    }
    function toggleCheckbox() {
        setToggle(!toggle);    
    }

    return (
        <>
            <input onClick={toggleCheckbox} type="checkbox" id="menu-toggle" readOnly hidden checked={toggle} />

            <div className="side-bar">
                <header>
                    <i className="small-logo fas fa-comments-dollar"></i>

                </header>
                <div className="side-bar-menu" >
                    <ul onClick={toggleMenu}>
                        <Link to="/home">
                            <li>
                                <div className="menu-item ">
                                    <i className="fa fa-home"></i>
                                    <span> Dashboard </span>
                                </div>
                            </li>
                        </Link>
                        <li >
                            <div className="menu-header" >
                                <span>Menu</span>
                            </div>
                        </li>
                        <Link to="/categories">
                            <li >
                                <div className="menu-item ">
                                    <i className="fa fa-boxes"></i>
                                    <span> Categories </span>
                                </div>
                            </li>
                        </Link>
                      
                        <Link to="/wallets">
                            <li >
                                <div className="menu-item ">
                                    <i className="fa fa-wallet"></i>
                                    <span> Wallets </span>
                                </div>
                            </li>
                        </Link>

                        <Link to="/expenses">
                            <li >
                                <div className="menu-item ">
                                    <i className="fa fa-coins"></i>
                                    <span> Expenses </span>
                                </div>
                            </li>
                        </Link>
                       

                        <Link to="/incomes">
                            <li >
                                <div className="menu-item ">
                                    <i className="fa fa-donate"></i>
                                    <span> Incomes </span>
                                </div>
                            </li>
                        </Link>

                        <Link to="/bills">
                            <li >
                                <div className="menu-item ">
                                    <i className="fa fa-file-invoice-dollar"></i>
                                    <span> Bills </span>
                                </div>
                            </li>
                        </Link>
                        <li >
                            <div className="menu-item menu-item-active" >
                                <i className="fa fa-book"></i>
                                <span> About</span>
                            </div>
                        </li>
   
                    </ul>
                </div>

            </div>
            <label className="menu-toggle fa fa-bars" htmlFor="menu-toggle"></label>
        </>
    )
}

export default Sidebar;