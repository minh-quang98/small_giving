import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaClipboardList, FaGithub, FaRegNewspaper, FaTable, FaUserAlt } from 'react-icons/fa';
import {
  MdDashboard,
  MdLibraryBooks,
  MdViewCarousel,
  MdWeb,
  MdDvr,
  MdQuestionAnswer, MdAttachMoney, MdSecurity, MdBrush, MdAccountCircle, MdKeyboardArrowDown, MdWork,
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
import { TiGroup, TiThListOutline } from 'react-icons/ti';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';


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

const taikhoan = [
  { to: '/admin/nhomnd', name: 'Nhóm người dùng', exact: false, Icon: TiGroup, },
  { to: '/admin/nd', name: 'Người dùng', exact: false, Icon: FaUserAlt },


];

const hoatdong = [
  { to: '/admin/hoatdong', name: 'Danh sách hoạt động', exact: false, Icon: FaClipboardList },
  { to: '/admin/tintuc', name: 'Tin tức', exact: false, Icon: FaRegNewspaper },
];
const baocao = [
  { to: '/admin/bcnaptiennd', name: 'GD nạp nhà hảo tâm', exact: false, Icon: MdAttachMoney },
  { to: '/admin/bcnaptienks', name: 'GD nạp tài khoản khảo sát', exact: false, Icon: MdAttachMoney },
  { to: '/admin/bcnaptiendd', name: 'GD nạp quỹ điểm danh', exact: false, Icon: MdAttachMoney },
  { to: '/admin/bctaitro', name: 'GD thực hiện điểm danh', exact: false, Icon: MdAttachMoney },
  { to: '/admin/bctaitro2', name: 'GD thực hiện khảo sát', exact: false, Icon: MdAttachMoney },

  { to: '/admin/bcquyengop', name: 'GD quyên góp', exact: false, Icon: MdAttachMoney },
];
const taitro = [
  { to: '/admin/khaosat', name: 'Tạo khảo sát', exact: false, Icon: TiThListOutline, },
  { to: '/admin/diemdanh', name: 'Quỹ điểm danh', exact: false, Icon: TiThListOutline, },
];
const luongtien = [
  { to: '/admin/naptiennd', name: 'Nạp tiền nhà hảo tâm', exact: false, Icon: GiReceiveMoney },
  { to: '/admin/naptienks', name: 'Nạp tiền tài khoản khảo sát', exact: false, Icon: GiReceiveMoney },
  { to: '/admin/naptiendd', name: 'Nạp tiền quỹ điểm danh', exact: false, Icon: GiReceiveMoney },
  { to: '/admin/chuyentien', name: 'Phê duyệt khảo sát', exact: false, Icon: GiPayMoney },
];

const navItems1 = [
  {
    to: '/admin/phanquyen',
    name: 'phân quyền',
    exact: false,
    Icon: MdSecurity,
  },

];

const navItems2 = [
  { to: '/admin/gopy', name: 'Quản trị góp ý', exact: false, Icon: MdBrush },
];


const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
    admin: false,
    idNhom: ""
  };

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    if (this.state.token !== "") {
      let config = {
        method: "POST",
        body: JSON.stringify({
          token: this.state.token
        })
      }
      fetch(`http://smallgiving.cf/mobileapp/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idNhom: data.idNhom
          }, () => console.log("idNhom>>>>>>", data))
        })
    }
  }

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
        {!this.state.admin
          ? <div className={bem.e('content')}>
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
                    <Icon className={bem.e('nav-item-icon')} />
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
                          <Icon className={bem.e('nav-item-icon')} />
                          <span style={{ fontSize: 13 }}>{name}</span>
                        </BSNavLink>
                      </NavItem>
                    ))}
                  </Collapse>
                  {this.state.idNhom > 3
                    ? <div />
                    : <Button
                      className="ml-3 mr-3"
                      style={{ backgroundColor: "#8e8e8e" }}
                      onClick={() => {
                        this.setState({
                          admin: true
                        })
                      }}
                    >
                      <Link to={{
                        pathname: '/admin/trangchu'
                      }}
                        style={{ color: "white" }}
                      >
                        Admin Page
                      </Link></Button>
                  }

                </div>
              }

            </Nav>
          </div>
          : <div className={bem.e('content')}>
            <Navbar>
              <SourceLink className="navbar-brand d-flex">
                <img
                  src={logo200Image}
                  width="50"
                  height="40"
                  className="pr-2"
                  alt=""
                />
                <span className="text-white">
                  Small Giving
              </span>
              </SourceLink>
            </Navbar>
            <Nav vertical>
              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('taikhoan')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="text-uppercase">
                    <MdAccountCircle className={bem.e('nav-item-icon')} />
                    <span className="">Quản trị tài khoản</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpentaikhoan
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpentaikhoan}>
                {taikhoan.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="pd-30"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>

              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('hoatdong')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="text-uppercase">
                    <MdWork className={bem.e('nav-item-icon')} />
                    <span className="">Quản trị hoạt động thiện nguyện</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenhoatdong
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpenhoatdong}>
                {hoatdong.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="pd-30"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>

              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('taitro')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="text-uppercase">
                    <FaTable className={bem.e('nav-item-icon')} />
                    <span className="">quản trị hoạt động tài trợ</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpentaitro
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpentaitro}>
                {taitro.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="pd-30"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>

              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('luongtien')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="text-uppercase">
                    <GiMoneyStack className={bem.e('nav-item-icon')} />
                    <span className="">Quản trị giao dịch</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenluongtien
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpenluongtien}>
                {luongtien.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="pd-30"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>

              {navItems2.map(({ to, name, exact, Icon }, index) => (
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
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}

              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('baocao')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="text-uppercase">
                    <FaTable className={bem.e('nav-item-icon')} />
                    <span className="">báo cáo</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenbaocao
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpenbaocao}>
                {baocao.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="pd-30"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>
              <Button
                className="ml-3 mr-3"
                style={{ backgroundColor: "#8e8e8e" }}
                onClick={() => {
                  this.setState({
                    admin: false
                  })
                }}
              >
                <Link to={{
                  pathname: '/'
                }}
                  style={{ color: "white" }}
                >
                  Public Page
                </Link></Button>
            </Nav>
          </div>
        }

      </aside>
    );
  }
}

export default Sidebar;
