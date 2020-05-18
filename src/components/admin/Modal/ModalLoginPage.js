import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter,
  FormGroup, Label, Input, Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { CardContent } from '@material-ui/core';
import { Col, Row } from 'react-bootstrap';

// import AuthForm, { STATE_LOGIN } from '../AuthForm';

class ModalLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: "",
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

  handleLogin () {
    let config = {
      body: JSON.stringify({
        Email: this.state.email,
        MatKhau: this.state.password
      })
    }
    fetch('https://misappmobile.000webhostapp.com/Dangnhap/dangnhap.php', config)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
            data: data,
          }, () => console.log('kiemtradulieu', this.state.data),
        );
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
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>
              Đăng Nhập
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label>Số điện thoại:</Label>
                <Input placeholder="Nhập số điện thoại"/>
              </FormGroup>
              <FormGroup>
                <Label>Mật khẩu:</Label>
                <Input type="password" placeholder="Nhập mật khẩu"/>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"/>{' '}
                  Nhớ mật khẩu
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex flex-column">



                
              <div>
                <Button color="primary" className="mr-1">Quên mật khẩu</Button>
                <Button onClick={this.props.onLogin}>Đăng nhập</Button>
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
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>Đăng
              ký</ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Số điện thoại:</Label>
                    <Input placeholder="Nhập số điện thoại"/>
                  </FormGroup>
                  <FormGroup>
                    <Label>Mật khẩu:</Label>
                    <Input type="password" placeholder="Nhập mật khẩu"/>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input placeholder="Nhập Email"/>
                  </FormGroup>

                  <FormGroup>
                    <Label>Nhập lại mật khẩu:</Label>
                    <Input placeholder="Nhập lại mật khẩu"/>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox"/>{' '}
                  Đồng ý với các điều khoản
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex flex-column align-content-between">
              <div>
                <Button color="primary" className="mr-4" onClick={this.props.onHide}>Hủy bỏ</Button>
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