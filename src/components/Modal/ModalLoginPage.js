import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter,
  FormGroup, Label, Input, Button,
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';

class ModalLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      password: '',
      showLogin: '',
      modeLogin: true,
    };
  }

  handleChangeSignUp() {
    this.setState({
      modeLogin: false,
    });
  }

  handleChangeLogIn() {
    this.setState({
      modeLogin: true,
    });
  }

  handleCancel() {
    this.setState({
      modeLogin: true,
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
    fetch('https://misappmobile.000webhostapp.com/Dangnhap/dangnhap.php', config)
      .then((response) => response.json())
      .then((data) => {
        Cookies.set('small-giving', data.token, { expires: 1 });
        this.props.onLogin();
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        {this.state.modeLogin
          ?
          <Modal
            isOpen={this.props.show}
            size="sm"
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
                  style={{width: "100%"}}
                  label="Email"
                  variant="outlined"
                  onChange={(val)=> {
                    this.setState({
                      email: val.target.value
                    })
                  }}
                />
              </FormGroup>
              <FormGroup>
                {/*<Label>Mật khẩu:</Label>*/}
                <TextField
                  style={{width: "100%"}}
                  label="Mật khẩu"
                  variant="outlined"
                  type="password"
                  onChange={(val) => {
                    this.setState({
                      password: val.target.value
                    })
                    // console.log("matkhau>>>", val.target.value)
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
                <Button color="primary" className="mr-1">Quên mật khẩu</Button>
                <Button onClick={()=>this.handleLogin()}>Đăng nhập</Button>
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
            size="sm"
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>Đăng
              ký</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input placeholder="Nhập số điện thoại"/>
              </FormGroup>

              <FormGroup>
                <Label>Email:</Label>
                <Input placeholder="Nhập Email"/>
              </FormGroup>

              <FormGroup>
                <Label>Họ và tên:</Label>
                <Input placeholder="Nhập tên"/>
              </FormGroup>

              <FormGroup>
                <Label>Mật khẩu:</Label>
                <Input type="password" placeholder="Nhập mật khẩu"/>
              </FormGroup>

              <FormGroup>
                <Label>Nhập lại mật khẩu:</Label>
                <Input placeholder="Nhập lại mật khẩu"/>
              </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex flex-column align-content-between">
              <div>
                <Button color="primary" className="mr-4" onClick={() => this.handleCancel()}>Hủy bỏ</Button>
                <Button>Đăng ký</Button>
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

export default ModalLoginPage;
