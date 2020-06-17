import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
//import styled from 'styled-components';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react'
const initialState = {
  id: '',
  name: '',
  startdate: '',
  enddate: '',
  image: '',
  content: '',
  address: '',
  total: '',
  token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
  user: [],
  userway4: [],
  totalError: '',
  nameError: '',
  imageError: '',
  contentError: '',
  dataselect: [],
  idhd: '',
  loading: false,
  a: ''
};

class Hoatdongthem extends React.Component {
  state = initialState;
  componentDidMount() {
    this.getUser()
    //this.getdatainsert();
    this.getnth();
    this.creatKey();
  }
  creatKey() {
    this.setState({
      idhd: `${"hd"}_${new Date().getTime()}`
    });
  };
  uploadImage = async e => {
    //this.setState({ files: e.target.files[0] });
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'darwin')
    this.setState({ loading: true }
    )
    this.setState({ a: '' }
    )
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/hocviennganhang/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log('ckeck>>', file.url)
    this.setState({ a: file.secure_url }
    )
    this.setState({ loading: false }
    )
  }
  getnth = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/shownth.php')
      .then(response => response.json())
      .then(dataselect => {
        this.setState(
          {
            dataselect: dataselect,
          },
          () => console.log('kiemtradulieu', this.state.dataselect),
        );
      });
  };
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
            user: data
          })
        })
    }
  }

  getdatainsert() {
    const isValid = this.validate();
    if (isValid) {
      let config = {
        method: "POST",
        body: JSON.stringify({
          idHoatDong: this.state.idhd,
          TenNguoiDung: this.state.id,
          idCTV: this.state.user.idNguoiDung,
          TenHoatDong: this.state.name,
          NoiDung: this.state.content,
          ThoiGianBD: this.state.startdate,
          ThoiGianKT: this.state.enddate,
          DiaChi: this.state.address,
          Anh: this.state.a,
          ChiDK: this.state.total,
        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/hoatdong/insert.php', config)
        .then(response => response.json())
        .then((data) => {
          if (data.message === "success") {
            this.setState({
              userway4: data
            }, () => this.creatAccountWay4())
          }
          else {
            this.props.enqueueSnackbar('Thất bại 1', {
              anchorOrigin: {
                vertical: "top",
                horizontal: "right"
              },
              variant: 'error',
            });
          }
        });
    }

  }
  creatAccountWay4() {
    let config1 = {
      method: "POST",
      body: JSON.stringify({
        ShortName: this.state.name,
        IdentityCardNumber: this.state.idhd,
        ClientNumber: this.state.idhd,
        MobilePhone: this.state.idhd,
        EMail: "abc@gmail.com"

      }),
    };
    fetch('https://misappmobile.000webhostapp.com/apiway4/taotaikhoan.php', config1)
      .then(response => response.json())
      .then((data) => {
        if (data.message === "success") {
          this.props.enqueueSnackbar('Thành công!', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          window.location.reload();

        } else {

          this.props.enqueueSnackbar('Thất bại', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });

        }
      });

  }
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };
  validate = () => {
    let totalError = '';
    let nameError = '';
    let imageError = '';
    let contentError = '';

    if (!this.state.name) {
      nameError = 'Bạn cần nhập tên hoạt động';
    }
    if (!this.state.total) {
      totalError = 'Bạn cần nhập một số tiền';
    }
    if (!this.state.content) {
      contentError = 'Bạn cần nhập nội dung';
    }
    // if (!this.state.image) {
    //   imageError = 'Bạn cần chọn một hình ảnh';
    // }
    if (nameError || totalError || contentError) {
      this.setState({ nameError, totalError, contentError });
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    event.preventDefault();

  };
  handleCkeditorState = (event, editor) => {
    const data = editor.getData();
    this.setState({
      content: data
    })
  }
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Thêm mới hoạt động
        </ModalHeader>
        <ModalBody >
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <CardBody >
                <Row>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText"> ID hoạt động</Label>
                        <Input

                          type="text"
                          name="idhd"
                          value={this.state.idhd}
                          disabled="true"


                        >

                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText"> Người thụ hưởng</Label>
                        <Input

                          type="select"
                          name="id"
                          value={this.state.id}
                          onChange={val => {
                            this.setState({
                              id: val.target.value,
                            });

                          }}

                        ><option></option>{this.state.dataselect.map(Item => {
                          return <option>{Item.TenNguoiDung}</option>;
                        })}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleDate">Ngày bắt đầu</Label>
                        <Input
                          type="date"
                          name="startdate"
                          value={this.state.startdate}
                          onChange={val => {
                            this.setState({
                              startdate: val.target.value,
                            });

                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleImage">
                          {' '}
                        Hình ảnh / Video <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">{this.state.imageError}</div>
                        <Input
                          type="file"
                          name="file"
                          onChange={this.uploadImage}
                        />
                        {this.state.loading ? (
                          <h3>Loading...</h3>
                        ) : (
                            <img src={this.state.a} style={{ width: '300px' }}></img>
                          )

                        }

                      </FormGroup>

                    </Form>
                  </Col>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText">
                          Tên hoạt động <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">{this.state.nameError}</div>
                        <Input
                          type="text"
                          name="name"
                          value={this.state.name}

                          onChange={val => {
                            this.setState({
                              name: val.target.value,
                            });

                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText"> Địa chỉ</Label>
                        <Input
                          type="text"
                          name="address"
                          value={this.state.address}
                          onChange={val => {
                            this.setState({
                              address: val.target.value,
                            });

                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleDate">Ngày kết thúc </Label>
                        <Input
                          type="date"
                          name="enddate"
                          value={this.state.enddate}

                          onChange={val => {
                            this.setState({
                              enddate: val.target.value,
                            });

                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="exampleNumber">
                          {' '}
                          Kinh phí dự kiến <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">
                          {this.state.totalError}
                        </div>
                        <Input
                          type="number"
                          name="total"
                          value={this.state.total}

                          onChange={val => {
                            this.setState({
                              total: val.target.value,
                            });

                          }}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xl={12}>

                    <Form>
                      <Label for="exampleText">
                        Nội dung <span className="red-text">*</span>
                      </Label>
                      <div className="error-text">
                        {this.state.contentError}
                      </div>
                      <CKEditor
                        //id="content"
                        editor={ClassicEditor}
                        onInit={editor => { }}
                        value={this.state.content}
                        config={
                          {
                            ckfinder: {
                              uploadUrl: '/uploads'
                            }

                          }

                        }
                        onChange={this.handleCkeditorState}


                      />
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <div className="center-text-submit">
              <Container>
                <Button color="danger"
                  type="submit"
                  pill className="px-4 my-3"
                  onClick={() => this.getdatainsert()}
                >
                  Đăng tải
                </Button>

              </Container>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Hoatdongthem);
