import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter,
  FormGroup, Label, Input, Button,
} from 'reactstrap';
import "./Modal.css"
import { TextField, Snackbar } from '@material-ui/core';
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';

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
      loading: false
    };
  }


  handleChangeSignUp() {
    this.setState({
      modeLogin: false,
      email: '',
      password: '',
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
          this.props.enqueueSnackbar('Đăng ký thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          this.setState({
            modeLogin: true,
          })
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
                <Button outline color="primary" className="mr-1">Quên mật khẩu?</Button>
                <Button onClick={() => this.handleLogin()}>Đăng nhập</Button>
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
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>Đăng
              ký</ModalHeader>
            <ModalBody>
              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
                  label="Số điện thoại"
                  variant="outlined"
                  onChange={(val) => {
                    this.setState({
                      phone: val.target.value
                    })
                  }}
                />
              </FormGroup>

              <FormGroup>
                <TextField
                  style={{ width: "100%" }}
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
                <Button onClick={() => this.checkSignUp()}>Đăng ký</Button>
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
