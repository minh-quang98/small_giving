import React, { Component } from 'react';
import Page from 'components/Page';
import { Card, CardHeader, Table, Input, Col, Row, Button } from 'reactstrap';
import { TextField, CardContent, Grid, CircularProgress } from '@material-ui/core'
import Media from 'reactstrap/es/Media';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import GUBN from 'assets/img/banner.png';
import thongtin from 'assets/img/thongtin.png'
import Cookies from 'js-cookie';
import NumberFormat from 'react-number-format';
import { withSnackbar } from 'notistack';

import ModalChangePassword from '../components/Modal/ModalChangePassword';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onEdit: false,
      fullName: "",
      fullNameError: false,
      btnSaveStatus: true,
      STK: "",
      STKErr: false,
      SoDuTK: "",
      dateBirdth: "",
      dateBirdthError: false,
      phone: "",
      email: "",
      password: "********",
      showModalChangePassword: false,
      idNguoiDung: "",
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
      profile: {},
      showModal: false
    }
  }

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
      fetch(`http://smallgiving.cf/mobileapp/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idNguoiDung: data.idNguoiDung
          }, () => this.getProfile())
        })
    }
  }

  getProfile = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNguoiDung: this.state.idNguoiDung
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Thongtin/thongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        // console.log("datapro>>",data)
        this.setState({
          profile: data,
          dateBirdth: data.NgaySinh,
          phone: data.SDT
        }, () => this.getProfileW4())
      })
  }

  getProfileW4 = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ClientNumber: this.state.phone
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/apiway4/laythongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.Available,
          fullName: data.ContractName,
          STK: data.ContractNumber,
        }, () => console.log("check>>>", this.state.SoDuTK, this.state.STK))
      })
  }

  updateProfile = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNguoiDung: this.state.idNguoiDung,
        TenNguoiDung: this.state.fullName,
        NgaySinh: this.state.dateBirdth,
        // STK: this.state.STK
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Doithongtin/update.php`, config)
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== "Success") {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra!', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else {
          this.updateProfileW4()
        }
      });
  }

  updateProfileW4 = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ClientNumber: this.state.phone,
        ClientName: this.state.fullName
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/apiway4/capnhatthongtin.php`, config)
      .then(res => res.json())
      .then(data => {
        if (data.message !== "success") {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra!', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else {
          this.props.enqueueSnackbar('Thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000)

        }
      })
  }

  handleCancel() {
    this.setState({ onEdit: false }, () => {
      this.setState({
        fullName: this.state.fullName,
        sex: this.state.sex,
        dateBirdth: this.state.dateBirdth,
        STK: this.state.STK,

        fullNameError: false,
        sexError: false,
        dateBirdthError: false,
        STKErr: false
      })
    })
  }

  handleShowModalForgotPassword = () => {
    this.setState({ showModal: true });
  };

  onCloseModalForgotPassword = () => {
    this.setState({ showModal: false });
  }

  render() {
    let { profile } = this.state
    return (
      <Page title="Thông tin cá nhân">
        {/*   <Row>*/}
        {/*  <Col xl={12} lg={12} md={12}>*/}
        {/*    <Media*/}
        {/*      object*/}
        {/*      src={GUBN}*/}
        {/*      className="rounded mr-2 mb-2"*/}
        {/*      style={{ width: '100%', height: '100%' }}*/}
        {/*    />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <Col lg="1"></Col>
          <Col xl={2} lg={2} md={12}>
            <div className='text-center mb-4' style={{ height: 120 }}>
              <span
                className='img-thumbnail'
                style={{
                  width: "100%",
                  height: "auto",
                  overflow: 'hidden',
                  display: 'inline-block',
                  padding: 2
                }}
              >
                <img
                  src={thongtin}
                  style={{ width: '100%', height: '100%' }}
                />
              </span>
              {this.state.onEdit ?
                <Dropzone onDrop={acceptedFiles => console.log("img>>>", acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <span title='Thay đổi logo' className='change-avt-1'>
                      <span {...getRootProps()}>
                        <input {...getInputProps()} />
                      </span>
                    </span>
                  )}
                </Dropzone>
                : <></>
              }

            </div>
          </Col>
          <Col xl={8} lg={8} md={12}>
            <Card variant="outlined" className='p-2 mb-5'>

              <CardContent>
                <div className='row kt-margin-b-20 mb-4 mt-4 font-14'>
                  <div
                    className="pl-0 pb-2 pr-0 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile">
                    {this.state.onEdit === true
                      ? <label className="text-black-50 m-1">Tên tài khoản
                            <span className={'color-red d-inline'}>*</span></label>
                      : <label className="text-black-50">Tên tài khoản</label>
                    }
                  </div>
                  <div
                    className="pl-0 pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile">
                    {this.state.onEdit ?
                      <TextField
                        fullWidth
                        variant={"outlined"}
                        InputProps={{ style: { height: 28 } }}
                        value={this.state.fullName}
                        onChange={(val) => {
                          this.setState({
                            fullName: val.target.value,
                            inEditing: true
                          })
                        }}
                        maxLength={50}
                        error={this.state.fullNameError}
                        helperText={this.state.fullNameError && 'Vui lòng nhập tên  '}
                      />

                      : profile.TenNguoiDung ? profile.TenNguoiDung : ''
                    }
                  </div>
                  <div className="pl-0 pb-2 pr-0 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile">
                    <label className="text-black-50">Mật khẩu</label>
                  </div>
                  <div className="pl-0 pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile">
                    {this.state.password ? this.state.password : ''}

                  </div>
                  <div
                    className="pl-0 pb-2 pr-0 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile">
                    {this.state.onEdit === true
                      ? <label className="text-black-50 m-1">Số tài khoản
                            <span className={'color-red d-inline'}>*</span></label>
                          : <label className="text-black-50">Số tài khoản</label>
                        }
                      </div>
                      <div
                        className="pl-0 pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile">
                        {this.state.onEdit ?
                          // <TextField
                          //   fullWidth
                          //   variant={"outlined"}
                          //   InputProps={{style: {height: 28}}}
                          //   value={this.state.STK}
                          //   onChange={(val) => {
                          //     this.setState({
                          //       STK: val.target.value,
                          //       inEditing: true
                          //     }, () => {
                          //       this.state.STK.length != 0 ? this.setState({STKErr: false, btnSaveStatus:true}) : this.setState({STKErr: true, btnSaveStatus:false})
                          //     })
                          //   }}
                          //   maxLength={50}
                          //   error={this.state.STKErr}
                          //   helperText={this.state.STKErr && 'Vui lòng nhập số tài khoản  '}
                          // />
                          this.state.STK
                          : this.state.STK
                        }
                      </div>
                      <div
                        className="pl-0 pb-2 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile">
                        {this.state.onEdit === true
                          ? <label className="text-black-50 m-1">Ngày sinh
                            <span className={'color-red d-inline'}>*</span></label>
                      : <label className="text-black-50">Ngày sinh</label>
                    }
                  </div>
                  <div
                    className="pl-0 pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile">
                    {this.state.onEdit ?
                      <TextField
                        type="date"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        inputProps={{ style: { paddingLeft: 6 } }}
                        InputProps={{ style: { height: 28, margin: 0, fontSize: 14 } }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={moment(this.state.dateBirdth).format("YYYY-MM-DD")}
                        onChange={(val) => {
                          this.setState({
                            dateBirdth: moment(val.target.value).format("DD-MM-YYYY"),
                            inEditing: true
                          })
                          // console.log("dateIss>>>>>>", val)
                        }}
                        helperText={this.state.dateBirdthError}
                        error={this.state.dateBirdthError && 'Vui lòng chọn ngày cấp !!'}
                      />

                      : profile.NgaySinh ? moment(profile.NgaySinh).format("DD-MM-YYYY") : ''
                    }
                  </div>

                  <div
                    className="pl-0 pb-1 pr-0 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile h-36">
                    {this.state.onEdit === true
                      ? <label className="text-black-50 m-1">Số điện thoại</label>
                      : <label className="text-black-50">Số điện thoại</label>
                    }
                  </div>
                  <div
                    className="pl-0 pb-1 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile h-36">
                    {this.state.onEdit === true
                      ? <p className="mt-1">{profile.SDT ? profile.SDT : ''}</p>
                      : <span>{profile.SDT ? profile.SDT : ''}</span>}
                  </div>
                  <div
                    className="pl-0 pb-2 pr-0 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile h-36">
                    {this.state.onEdit === true
                      ? <label className="text-black-50 m-1">Email</label>
                      : <label className="text-black-50">Email</label>
                    }
                  </div>
                  <div
                    className="pl-0 pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile h-36">
                    {this.state.onEdit === true
                      ? <p className="mt-1">{profile.Email ? profile.Email : ''}</p>
                      : <span>{profile.Email ? profile.Email : ''}</span>}
                  </div>

                  <div
                    className="pl-0 pb-2 pr-0 col-md-2 col-lg-2 col-sm-4 kt-margin-b-10-tablet-and-mobile h-36">
                    {this.state.onEdit === true
                      ? <label className="text-black-50 m-1">Số dư tài khoản</label>
                      : <label className="text-black-50">Số dư tài khoản</label>
                    }
                  </div>
                  <div
                    className=" pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile h-36">
                    {this.state.onEdit === true
                      ? <p className="mt-1">{this.state.SoDuTK}</p>
                      : <span><NumberFormat value={this.state.SoDuTK} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} /></span>}
                  </div>
                </div>
                {this.state.onEdit ? <Grid container spacing={2} justify={"flex-center"}>
                  <Grid item xs={12} sm={12} md={12} className='text-center'>
                    {this.state.loading &&
                      <Button variant="outlined" color="primary"
                        className='mr-3'
                        style={{ textTransform: 'initial' }}
                      >
                        <CircularProgress size={20} variant="determinate"
                          value={this.state.progress} />
                      </Button>}
                    {!this.state.loading &&
                      <Button disabled={!this.state.btnSaveStatus} variant="contained" color="primary"
                        className='mr-3'
                        style={{ textTransform: 'initial' }}
                        onClick={() => this.updateProfile()}
                      >
                        Lưu
                          </Button>}
                    <Button variant="outlined" style={{ textTransform: 'initial' }}
                      onClick={() => this.handleCancel()}
                    >
                      Hủy
                          </Button>
                  </Grid>
                </Grid>
                  : <Grid container spacing={3} justify={"flex-center"}>
                    <Grid item xs={12} sm={12} md={12} className='text-center'
                      style={{ textTransform: 'initial' }}
                    >
                      <Button variant="contained"
                        className='rounded mr-md-3 mr-sm-3 mr-lg-3 mb-1' color='primary'
                        style={{ textTransform: 'initial' }}
                        onClick={() => this.setState({ onEdit: !this.state.onEdit })}
                      >
                        Chỉnh sửa thông tin
                          </Button>
                      <Button variant="outlined" className='rounded mb-1'
                        style={{ textTransform: 'initial' }}
                        onClick={() => this.handleShowModalForgotPassword()}
                      >
                        <a className='ml-3 mr-3'>Đổi mật khẩu</a>
                      </Button>
                    </Grid>
                  </Grid>
                }
              </CardContent>
            </Card>
          </Col>
        </Row>
        <ModalChangePassword show={this.state.showModal}
          onHideModal={this.onCloseModalForgotPassword} />
      </Page>
    );
  }
}

export default withSnackbar(ProfileUser);
