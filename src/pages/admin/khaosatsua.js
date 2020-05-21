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
import { withSnackbar } from 'notistack';


const initialState = {
  id: '',
  name: '',
  startdate: '',
  enddate: '',
  url: '',
  patron: '',
  eachturn: '',
  total: '',

  nameError: '',
  urlError: '',
  eachturnError: '',
  totalError: '',
  dataselect: [],
};

class Khaosatsua extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getdatashow();
    //this.getdataupdate();

  }
  componentDidMount() {
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
  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idKhaoSat: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/taokhaosat/select.php', config)
      .then(response => response.json())
      .then(datashow => {
        this.setState(
          {
            id: datashow.idKhaoSat,
            name: datashow.TenKhaoSat,
            url: datashow.Link,
            patron: datashow.TenNguoiDung,
            startdate: datashow.ThoiGianBD,
            enddate: datashow.ThoiGianKT,
            eachturn: datashow.SoTienML

          },
          () => console.log('kiemtradulieu>>', this.state.datashow),
        );
      });
  }
  getdataupdate() {
    const isValid = this.validate();
    if (isValid) {
      let config2 = {
        method: "POST",
        body: JSON.stringify({
          idKhaoSat: this.state.id,
          TenKhaoSat: this.state.name,
          Link: this.state.url,
          TenNguoiDung: this.state.patron,
          ThoiGianBD: this.state.startdate,
          ThoiGianKT: this.state.enddate,
          SoTienML: this.state.eachturn,

        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/taokhaosat/update.php', config2)
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



          }
        });
      this.setState(initialState);
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
    if (!this.state.eachturn) {
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
    //const isValid = this.validate();
    //if (isValid) {
    console.log(this.state);
    //clear form
    //this.setState(initialState);
    //}
  };

  render() {
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Sửa thông tin khảo sát
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
                          disabled="true"
                          type="text"
                          name="id"
                          value={this.props.chooseId}
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
                        >{this.state.dataselect.map(Item => {
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
                <Button color="danger" type="submit"
                  pill className="px-4 my-3"
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
export default withSnackbar(Khaosatsua);
