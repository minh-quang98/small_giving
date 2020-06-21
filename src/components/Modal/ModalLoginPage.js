import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter,
  FormGroup, Label, Input, Button,
} from 'reactstrap';
import "./Modal.css"
import { TextField, Snackbar } from '@material-ui/core';
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';
import ModalForgotPassword from './modalForgotPassword';

class ModalLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      name: "",
      password: '',
      rePassword: '',
      showLogin: '',
      modeLogin: true,
      modalForgot: false,
      loading: false,
      regexp : /^[0-9\b]+$/
    };
  }


  handleChangeSignUp() {
    this.setState({
      modeLogin: false,
      phone: '',
      email: '',
      name: "",
      password: '',
      rePassword: '',
    });
  }

  handleChangeLogIn() {
    this.setState({
      modeLogin: true,
      phone: '',
      email: '',
      name: "",
      password: '',
      rePassword: '',
    });
  }

  handleCancel() {
    this.setState({
      modeLogin: true,
      phone: '',
      email: '',
      name: "",
      password: '',
      rePassword: '',
      btnSave: false,
    });
    this.props.onHide();
  }

  handleLogin() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        Email: this.state.email,
        MatKhau: this.state.password,
      }),
    };
    fetch(`http://smallgiving.cf/mobileapp/Dangnhap/dangnhap.php`, config)
      .then((response) => response.json())
      .then((data) => {
        if (data.token === "error") {
          this.props.enqueueSnackbar('Sai tên đăng nhập hoặc mật khẩu !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else {
          this.props.enqueueSnackbar('Đăng nhập thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          setTimeout(() => {
            Cookies.set('small-giving', data.token, { expires: 1 });
            this.props.onLogin();
            window.location.reload();
          }, 1000)

        }
      });
  }

  checkSignUp() {
    if (this.state.email === "") {
      this.props.enqueueSnackbar('Không được để trống Email', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.phone === "") {
      this.props.enqueueSnackbar('Không được để trống số điện thoại', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.name === "") {
      this.props.enqueueSnackbar('Không được để trống tên', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.password === "") {
      this.props.enqueueSnackbar('Không được để trống mật khẩu !', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.password.length < 6) {
      this.props.enqueueSnackbar('Mật khẩu phải lớn hơn 6 ký tự !', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.rePassword.length < 6) {
      this.props.enqueueSnackbar('Nhập lại mật khẩu phải lớn hơn 6 ký tự !', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.rePassword !== this.state.password) {
      this.props.enqueueSnackbar('Nhập lại mật khẩu phải giống mật khẩu !', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else {
      this.handleSignUp()
    }
  }

  handleSignUp() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        Email: this.state.email,
        SDT: this.state.phone,
        TenNguoiDung: this.state.name,
        MatKhau: this.state.password,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/Dangky/nhapsodienthoai.php', config)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Dang ki thanh cong") {
          this.handleSignUpW4()
        } else {
          this.props.enqueueSnackbar('Tài khoản đã tồn tại !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      });
  }

  handleSignUpW4 = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ShortName: this.state.name,
        ClientNumber: this.state.phone,
        IdentityCardNumber: this.state.phone,
        MobilePhone: this.state.phone,
        EMail: this.state.email
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/apiway4/taotaikhoan.php`, config)
      .then(res=> res.json())
      .then(data => {
        if (data.message === "success") {
          this.handleWallet20k()
        } else {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      })
  }

  handleChangePhone(val) {
    const re = /^[0-9\b]+$/;
    if (val.target.value === '' || re.test(val.target.value)) {
      this.setState({phone: val.target.value})
    }
  };

  handleWallet20k = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ClientNumber: this.state.phone
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/apiway4/nap20.php`, config)
      .then(res => res.json())
      .then(data => {
        if(data.message === "success") {
          this.props.enqueueSnackbar('Đăng ký thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          this.setState({
            phone: '',
            email: '',
            name: "",
            password: '',
            rePassword: '',
            modeLogin: true,
          })
        } else {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      })
  }

  keyPress = (event, input) => {
    if (event.keyCode === 13) {
      if (input === 'enter') {
        return this.handleLogin();
      } else if (input === 'signUp') {
        return this.checkSignUp()
      }
    }
  };

  render() {
    return (
      <div>

        {this.state.modeLogin
          ?
          <Modal
            isOpen={this.props.show}
            // size="sm"
            style={{ width: "25%", minWidth: 320 }}
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>
              Đăng Nhập
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                {/*<Label>Email:</Label>*/}
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "enter")}
                  label="Email"
                  variant="outlined"
                  onChange={(val) => {
                    this.setState({
                      email: val.target.value
                    })
                  }}
                />
              </FormGroup>
              <FormGroup>
                {/*<Label>Mật khẩu:</Label>*/}
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "enter")}
                  label="Mật khẩu"
                  variant="outlined"
                  type="password"
                  onChange={(val) => {
                    this.setState({
                      password: val.target.value
                    })
                  }}
                />
              </FormGroup>
              {/*<FormGroup check>*/}
              {/*  <Label check>*/}
              {/*    <Input type="checkbox"/>{' '}*/}
              {/*    Nhớ mật khẩu*/}
              {/*  </Label>*/}
              {/*</FormGroup>*/}
            </ModalBody>
            <ModalFooter className="d-flex flex-column">
              <div>
                <Button outline color="primary" className="mr-1" onClick={this.props.onForgot}
                >
                  Quên mật khẩu?
                </Button>
                <Button disabled={this.state.btnSave} onClick={() => this.handleLogin()}>Đăng nhập</Button>
              </div>
              <div className="mt-2">Hoặc</div>
              <div className="mt-2">
                <Button outline onClick={() => this.handleChangeSignUp()}>
                  Đăng ký
                </Button>
              </div>
            </ModalFooter>
          </Modal>
          : <Modal
            isOpen={this.props.show}
            // size="sm"
            style={{ width: "25%",minWidth: 320 }}
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>Đăng ký</ModalHeader>
            <ModalBody>
              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "signUp")}
                  label="Số điện thoại"
                  variant="outlined"
                  type="number"
                  onChange={(val) => {
                    this.handleChangePhone(val)
                  }}
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "signUp")}
                  label="Email"
                  variant="outlined"
                  onChange={(val) => {
                    this.setState({
                      email: val.target.value
                    })
                  }}
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "signUp")}
                  label="Họ và tên"
                  variant="outlined"
                  onChange={(val) => {
                    this.setState({
                      name: val.target.value
                    })
                  }}
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "signUp")}
                  label="Mật khẩu"
                  variant="outlined"
                  type="password"
                  onChange={(val) => {
                    this.setState({
                      password: val.target.value
                    })
                  }}
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "signUp")}
                  label="Nhập lại mật khẩu"
                  variant="outlined"
                  type="password"
                  onChange={(val) => {
                    this.setState({
                      rePassword: val.target.value
                    })
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex flex-column align-content-between">
              <div>
                <Button outline color="primary" className="mr-4" onClick={() => this.handleCancel()}>Hủy bỏ</Button>
                <Button disabled={this.state.btnSave} onClick={() => this.checkSignUp()}>Đăng ký</Button>
              </div>
              <div className="mt-2">Hoặc</div>
              <div className="mt-2">
                <Button outline onClick={() => this.handleChangeLogIn()}>
                  Đăng nhập
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        }

      </div>
    );
  }
}

export default withSnackbar(ModalLoginPage);
