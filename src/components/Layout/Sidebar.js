import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  // backgroundImage: `url("${sidebarBgImage}")`,
  backgroundColor: "#8c1b0f",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
  {
    to: '/button-groups',
    name: 'button groups',
    exact: false,
    Icon: MdGroupWork,
  },
  { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  {
    to: '/dropdowns',
    name: 'dropdowns',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];

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
  { to: '/news', name: 'Tin tức', exact: false, Icon: MdInsertChart },
  { to: '/contact', name: 'Liên hệ và góp ý', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
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
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar className="p-1">
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="70"
                height="60"
                className="pr-0 "
                alt=""
              />
              <span className="text-white mt-3 ml-0">
                Small Giving
              </span>
            </SourceLink>
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
                  <Icon className={bem.e('nav-item-icon')} />
                  <span style={{fontSize: 13}}>{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {/*<NavItem*/}
            {/*  className={bem.e('nav-item')}*/}
            {/*  onClick={this.handleClick('Components')}*/}
            {/*>*/}
            {/*  <BSNavLink className={bem.e('nav-item-collapse')}>*/}
            {/*    <div className="d-flex">*/}
            {/*      <MdExtension className={bem.e('nav-item-icon')} />*/}
            {/*      <span className=" align-self-start">Components</span>*/}
            {/*    </div>*/}
            {/*    <MdKeyboardArrowDown*/}
            {/*      className={bem.e('nav-item-icon')}*/}
            {/*      style={{*/}
            {/*        padding: 0,*/}
            {/*        transform: this.state.isOpenComponents*/}
            {/*          ? 'rotate(0deg)'*/}
            {/*          : 'rotate(-90deg)',*/}
            {/*        transitionDuration: '0.3s',*/}
            {/*        transitionProperty: 'transform',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </BSNavLink>*/}
            {/*</NavItem>*/}
            {/*<Collapse isOpen={this.state.isOpenComponents}>*/}
            {/*  {navComponents.map(({ to, name, exact, Icon }, index) => (*/}
            {/*    <NavItem key={index} className={bem.e('nav-item')}>*/}
            {/*      <BSNavLink*/}
            {/*        id={`navItem-${name}-${index}`}*/}
            {/*        className="text-uppercase"*/}
            {/*        tag={NavLink}*/}
            {/*        to={to}*/}
            {/*        activeClassName="active"*/}
            {/*        exact={exact}*/}
            {/*      >*/}
            {/*        <Icon className={bem.e('nav-item-icon')} />*/}
            {/*        <span className="">{name}</span>*/}
            {/*      </BSNavLink>*/}
            {/*    </NavItem>*/}
            {/*  ))}*/}
            {/*</Collapse>*/}

            {/*<NavItem*/}
            {/*  className={bem.e('nav-item')}*/}
            {/*  onClick={this.handleClick('Contents')}*/}
            {/*>*/}
            {/*  <BSNavLink className={bem.e('nav-item-collapse')}>*/}
            {/*    <div className="d-flex">*/}
            {/*      <MdSend className={bem.e('nav-item-icon')} />*/}
            {/*      <span className="">Contents</span>*/}
            {/*    </div>*/}
            {/*    <MdKeyboardArrowDown*/}
            {/*      className={bem.e('nav-item-icon')}*/}
            {/*      style={{*/}
            {/*        padding: 0,*/}
            {/*        transform: this.state.isOpenContents*/}
            {/*          ? 'rotate(0deg)'*/}
            {/*          : 'rotate(-90deg)',*/}
            {/*        transitionDuration: '0.3s',*/}
            {/*        transitionProperty: 'transform',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </BSNavLink>*/}
            {/*</NavItem>*/}
            {/*<Collapse isOpen={this.state.isOpenContents}>*/}
            {/*  {navContents.map(({ to, name, exact, Icon }, index) => (*/}
            {/*    <NavItem key={index} className={bem.e('nav-item')}>*/}
            {/*      <BSNavLink*/}
            {/*        id={`navItem-${name}-${index}`}*/}
            {/*        className="text-uppercase"*/}
            {/*        tag={NavLink}*/}
            {/*        to={to}*/}
            {/*        activeClassName="active"*/}
            {/*        exact={exact}*/}
            {/*      >*/}
            {/*        <Icon className={bem.e('nav-item-icon')} />*/}
            {/*        <span className="">{name}</span>*/}
            {/*      </BSNavLink>*/}
            {/*    </NavItem>*/}
            {/*  ))}*/}
            {/*</Collapse>*/}

            {/*<NavItem*/}
            {/*  className={bem.e('nav-item')}*/}
            {/*  onClick={this.handleClick('Pages')}*/}
            {/*>*/}
            {/*  <BSNavLink className={bem.e('nav-item-collapse')}>*/}
            {/*    <div className="d-flex">*/}
            {/*      <MdPages className={bem.e('nav-item-icon')} />*/}
            {/*      <span className="">Pages</span>*/}
            {/*    </div>*/}
            {/*    <MdKeyboardArrowDown*/}
            {/*      className={bem.e('nav-item-icon')}*/}
            {/*      style={{*/}
            {/*        padding: 0,*/}
            {/*        transform: this.state.isOpenPages*/}
            {/*          ? 'rotate(0deg)'*/}
            {/*          : 'rotate(-90deg)',*/}
            {/*        transitionDuration: '0.3s',*/}
            {/*        transitionProperty: 'transform',*/}
            {/*      }}*/}
            {/*    />*/}
            {/*  </BSNavLink>*/}
            {/*</NavItem>*/}
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
                    <Icon className={bem.e('nav-item-icon')} />
                    <span style={{fontSize: 13}}>{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
