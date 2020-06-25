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
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';
import ModalForgotPassword from '../Modal/modalForgotPassword';

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
  // children: <small>5</small>,
})(MdNotificationsActive);
const dataError = [
  {
    ThoiGian: "",
    TieuDeThongBao: " Chưa có dữ liệu",
    NoiDung: "",
  }
]
class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    login: false,
    showModal: false,
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
    user: [],
    notiData: [],
    dataError: [],
    dataerror: false,
    modalForgot: false,
  };

  componentDidMount() {
    this.getUser();
    this.getNoti();
  }


  getUser = () => {
    if (this.state.token !== "") {
      let config = {
        method: "POST",
        body: JSON.stringify({
          token: this.state.token
        })
      }
      fetch(`http://apis.bav.edu.vn/smallgiving/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            user: data
          }, () => this.getNoti())
        })
    }
  }

  handleLogin = () => {
    this.setState({
      // login: true,
      showModal: false,
    })
  }

  handleLogout() {
    this.toggleUserCardPopover()
    this.props.enqueueSnackbar('Đã đăng xuất!', {
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      variant: 'success',
    });
    setTimeout(() => {
      Cookies.remove('small-giving')
      window.location.reload()
    }, 1000)

  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
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

  getNoti = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNhaHaoTam: this.state.user.idNguoiDung
      })
    }
    fetch(`http://apis.bav.edu.vn/smallgiving/thongbao/thongbao.php`, config)
      .then((res) => res.json())
      .then((data) => {

        if (data.message === "No post found") {
          this.setState({ dataerror: true, dataError: dataError });
        } else {
          this.setState({
            dataerror: false,
            notiData: data
          }, () => console.log("noti>>>>>", this.state.notiData))
        }

      })
  }

  handleOpenModalForgot = () => {
    this.setState({
      modalForgot: true,
      showModal: false
    })
  }

  handleCloseModalForgot = () => {
    this.setState({
      modalForgot: false,
      showModal: true
    })
  }

  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      <div>
        <Navbar light expand className={bem.b('bg-white')}>
          <Nav navbar className="mr-2">
            <Button color="secondary" outline onClick={this.handleSidebarControlButton}>
              <MdClearAll size={25} style={{ color: '#ae1f17' }} />
            </Button>
          </Nav>

          <Nav navbar className={bem.e('nav-right')}>
            {this.state.token !== ""
              ? <div className="d-flex justify-content-between">
                <NavItem className="mr-2 mt-2">
                  <NavLink id="Popover1" className="position-relative noti-none">
                    {isNotificationConfirmed ? (
                      <MdNotificationsNone
                        size={25}
                        style={{ color: '#ae1f17' }}
                        onClick={this.toggleNotificationPopover}
                      />
                    ) : (
                        <MdNotificationsActiveWithBadge
                          size={25}
                          className="text-secondary can-click animated swing infinite "
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
                    <PopoverBody className="limit-notiss">
                      <Notifications notificationsData={this.state.dataerror ? this.state.dataError : this.state.notiData} />
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
                        title={this.state.user.TenNguoiDung}
                        subtitle={this.state.user.Email}
                        // text="0359163555"
                        className="border-light"
                      >
                        <ListGroup flush>
                          <ListGroupItem tag="button" action className="border-light">
                            <div onClick={() => this.toggleUserCardPopover()}>
                              <Link to={'/profile'} style={{ color: 'black' }}>
                                <MdPersonPin /> Thông tin người dùng
                              </Link>
                            </div>
                          </ListGroupItem>
                          <ListGroupItem tag="button" action className="border-light" >
                            <div onClick={() => this.handleLogout()}>
                              <MdExitToApp /> Đăng xuất
                            </div>
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
                    onClick={() => {
                      this.setState({
                        showModal: true
                      })
                    }}
                  >
                    Đăng nhập
                  </Button>
                </NavItem>
              </div>
            }
          </Nav>
        </Navbar>
        <ModalLoginPage
          show={this.state.showModal}
          onHide={this.handleCloseModal}
          onLogin={this.handleLogin}
          onForgot={this.handleOpenModalForgot}
        />
        <ModalForgotPassword
          show={this.state.modalForgot}
          onHide={this.handleCloseModalForgot}
        />
      </div>
    );
  }


}

export default withSnackbar(Header);
