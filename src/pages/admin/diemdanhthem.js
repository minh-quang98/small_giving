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
  patron: '',
  eachturn: '',

  token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
  user: [],
  nameError: '',
  eachturnError: '',
  dataselect: [],
};

class Diemdanhthem extends React.Component {
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
        idCTV: this.state.user.idNguoiDung,
        TenDiemDanh: this.state.name,
        TenNguoiDung: this.state.patron,
        ThoiGianBD: this.state.startdate,
        ThoiGianKT: this.state.enddate,
        SoTienML: this.state.eachturn,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/diemdanh/insert.php', config)
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
          //notifydefeat('this is a notify');
        }
      });
    //this.setState(initialState);
    //}
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
    let moneyError = '';

    if (!this.state.money) {
      this.props.enqueueSnackbar('Không được bỏ trống !', {
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
          Thêm mới tài khoản điểm danh
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <CardBody>
                <Row>


                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText">Mã điểm danh</Label>
                        <Input
                          disabled="true"
                          type="text"
                          name="id"
                          value={this.state.id}
                          onChange={this.handleChange}
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
                        >
                          <option></option>{this.state.dataselect.map(Item => {
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
                          Tên điểm danh <span className="red-text">*</span>
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
                          Số tiền cho mỗi lượt điểm danh{' '}
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
                </Row>
              </CardBody>
            </Card>
            <div className="center-text-submit">
              <Container>
                <Button color="danger" type="submit"
                  pill className="px-4 my-3"
                  onClick={() => this.getdatainsert()}
                >
                  Lưu
                </Button>
              </Container>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Diemdanhthem);
