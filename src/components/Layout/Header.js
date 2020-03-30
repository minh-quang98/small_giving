import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demo/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { Link } from 'react-router-dom';
import ModalLoginPage from '../Modal/ModalLoginPage';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    login: false,
    showModal: false,
  };

  handleLogin = () => {
    this.setState({
      login: true,
      showModal: false,
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleShowModal = () => {
    this.setState({
      showModal: true,
    });
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <div>
        <Navbar light expand className={bem.b('bg-white')}>
          <Nav navbar className="mr-2">
            <Button color="secondary" outline onClick={this.handleSidebarControlButton}>
              <MdClearAll size={25} style={{ color: '#ae1f17' }}/>
            </Button>
          </Nav>

          <Nav navbar className={bem.e('nav-right')}>
            {this.state.login
              ? <div className="d-flex justify-content-between">
                <NavItem className="mr-2">
                  <NavLink id="Popover1" className="position-relative">
                    {isNotificationConfirmed ? (
                      <MdNotificationsNone
                        size={25}
                        style={{ color: '#ae1f17' }}
                        onClick={this.toggleNotificationPopover}
                      />
                    ) : (
                      <MdNotificationsActiveWithBadge
                        size={25}
                        className="text-secondary can-click animated swing infinite"
                        onClick={this.toggleNotificationPopover}
                      />
                    )}
                  </NavLink>
                  <Popover
                    placement="bottom"
                    isOpen={this.state.isOpenNotificationPopover}
                    toggle={this.toggleNotificationPopover}
                    target="Popover1"
                  >
                    <PopoverBody>
                      <Notifications notificationsData={notificationsData}/>
                    </PopoverBody>
                  </Popover>
                </NavItem>

                <NavItem>
                  <NavLink id="Popover2">
                    <Avatar
                      onClick={this.toggleUserCardPopover}
                      className="can-click"
                    />
                  </NavLink>
                  <Popover
                    placement="bottom-end"
                    isOpen={this.state.isOpenUserCardPopover}
                    toggle={this.toggleUserCardPopover}
                    target="Popover2"
                    className="p-0 border"
                    style={{ minWidth: 250 }}
                  >
                    <PopoverBody className="p-0 border">
                      <UserCard
                        title="Phượng"
                        subtitle="vuphuong@gmail.com"
                        text="0359163555"
                        className="border-light"
                      >
                        <ListGroup flush>
                          <ListGroupItem tag="button" action className="border-light">
                            <Link to={'/profile'} onClick={() => {
                              this.toggleUserCardPopover();
                            }} style={{ color: 'black' }}>
                              <MdPersonPin/> Thông tin người dùng
                            </Link>
                          </ListGroupItem>
                          <ListGroupItem tag="button" action className="border-light">
                            <MdExitToApp/> Đăng xuất
                          </ListGroupItem>
                        </ListGroup>
                      </UserCard>
                    </PopoverBody>
                  </Popover>
                </NavItem>
              </div>
              : <div>
                <NavItem
                  className="d-inline-flex mr-2"
                >
                  <Button
                    color="secondary"
                    style={{ minWidth: 113 }}
                    onClick={this.handleShowModal}
                  >
                    Đăng nhập
                  </Button>
                </NavItem>
              </div>
            }
          </Nav>
        </Navbar>
          <ModalLoginPage show={this.state.showModal} onHide={this.handleCloseModal} onLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default Header;
