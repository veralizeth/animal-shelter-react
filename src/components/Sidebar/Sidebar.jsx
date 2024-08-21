import './index.scss';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
    <div className="nav-bar">
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <>HOME</>
            </NavLink>
            {/* <NavLink exact="true" activeclassname="active" className="about-link " to="/about">
                <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
            </NavLink> */}
        </nav>
        {/* <ul>
            <li>
                <a target='_blank' rel='nodeferrer' href='https://www.linkedin.com/in/lizeth-vera25/'>
                    <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e' />
                </a>
            </li>
            <li>
                <a target='_blank' rel='nodeferrer' href='https://github.com/veralizeth'>
                    <FontAwesomeIcon icon={faGithub} color='#4d4d4e' />
                </a>
            </li>
        </ul> */}
    </div>
);

export default Sidebar;
