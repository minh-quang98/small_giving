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
};

class Hoatdongthem extends React.Component {
  state = initialState;
  componentDidMount() {
    this.getUser()
    //this.getdatainsert();
    this.getnth();
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
          }, () => this.getdatainsert())
        })
    }
  }

  getdatainsert() {
    //const isValid = this.validate();
    //if (isValid) {
    let config = {
      method: "POST",
      body: JSON.stringify({
        TenNguoiDung: this.state.id,
        idCTV: this.state.user.idNguoiDung,
        TenHoatDong: this.state.name,
        NoiDung: this.state.content,
        ThoiGianBD: this.state.startdate,
        ThoiGianKT: this.state.enddate,
        DiaChi: this.state.address,
        Anh: this.state.image,
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
          //notifydefeat('this is a notify');
        }
      });
    //this.setState(initialState);
    //}

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
      this.props.enqueueSnackbar('Không được bỏ trống tên!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    }
    if (!this.state.total) {
      this.props.enqueueSnackbar('Không được bỏ trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    }
    if (!this.state.content) {
      this.props.enqueueSnackbar('Không được bỏ trống nội dung!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      //clear form
      this.setState(initialState);
    }
  };
  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Thêm mới hoạt động
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <CardBody>
                <Row>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText"> ID hoạt động</Label>
                        <Input

                          type="text"
                          name="idhd"
                          value={this.state.idhd}
                          onChange={val => {
                            this.setState({
                              idhd: val.target.value,
                            });

                          }}

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
                          name="image"
                          value={this.state.image}
                          onChange={val => {
                            this.setState({
                              image: val.target.value,
                            });

                          }}
                        />
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
                      <Input
                        type="textarea"
                        name="content"
                        value={this.state.content}
                        onChange={val => {
                          this.setState({
                            content: val.target.value,
                          });

                        }}
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
