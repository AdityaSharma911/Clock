import React from 'react';
import './nav.css'
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <div className='nav-box'>
            <nav>
                <ul className="nav-links">
                    <Link to='/'><div className='button'><li>Clock</li></div></Link>
                    <Link to='/timer'><div className='button'><li>Stopwatch</li></div></Link>
                    <Link to='/stopwatch'><div className='button'><li>Timer</li></div></Link>
                </ul>
            </nav>
        </div>

    );

}

export default Nav;