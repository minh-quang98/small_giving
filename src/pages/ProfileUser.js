import React, { Component } from 'react';
import Page from 'components/Page';
import { Card, CardHeader, Table, Input, Col, Row, Button } from 'reactstrap';
import {TextField, CardContent, Grid, CircularProgress } from '@material-ui/core'
import Media from 'reactstrap/es/Media';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import GUBN from 'assets/img/banner.png';
import thongtin from 'assets/img/thongtin.png'
import Cookies from 'js-cookie';
// import ModalChangePassword from '../components/Modal/ModalChangePassword';

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state ={
      onEdit: false,
      fullName: "",
      fullNameError: false,
      btnSaveStatus: true,
      sex: "",
      dateBirdth: "",
      dateBirdthError: false,
      phone: "",
      email: "",
      password: "********",
      showModalChangePassword: false,
      idNguoiDung: "",
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
      profile: []
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
      fetch(`https://misappmobile.000webhostapp.com/checktoken.php`, config)
        .then((response) => response.json())
        .then((data)=> {
          this.setState({
            idNguoiDung: data.idNguoiDung
          }, ()=>this.getProfile())
        })
    }
  }

  getProfile = () => {
    fetch(`https://misappmobile.000webhostapp.com/Thongtin/thongtin.php?idNguoiDung=` + this.state.idNguoiDung)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          profile: data
        }, () => console.log("datapro>>>>", data))
      })
  }

  handleCancel() {
    if (this.state.inEditing) {
      this.setState({
        confirmCancel: true
      })
    } else {
      this.setState({onEdit: false}, () => {
        this.setState({
          fullName: this.state.fullName ,
          sex: this.state.sex ,
          dateBirdth: this.state.dateBirdth ,

          fullNameError: false,
          sexError: false,
          dateBirdthError: false,
        })
      })
    }
  }

  handleShowModalForgotPassword = () => {
    this.setState({showModalChangePassword: true});
  };

  onCloseModalForgotPassword = () => {
    this.setState({showModalChangePassword: false});
  }

  render() {
    return (
      <Page title="Thông tin cá nhân">
         <Row>
        <Col xl={12} lg={12} md={12}>
          <Media
            object
            src={GUBN}
            className="rounded mr-2 mb-2"
            style={{ width: '100%', height: '100%' }}
          />
        </Col>
      </Row>
        <Row>
          <Col xl={3} lg={12} md={12}>
            <div className='text-center mb-4' style={{height: 120}}>
                  <span
                    className='img-thumbnail'
                    style={{
                      width: 250,
                      height: 240,
                      overflow: 'hidden',
                      display: 'inline-block',
                      padding: 2
                    }}
                  >
                    <img
                      // src={`https://www.uhy.vn/sites/default/files/uhyco.ltd_.jpg`}
                      src={thongtin}
                      style={{width:'100%',height:'100%'}}
                    />
                  </span>
              {this.state.onEdit ?
                <Dropzone onDrop={acceptedFiles => console.log("img>>>", acceptedFiles)}>
                  {({getRootProps, getInputProps}) => (
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
          <Col xl={9} lg={12} md={12}>
            <Card variant="outlined" className='p-2 mb-5'>
              {this.state.profile.map((item, index) => {
                return (
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
                            InputProps={{style: {height: 28}}}
                            value={this.state.fullName}
                            onChange={(val) => {
                              if (this.state.fullName.length < 50) this.setState({
                                fullName: val.target.value,
                                inEditing: true
                              }, () => {
                                this.state.fullName.length != 0 ? this.setState({fullNameError: false, btnSaveStatus:true}) : this.setState({fullNameError: true, btnSaveStatus:false})
                              })
                            }}
                            maxLength={50}
                            error={this.state.fullNameError}
                            helperText={this.state.fullNameError && 'Vui lòng nhập tên  '}
                          />

                          : item.TenNguoiDung ? item.TenNguoiDung : ''
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
                          ? <label className="text-black-50 m-1">Giới tính
                            <span className={'color-red d-inline'}>*</span></label>
                          : <label className="text-black-50">Giới tính</label>
                        }
                      </div>
                      <div
                        className="pl-0 pb-2 col-md-4 col-lg-4 col-sm-8 kt-margin-b-10-tablet-and-mobile">
                        {this.state.onEdit ?
                          <div className='d-flex col-12'>
                            <div className="form-check col-6 ">
                              <input className="form-check-input" type="radio" value="FEMALE"
                                     onClick={(val) => {
                                       this.setState({
                                         sex: val.target.value,
                                         inEditing: true
                                       })
                                     }}
                                     checked={this.state.sex === 'FEMALE'}
                              />
                              <label className="form-check-label"
                                     htmlFor="exampleRadios1">
                                Nữ
                              </label>
                            </div>
                            <div className="form-check col-6">
                              <input className="form-check-input" type="radio" value="MALE"
                                     onClick={(val) => {
                                       this.setState({
                                         sex: val.target.value,
                                         inEditing: true
                                       })
                                     }}
                                     checked={this.state.sex === 'MALE'}
                              />
                              <label className="form-check-label"
                                     htmlFor="exampleRadios1">
                                Nam
                              </label>
                            </div>
                          </div>
                          : this.state.sex ? this.state.sex == 'MALE' ? 'Nam' : 'Nữ' : ''
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
                            inputProps={{style: {paddingLeft: 6}}}
                            InputProps={{style: {height: 28, margin: 0, fontSize: 14}}}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={this.state.dateBirdth}
                            onChange={(val) => {
                              this.setState({
                                dateBirdth: val.target.value,
                                inEditing: true
                              })
                              // console.log("dateIss>>>>>>", val)
                            }}
                            helperText={this.state.dateBirdthError}
                            error={this.state.dateBirdthError && 'Vui lòng chọn ngày cấp !!'}
                          />

                          : item.NgaySinh ? moment(item.NgaySinh).format("DD-MM-YYYY") : ''
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
                          ? <p className="mt-1">{this.state.phone ? this.state.phone : ''}</p>
                          : <span>{item.SDT ? item.SDT : ''}</span>}
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
                          ? <p className="mt-1">{this.state.email ? this.state.email : ''}</p>
                          : <span>{item.Email ? item.Email : ''}</span>}
                      </div>
                    </div>
                    {this.state.onEdit ? <Grid container spacing={2} justify={"flex-center"}>
                        <Grid item xs={12} sm={12} md={12} className='text-center'>
                          {this.state.loading &&
                          <Button variant="outlined" color="primary"
                                  className='mr-3'
                                  style={{textTransform: 'initial'}}
                          >
                            <CircularProgress size={20} variant="determinate"
                                              value={this.state.progress}/>
                          </Button>}
                          {!this.state.loading &&
                          <Button disabled={!this.state.btnSaveStatus} variant="contained" color="primary"
                                  className='mr-3'
                                  style={{textTransform: 'initial'}}
                            // onClick={() => this.handleSave()}
                          >
                            Lưu
                          </Button>}
                          <Button variant="outlined" style={{textTransform: 'initial'}}
                                  onClick={() => this.handleCancel()}
                          >
                            Hủy
                          </Button>
                        </Grid>
                      </Grid>
                      : <Grid container spacing={3} justify={"flex-center"}>
                        <Grid item xs={12} sm={12} md={12} className='text-center'
                              style={{textTransform: 'initial'}}
                        >
                          <Button variant="contained"
                                  className='rounded mr-md-3 mr-sm-3 mr-lg-3 mb-1' color='primary'
                                  style={{textTransform: 'initial'}}
                                  onClick={() => this.setState({onEdit: !this.state.onEdit})}
                          >
                            Chỉnh sửa thông tin
                          </Button>
                          <Button variant="outlined" className='rounded mb-1'
                                  style={{textTransform: 'initial'}}
                                  onClick={() => this.handleShowModalForgotPassword()}
                          >
                            <a className='ml-3 mr-3'>Đổi mật khẩu</a>
                          </Button>
                        </Grid>
                      </Grid>
                    }
                  </CardContent>
                )
              })}

            </Card>
          </Col>
        </Row>
        {/*<ModalChangePassword show={this.state.showModalChangePassword}*/}
        {/*                     onHideModal={this.onCloseModalForgotPassword}/>*/}
      </Page>
    );
  }
}

export default ProfileUser;
