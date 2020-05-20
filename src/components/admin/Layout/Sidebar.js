import logo200Image from 'assets/img/logo/Anh cut.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-6.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  FaUserAlt,
  FaClipboardList,
  FaRegNewspaper,
  FaRegMoneyBillAlt,
  FaTable
}
  from 'react-icons/fa';
import { TiThListOutline, TiGroup } from 'react-icons/ti';
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import {
  MdAttachMoney,
  MdBrush,
  MdAccountCircle,
  MdKeyboardArrowDown,
  MdWork,
  MdSecurity,
  MdTextFields,
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
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const taikhoan = [
  { to: '/nhomnd', name: 'Nhóm người dùng', exact: false, Icon: TiGroup, },
  { to: '/nd', name: 'Người dùng', exact: false, Icon: FaUserAlt },


];

const hoatdong = [
  { to: '/hoatdong', name: 'Danh sách hoạt động', exact: false, Icon: FaClipboardList },
  { to: '/tintuc', name: 'Tin tức', exact: false, Icon: FaRegNewspaper },
];
const baocao = [
  { to: '/bcnaptien', name: 'Giao dịch nạp tiền', exact: false, Icon: MdAttachMoney },
  { to: '/bctaitro', name: 'Giao dịch thực hiện điểm danh', exact: false, Icon: MdTextFields },
  { to: '/bctaitro2', name: 'Giao dịch thực hiện khảo sát', exact: false, Icon: FaRegMoneyBillAlt },

  { to: '/bcquyengop', name: 'Giao dịch quyên góp', exact: false, Icon: FaRegMoneyBillAlt },
];
const taitro = [
  { to: '/khaosat', name: 'Tạo khảo sát', exact: false, Icon: TiThListOutline, },
  { to: '/diemdanh', name: 'Tạo tài khoản điểm danh', exact: false, Icon: TiThListOutline, },
];
const luongtien = [
  { to: '/naptien', name: 'Nạp tiền', exact: false, Icon: GiReceiveMoney },
  { to: '/chuyentien', name: 'Phê duyệt khảo sát', exact: false, Icon: GiPayMoney },
];

const navItems1 = [
  {
    to: '/phanquyen',
    name: 'phân quyền',
    exact: false,
    Icon: MdSecurity,
  },

];

const navItems2 = [
  { to: '/gopy', name: 'Quản trị góp ý', exact: false, Icon: MdBrush },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpentaikhoan: false,
    isOpenhoatdong: false,
    isOpenbaocao: false,
    isOpentaitro: false,
    isOpenluongtien: false,
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

          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
