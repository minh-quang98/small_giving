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
  money: '',
  moneyError: '',
  dataselect: [],
};

class Diemdanhsua extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getdatashow();
    //this.getdataupdate();

  }
  // componentDidMount() {
  //   this.getnhataitro();
  // }
  // getnhataitro = async () => {
  //   fetch('http://smallgiving.cf/mobileapp/trangquantri/shownhataitro.php')
  //     .then(response => response.json())
  //     .then(dataselect => {
  //       this.setState(
  //         {
  //           dataselect: dataselect,
  //         },
  //         () => console.log('kiemtradulieu', this.state.dataselect),
  //       );
  //     });
  // };
  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idDiemDanh: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/diemdanh/select.php', config)
      .then(response => response.json())
      .then(datashow => {
        this.setState(
          {
            id: datashow.idDiemDanh,
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
          idDiemDanh: this.state.id,
          SoTienML: this.state.eachturn,

        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/diemdanh/update.php', config2)
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
            this.props.enqueueSnackbar('Thất bại!', {
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
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };
  validate = () => {
    let eachturnError = '';
    if (!this.state.eachturn) {
      eachturnError = 'Bạn cần nhập một số tiền';
    }
    if (eachturnError) {
      this.setState({ eachturnError });
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
          Sửa thông tin tài khoản điểm danh
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
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
                  {/* <FormGroup>
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
                  </FormGroup> */}

                </Form>
              </Col>

              <Col xl={6} lg={12} md={12}>
                <Form>
                  {/* <FormGroup>
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
                  </FormGroup> */}
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
export default withSnackbar(Diemdanhsua);
