import Avatar from 'components/Avatar';
import {UserCard} from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import {notificationsData} from 'demos/header';
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
    };

    toggleNotificationPopover = () => {
        this.setState({
            isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
        });

        if (!this.state.isNotificationConfirmed) {
            this.setState({isNotificationConfirmed: true});
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
        const {isNotificationConfirmed} = this.state;

        return (
            <Navbar light expand className={bem.b('bg-white')}>
                <Nav navbar className="mr-2">
                    <Button color="secondary" outline onClick={this.handleSidebarControlButton}>
                        <MdClearAll size={25} style={{color: "#ae1f17"}}/>
                    </Button>
                </Nav>

                <Nav navbar className={bem.e('nav-right')}>
                    <NavItem className="d-inline-flex">
                        <NavLink id="Popover1" className="position-relative">
                            {isNotificationConfirmed ? (
                                <MdNotificationsNone
                                    size={25}
                                    style={{color: "#ae1f17"}}
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
                            style={{minWidth: 250}}
                        >
                            <PopoverBody className="p-0 border">
                                <UserCard
                                    title="Phượng"
                                    subtitle="phuong@doham.com"
                                    text="0359163555"
                                    className="border-light"
                                >
                                    <ListGroup flush>
                                        <ListGroupItem tag="button" action className="border-light">
                                            <Button outline color="secondary">
                                                {/*<Link to={}*/}
                                                <MdPersonPin/> Thông tin cá nhân
                                            </Button>
                                        </ListGroupItem>
                                        <ListGroupItem tag="button" action className="border-light">
                                            <Button>
                                                <MdExitToApp/> Đăng xuất
                                            </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </UserCard>
                            </PopoverBody>
                        </Popover>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;
