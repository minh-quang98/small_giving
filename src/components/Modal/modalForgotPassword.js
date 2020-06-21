import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter,
  FormGroup, Label, Input, Button,
} from 'reactstrap';
import "./Modal.css"
import { TextField, Snackbar } from '@material-ui/core';
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';

class ModalForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      email: '',
      password: '',
      modalForgot: true,
    };
  }


  handleCancel() {
    this.setState({
      modeForgot: true,
      phone: '',
      email: '',
      btnSave: false,
    });
    this.props.onHide();
  }

  checkInput = () => {
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
    } else {
      this.handleForgotPass()
    }
  }

  handleForgotPass = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        Email: this.state.email,
        SDT: this.state.phone
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Doimatkhau/kiemtrapass.php`, config)
      .then(res => res.json())
      .then(data => {
        if (data.message === "tai khoan khong ton tai") {
          this.props.enqueueSnackbar('Tài khoảng không tồn tại !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else if (data.message === "ERROR") {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else {
          this.setState({
            password: data.message,
            modalForgot: false
          })
        }
      })
  }

  keyPress = (event, input) => {
    if (event.keyCode === 13) {
      if (input === 'enter') {
        return this.checkInput();
      } else if (input === 'signUp') {
        // return this.checkSignUp()
      }
    }
  };



  render() {
    let {modalForgot} = this.state
    return (
      <div>
        {modalForgot
          ? <Modal
            isOpen={this.props.show}
            // size="sm"
            style={{ width: "25%", minWidth: 320 }}
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>
              Quên mật khẩu
            </ModalHeader>
            <ModalBody>
              <FormGroup>
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
                <TextField
                  style={{ width: "100%" }}
                  onKeyDown={event => this.keyPress(event, "enter")}
                  label="Số điệnt thoại"
                  variant="outlined"
                  type="number"
                  onChange={(val) => {
                    this.setState({
                      phone: val.target.value
                    })
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex flex-column">
              <div>
                <Button disabled={this.state.btnSave} onClick={() => this.checkInput()}>Xác nhận</Button>
              </div>
            </ModalFooter>
          </Modal>
          : <Modal
            isOpen={this.props.show}
            // size="sm"
            style={{ width: "25%", minWidth: 320 }}
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            centered
          >
            <ModalHeader style={{ backgroundColor: '#ae1f17', color: 'white' }} toggle={this.props.onHide}>
              Thông báo
            </ModalHeader>
            <ModalBody>
              <div>Mật khẩu của bạn là: {this.state.password}</div>
            </ModalBody>
            <ModalFooter className="d-flex flex-column">
              <div>
                <Button disabled={this.state.btnSave} onClick={this.props.onHide}>Xác nhận</Button>
              </div>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }
}

export default withSnackbar(ModalForgotPassword);
