import React from 'react';
// import {withSnackbar} from "notistack";
// import "./Modal.css"
// import Cookies from "js-cookie";
import {
  Modal,
} from 'react-bootstrap';

// import Authentication from "../../services/auth";

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
      })
      this.props.enqueueSnackbar('Mật khẩu không được nhỏ hơn 6 kí tự !', {
        variant: 'error',
      });
    } else if (this.state.newpassword.length < 6) {
      this.setState({
        errNewPass: true,
      })
      this.props.enqueueSnackbar('Mật khẩu không được nhỏ hơn 6 kí tự !', {
        variant: 'error',
      });
    } else if (this.state.repassword.length < 6) {
      this.setState({
        errRePass: true,
      })
      this.props.enqueueSnackbar('Mật khẩu không được nhỏ hơn 6 kí tự !', {
        variant: 'error',
      });
    } else if (this.state.newpassword != this.state.repassword) {
      this.setState({
        errRePass: true,
      })
      this.props.enqueueSnackbar('Nhập lại mật khẩu chưa chính xác !', {
        variant: 'error',
      });
    } else if (this.state.oldpassword == this.state.newpassword) {
      this.setState({
        errNewPass: true,
      })
      this.props.enqueueSnackbar('Mật khẩu mới không được giống mật khẩu cũ !', {
        variant: 'error',
      });
    } else {
      // this.changePassword()
    }
  }

//     changePassword = () => {
//         let payload = {
//             newPassword: this.state.newpassword,
//             oldPassword: this.state.oldpassword,
//         }
//         Authentication.changePassword(payload, res => {
//             if (res.success) {
//                 this.props.enqueueSnackbar('Thay đổi mật khẩu thành công !', {
//                     variant: 'success',
//                 });
//                 this.props.onHideModal();
//             } else {
//                 this.setState({
//                     errOldPass: true,
//                 });
//                 this.props.enqueueSnackbar('Nhập sai mật khẩu cũ !', {
//                     anchorOrigin: {
//                         vertical: "top",
//                         horizontal: "right"
//                     },
//                     variant: 'error',
//                 });
//             }
//         })
//     }


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

            <div className='mb-3 mt-1'>
              <h1 className="text-center " style={{fontSize: 20,}}><b>ĐỔI MẬT KHẨU</b></h1>
            </div>

            <div className='mt-5 mb-5 ml-3 mr-3'>
              <div className="row">
                <label className="col-5 mt-2">Mật khẩu cũ: </label>
                <input
                  type="password"
                  className={this.state.errOldPass ? "inputPassword w-100 col-7 border-input-error" : "inputPassword w-100 col-7"}
                  placeholder="Nhập mật khẩu cũ"
                  maxLength={20}
                  value={this.state.oldpassword}
                  onChange={(e) => this.setState({
                      oldpassword: e.target.value.trim(),
                      errOldPass: false
                    },
                    () => {
                      this.state.oldpassword.length == 0 ? this.setState({errOldPass: true}) : this.setState({errOldPass: false})
                    }
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
                  className={this.state.errNewPass ? "inputPassword w-100 col-7 border-input-error " : "inputPassword w-100 col-7 "}
                  placeholder="Nhập mật khẩu mới"
                  fullWidth
                  maxLength={20}
                  value={this.state.newpassword}
                  onChange={(e) => this.setState({
                      newpassword: e.target.value.trim(),
                      errNewPass: false
                    },
                    () => {
                      this.state.newpassword.length == 0 ? this.setState({errNewPass: true}) : this.setState({errNewPass: false})
                    }
                  )}
                />
              </div>

              <div className="row mt-3">
                <label className="col-5 mt-2">Nhập lại mật khẩu: </label>
                <input
                  type="password"
                  className={this.state.errRePass ? "inputPassword w-100 col-7 border-input-error" : "inputPassword w-100 col-7 "}
                  placeholder='Xác nhận mật khẩu mới'
                  fullWidth
                  maxLength={20}
                  value={this.state.repassword}
                  onChange={(e) => this.setState({
                      repassword: e.target.value.trim(),
                      errRePass: false
                    },
                    () => {
                      this.state.repassword.length == 0 ? this.setState({errRePass: true}) : this.setState({errRePass: false})
                    }
                  )}
                />
              </div>
            </div>

            <div className=" align-center col-12">
              <div className="d-flex justify-content-center align-center mt-3 mb-2">
                <button
                  // type="button"
                  onClick={this.onSubmit}
                >
                                          <span>
                                            Xác nhận
                                            <i className="flaticon-right"/>
                                          </span>
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


export default ModalChangePassword;
