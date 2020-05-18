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
  idnhom: "",

  emailError: "",
  phoneError: "",
  idnhomError: "",
  passwordError: "",
  dataselect: [],

};

class Nguoidungsua extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getdatashow();
    this.getdataselect();
    this.getdataupdate();
  }
  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNguoiDung: this.props.chooseId,
      }),
    };
    fetch('https://misappmobile.000webhostapp.com/trangquantri/admin/nguoidung/select.php', config)
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
            idnhom: datashow.idNhom,
          },
          () => console.log('kiemtradulieu>>', this.state.datashow),
        );
      });
  }
  getdataselect = async () => {
    fetch('https://misappmobile.000webhostapp.com/trangquantri/shownhomnd.php')
      .then((response) => response.json())
      .then((dataselect) => {
        this.setState({
          dataselect: dataselect,
        }, () => console.log('kiemtradulieu', this.state.dataselect),

        );
      });
  };
  getdataupdate() {
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
        idNhom: this.state.idNhom,
      }),
    };
    fetch('https://misappmobile.000webhostapp.com/trangquantri/admin/nguoidung/update.php', config2)
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

          this.props.enqueueSnackbar('Đã có vấn đề xảy ra!', {
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
    if (!this.state.phone) {
      this.props.enqueueSnackbar('Không được bỏ trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else
    if (!this.state.idnhom) {
      this.props.enqueueSnackbar('Không được bỏ trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else
    if (!this.state.email) {
      this.props.enqueueSnackbar('Không được bỏ trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else
    if (!this.state.password) {
      this.props.enqueueSnackbar('Không được bỏ trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else {
      this.props.enqueueSnackbar('Thành công!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'success',
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
                          {this.state.idnhomError}
                        </div>
                        <Input
                          type="select"
                          name="idnhom"

                          value={this.state.idnhom}
                          onChange={(val) => {
                            this.setState({
                              idnhom: val.target.value
                            })
                          }}
                        >{this.state.dataselect.map((Item, index) => {
                          return (
                            <option>{Item.idNhom}</option>
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