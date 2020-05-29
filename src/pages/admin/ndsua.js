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
  Modal,
  ModalBody,
  ModalHeader,
  Container,
} from 'reactstrap';
import { withSnackbar } from 'notistack';



const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  stk: "",
  dateofbirth: "",
  password: "",
  tennhom: "",

  emailError: "",
  phoneError: "",
  tennhomError: "",
  passwordError: "",
  dataselect: [],

};

class Nguoidungsua extends React.Component {
  state = initialState;
  componentDidMount() {
    this.getdataselect();
  }
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);


    this.getdatashow();
    //this.getdataupdate();
  }
  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNguoiDung: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/nguoidung/testselect.php', config)
      .then(response => response.json())
      .then(datashow => {
        this.setState(
          {
            id: datashow.idNguoiDung,
            name: datashow.TenNguoiDung,
            email: datashow.Email,
            phone: datashow.SDT,
            stk: datashow.STK,
            dateofbirth: datashow.NgaySinh,
            password: datashow.MatKhau,
            tennhom: datashow.TenNhom,
          },
          () => console.log('kiemtradulieu>>', this.state.datashow),
        );
      });
  }
  getdataselect = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/shownhomnd.php')
      .then((response) => response.json())
      .then((dataselect) => {
        this.setState({
          dataselect: dataselect,
        }, () => console.log('kiemtradulieu', this.state.dataselect),

        );
      });
  };
  getdataupdate() {
    const isValid = this.validate();
    if (isValid) {
      let config2 = {
        method: "POST",
        body: JSON.stringify({
          idNguoiDung: this.state.id,
          TenNguoiDung: this.state.name,
          Email: this.state.email,
          SDT: this.state.phone,
          STK: this.state.stk,
          NgaySinh: this.state.dateofbirth,
          MatKhau: this.state.password,
          TenNhom: this.state.tennhom,
        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/nguoidung/testupdate.php', config2)
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
      //this.setState(initialState);
    }
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
    let idnhomError = '';
    let passwordError = '';

    if (!this.state.idnhom) {
      idnhomError = 'Bạn cần chọn một nhóm người dùng';
    }

    if (!this.state.password) {
      passwordError = 'Bạn cần nhập mật khẩu';
    }
    if (idnhomError || passwordError) {
      this.setState({ idnhomError, passwordError });
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
          Sửa thông tin người dùng
        </ModalHeader>
        <ModalBody>

          <Form onSubmit={() => this.handleSubmit()}
          >
            <Card>
              <CardBody>

                <Row>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup >
                        <Label for="exampleText"> Mã người dùng</Label>
                        <Input
                          disabled="true"
                          type="text"
                          name="id"
                          value={this.state.id}
                        />
                      </FormGroup>
                      <FormGroup >
                        <Label for="exampleSelect">Nhóm người dùng <span className="red-text">*</span></Label>

                        <div className="error-text">
                          {this.state.tennhomError}
                        </div>
                        <Input
                          type="select"
                          name="tennhom"

                          value={this.state.tennhom}
                          onChange={(val) => {
                            this.setState({
                              tennhom: val.target.value
                            })
                          }}
                        >{this.state.dataselect.map((Item, index) => {
                          return (

                            <option>{Item.TenNhom}</option>
                          );
                        })}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText">{' '}Số điện thoại <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">
                          {this.state.phoneError}
                        </div>
                        <Input
                          disabled="true"
                          type="phone"
                          name="phone"
                          value={this.state.phone}
                          onChange={(val) => {
                            this.setState({
                              phone: val.target.value
                            })
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleEmail">Email <span className="red-text">*</span></Label>
                        <div className="error-text">
                          {this.state.emailError}
                        </div>
                        <Input
                          disabled="true"
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={(val) => {
                            this.setState({
                              email: val.target.value
                            })
                          }}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup >
                        <Label for="exampleText"> Họ tên</Label>
                        <Input
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={(val) => {
                            this.setState({
                              name: val.target.value,

                            })
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleDate">Ngày sinh</Label>
                        <Input
                          type="date"
                          name="dateofbirth"
                          value={this.state.dateofbirth}
                          onChange={(val) => {
                            this.setState({
                              dateofbirth: val.target.value
                            })
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText">Số tài khoản</Label>
                        <Input
                          type="text"
                          name="stk"
                          value={this.state.stk}
                          onChange={(val) => {
                            this.setState({
                              stk: val.target.value
                            })
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText">Password <span className="red-text">*</span></Label>
                        <div className="error-text">
                          {this.state.passwordError}
                        </div>
                        <Input
                          type="text"
                          name="password"
                          value={this.state.password}
                          onChange={(val) => {
                            this.setState({
                              password: val.target.value,

                            })
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
                  onClick={() => this.getdataupdate()}
                >
                  Cập nhật
                </Button>

              </Container>
            </div>
          </Form>

        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Nguoidungsua);
