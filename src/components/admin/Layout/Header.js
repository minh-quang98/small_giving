import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
//import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
//import { notificationsData } from 'demos/header';
//import withBadge from 'hocs/withBadge';
import React from 'react';
import { MdClearAll, MdExitToApp } from 'react-icons/md';
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
import Cookies from 'js-cookie';
//import AuthForm,{ STATE_LOGIN} from '../AuthForm'

const bem = bn.create('header');

// const MdNotificationsActiveWithBadge = withBadge({
//   size: 'md',
//   color: 'primary',
//   style: {
//     top: -10,
//     right: -10,
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   children: <small>5</small>,
// })(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
    user: [],     
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
      fetch(`https://misappmobile.000webhostapp.com/checktoken.php`, config)
        .then((response) => response.json())
        .then((data)=> {
          this.setState({
            user: data
          }, ()=>console.log("data>>", data))
        })
    }
  }
  
  handleLogout () {
    Cookies.remove('small-giving')
    window.location.reload()
  }

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
    //const { isNotificationConfirmed } = this.state;

    return (
      
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>
        

        <Nav navbar className={bem.e('nav-right')}>
        {this.state.token !== ""
          ?<NavItem>
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
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={this.state.user.TenNguoiDung}
                  subtitle="Cộng tác viên kế toán"
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <div onClick={() => this.handleLogout()}>
                        <MdExitToApp /> Đăng xuất
                      </div>
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
               
            </Popover>
          </NavItem>
          :<NavItem></NavItem>
          }
        </Nav>
  
      </Navbar>
    
    );
  }
}

export default Header;
