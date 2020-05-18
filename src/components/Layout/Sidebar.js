import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdDashboard,
  MdLibraryBooks,
  MdViewCarousel,
  MdWeb,
  MdDvr,
  MdQuestionAnswer,
} from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';


const sidebarBackground = {
  // backgroundImage: `url("${sidebarBgImage}")`,
  backgroundColor: '#8c1b0f',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


const pageContents = [
  {
    to: '/history',
    name: 'Lịch sử giao dịch',
    exact: false,
    Icon: MdViewCarousel,
  },
];

const navItems = [
  { to: '/', name: 'Trang chủ', exact: true, Icon: MdDashboard },
  { to: '/donation', name: 'Quyên góp', exact: false, Icon: MdWeb },
  { to: '/news', name: 'Tin tức', exact: false, Icon: MdLibraryBooks },
  {
    to: '/guides',
    name: 'Hướng dẫn nạp tiền',
    exact: false,
    Icon: MdDvr,
  },
  { to: '/contact', name: 'Liên hệ và góp ý', exact: false, Icon: MdQuestionAnswer },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
    admin: false,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (

      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground}/>
        <div className={bem.e('content')}>
          <Navbar className="p-1">
            <div className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="70"
                height="70"
                className="pr-0 "
                alt=""
              />
              <span className="text-white mt-4 ml-0">
                Small Giving
              </span>
            </div>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')}/>
                  <span style={{ fontSize: 13 }}>{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            {this.state.token === ''
              ? <div></div>
              : <div>
                <Collapse isOpen={this.state.isOpenPages}>
                  {pageContents.map(({ to, name, exact, Icon }, index) => (
                    <NavItem key={index} className={bem.e('nav-item')}>
                      <BSNavLink
                        id={`navItem-${name}-${index}`}
                        className="text-uppercase"
                        tag={NavLink}
                        to={to}
                        activeClassName="active"
                        exact={exact}
                      >
                        <Icon className={bem.e('nav-item-icon')}/>
                        <span style={{ fontSize: 13 }}>{name}</span>
                      </BSNavLink>
                    </NavItem>
                  ))}
                </Collapse>
                <Button className="ml-5" style={{backgroundColor: "#8e8e8e"}}>
                  <Link to={{
                  pathname: '/admin/trangchu'
                }}
                        style={{color: "white"}}
                  >
                  Admin Page
                </Link></Button>
              </div>
            }

          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
