import React from 'react';
import {
  Modal,
} from 'react-bootstrap';
import './Modal.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import {phoneNumber, deletePhoneNumber} from "../../services/phoneNumberApi";
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';
// import Authentication from '../../services/auth';
import ModalForgotPassword2 from '../Modal/modalForgotPassword2';

class ModalChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      repassword: '',
      signupInfo: null,
      errOldPass: false,
      errNewPass: false,
      errRePass: false,
    };
  }

  componentDidMount() {
    this.setState({
      oldpassword: '',
      newpassword: '',
      repassword: '',
      errOldPass: false,
      errNewPass: false,
      errRePass: false,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.show) {
      this.setState({
        oldpassword: '',
        newpassword: '',
        repassword: '',
        errOldPass: false,
        errNewPass: false,
        errRePass: false,
      });
    }
  }

  onSubmit = () => {
    if (this.state.oldpassword.length < 6) {
      this.setState({
        errOldPass: true,
      });
      this.props.enqueueSnackbar('Mật khẩu không được nhỏ hơn 6 kí tự !', {
        variant: 'error',
      });
    } else if (this.state.newpassword.length < 6) {
      this.setState({
        errNewPass: true,
      });
      this.props.enqueueSnackbar('Mật khẩu không được nhỏ hơn 6 kí tự !', {
        variant: 'error',
      });
    } else if (this.state.repassword.length < 6) {
      this.setState({
        errRePass: true,
      });
      this.props.enqueueSnackbar('Mật khẩu không được nhỏ hơn 6 kí tự !', {
        variant: 'error',
      });
    } else if (this.state.newpassword != this.state.repassword) {
      this.setState({
        errRePass: true,
      });
      this.props.enqueueSnackbar('Nhập lại mật khẩu chưa chính xác !', {
        variant: 'error',
      });
    } else if (this.state.oldpassword == this.state.newpassword) {
      this.setState({
        errNewPass: true,
      });
      this.props.enqueueSnackbar('Mật khẩu mới không được giống mật khẩu cũ !', {
        variant: 'error',
      });
    } else {
      // this.changePassword();
    }
  };

  // changePassword = () => {
  //   let payload = {
  //     newPassword: this.state.newpassword,
  //     oldPassword: this.state.oldpassword,
  //   };
  //   Authentication.changePassword(payload, res => {
  //     if (res.success) {
  //       this.props.enqueueSnackbar('Thay đổi mật khẩu thành công !', {
  //         variant: 'success',
  //       });
  //       this.props.onHideModal();
  //     } else {
  //       this.setState({
  //         errOldPass: true,
  //       });
  //       this.props.enqueueSnackbar('Nhập sai mật khẩu cũ !', {
  //         anchorOrigin: {
  //           vertical: 'top',
  //           horizontal: 'right',
  //         },
  //         variant: 'error',
  //       });
  //     }
  //   });
  // };


  render() {
    const modalProp = {
      show: this.props.show,
      onHideModal: this.props.onHideModal,
      keyboard: false,
      backdrop: 'static',
    };
    return (
      <div>
        <Modal {...modalProp} dialogClassName="modal-dialog-centered">
          <div className="btn-close">
            <button type="button" className="close" onClick={this.props.onHideModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-container">

          </div>
          <Modal.Body>

            <div>
              <h1 className="text-center" style={{ fontSize: 20 }}><b>ĐỔI MẬT KHẨU</b></h1>
            </div>

            <div>
              <div className="row">
                <label className="col-5 mt-2">Mật khẩu cũ: </label>
                <input
                  type="password"
                  className={this.state.errOldPass ? 'inputPassword w-100 col-7 border-input-error' : 'inputPassword w-100 col-7'}
                  placeholder="Nhập mật khẩu cũ"
                  maxLength={20}
                  value={this.state.oldpassword}
                  onChange={(e) => this.setState({ oldpassword: e.target.value.trim(), errOldPass: false },
                    () => {
                      this.state.oldpassword.length == 0 ? this.setState({ errOldPass: true }) : this.setState({ errOldPass: false });
                    },
                  )}
                />
              </div>

              {/*                                 <div className="row"> */}
              {/*                                     <label className="col-5"></label> */}
              {/*                                     <label className="col-5 font-err">Mật khẩu sai định dạng !</label> */}
              {/*                                 </div> */}

              <div className="row mt-3">
                <label className="col-5 mt-2">Mật khẩu mới: </label>
                <input
                  type="password"
                  className={this.state.errNewPass ? 'inputPassword w-100 col-7 border-input-error' : 'inputPassword w-100 col-7 '}
                  placeholder="Nhập mật khẩu mới"
                  fullWidth
                  maxLength={20}
                  value={this.state.newpassword}
                  onChange={(e) => this.setState({ newpassword: e.target.value.trim(), errNewPass: false },
                    () => {
                      this.state.newpassword.length == 0 ? this.setState({ errNewPass: true }) : this.setState({ errNewPass: false });
                    },
                  )}
                />
              </div>

              <div className="row mt-3">
                <label className="col-5 mt-2">Nhập lại mật khẩu: </label>
                <input
                  type="password"
                  className={this.state.errRePass ? 'inputPassword w-100 col-7 border-input-error' : 'inputPassword w-100 col-7 '}
                  placeholder='Xác nhận mật khẩu mới'
                  fullWidth
                  maxLength={20}
                  value={this.state.repassword}
                  onChange={(e) => this.setState({ repassword: e.target.value.trim(), errRePass: false },
                    () => {
                      this.state.repassword.length == 0 ? this.setState({ errRePass: true }) : this.setState({ errRePass: false });
                    },
                  )}
                />
              </div>
            </div>

            <div container item xs={12}>
              <div item xs={12}>
                <div className="align-center mt-3 mb-2">
                  <button
                    // type="button"
                    className={this.state.oldpassword?.length == 0 || this.state.newpassword?.length == 0 || this.state.repassword?.length == 0 ? 'btn btn-secondary w-50 type-button-fix' : 'btn btn-primary w-50 type-button-fix'}
                    disabled={this.state.oldpassword?.length == 0 || this.state.newpassword?.length == 0 || this.state.repassword?.length == 0}
                    onClick={this.onSubmit}
                  >
                                          <span>
                                            Xác nhận
                                            <i className="flaticon-right"/>
                                          </span>
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/*<ModalForgotPassword2 show={this.state.showForgotPassword2} onHideModal={this.onCloseModalForgotPassword2}*/}
        {/*                      otp={this.state.otpCode} token={this.props.token}/>*/}
      </div>
    );
  }
}


export default withSnackbar(ModalChangePassword);
