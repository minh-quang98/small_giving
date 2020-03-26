import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter,
  FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
// import AuthForm, { STATE_LOGIN } from '../AuthForm';

class ModalLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      password: "",
      showLogin: ""
    }
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.show}
          size="sm"
          backdrop="static"
          backdropClassName="modal-backdrop-light"
          centered>
          <ModalHeader style={{backgroundColor: "#ae1f17", color: "white"}} toggle={this.props.onHide}>Đăng Nhập</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label >Số điện thoại:</Label>
              <Input placeholder="Nhập số điện thoại" />
            </FormGroup>
            <FormGroup>
              <Label >Mật khẩu:</Label>
              <Input type="password" placeholder="Nhập mật khẩu" />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                Nhớ mật khẩu
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter className="d-flex flex-column">
            <div>
              <Button color="primary" className="mr-1">Quên mật khẩu</Button>
              <Button>Đăng nhập</Button>
            </div>
            <div className="mt-2">
              <Link to={""}>Bạn chưa có tài khoản? Nhấn vào đây để đăng ký</Link>
            </div>

          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalLoginPage;
