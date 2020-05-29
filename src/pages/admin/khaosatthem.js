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
  url: '',
  patron: '',
  eachturn: '',
  token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
  user: [],

  nameError: '',
  urlError: '',
  eachturnError: '',
  dataselect: [],
};

class Khaosatthem extends React.Component {
  state = initialState;
  componentDidMount() {
    this.getUser()
    //this.getdatainsert();
    this.getnhataitro();
  }
  getnhataitro = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/shownhataitro.php')
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
          idCTV: this.state.user.idNguoiDung,
          TenKhaoSat: this.state.name,
          TenNguoiDung: this.state.patron,
          Link: this.state.url,
          ThoiGianBD: this.state.startdate,
          ThoiGianKT: this.state.enddate,
          SoTienML: this.state.eachturn,
        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/taokhaosat/insert.php', config)
        .then(response => response.json())
        .then((data) => {
          if (data.message === "success") {
            this.setState({
              userway4: data
            }, () => this.creatAccountWay4())

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
      //this.setState(initialState);
    }
  }
  creatAccountWay4() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ShortName: this.state.name,
        IdentityCardNumber: this.state.id,
        ClientNumber: this.state.id,
        MobilePhone: this.state.id,
        EMail: "abc@gmail.com"
      }),
    };
    fetch('https://misappmobile.000webhostapp.com/apiway4/taotaikhoan.php', config)
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
    let urlError = '';
    let nameError = '';
    let eachturnError = '';

    if (!this.state.name) {
      nameError = 'Bạn cần nhập tên khảo sát';
    }
    if (!this.state.url) {
      urlError = 'Bạn cần nhập link khảo sát';
    }
    if (!this.state.eachturn) {
      eachturnError = 'Bạn cần nhập một số tiền';
    }
    if (nameError || urlError || eachturnError) {
      this.setState({ nameError, urlError, eachturnError });
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Thêm mới khảo sát
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <CardBody>
                <Row>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText">Mã khảo sát</Label>
                        <Input

                          type="text"
                          name="id"
                          value={this.state.id}
                          onChange={val => {
                            this.setState({
                              id: val.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleDate">Thời gian bắt đầu</Label>

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
                        <Label for="exampleEmail"> Thuộc nhà tài trợ</Label>
                        <Input
                          type="select"
                          name="patron"
                          value={this.state.patron}
                          onChange={val => {
                            this.setState({
                              patron: val.target.value,
                            });
                          }}
                        ><option></option>{this.state.dataselect.map(Item => {
                          return <option>{Item.TenNguoiDung}</option>;
                        })}
                        </Input>
                      </FormGroup>

                    </Form>
                  </Col>

                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText">
                          Tên khảo sát <span className="red-text">*</span>
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
                        <Label for="exampleDate">Thời gian kết thúc</Label>
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
                          Số tiền cho mỗi lượt khảo sát{' '}
                          <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">
                          {this.state.eachturnError}
                        </div>
                        <Input
                          type="number"
                          name="eachturn"
                          value={this.state.eachturn}
                          onChange={val => {
                            this.setState({
                              eachturn: val.target.value,
                            });
                          }}
                        />
                      </FormGroup>


                    </Form>

                  </Col>
                  <Col>
                    <Form>
                      <FormGroup>
                        <Label for="exampleUrl">
                          Link khảo sát <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">{this.state.urlError}</div>
                        <Input
                          type="url"
                          name="url"
                          value={this.state.url}
                          onChange={val => {
                            this.setState({
                              url: val.target.value,
                            });
                          }}
                        />
                      </FormGroup>

                    </Form>
                  </Col>

                </Row>
              </CardBody>
            </Card>
            <div className="center-text-submit">
              <Container>
                <Button color="danger" type="submit" pill
                  className="px-4 my-3"
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
export default withSnackbar(Khaosatthem);
