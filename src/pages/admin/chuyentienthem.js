import React from 'react';
import {
  Button,
  Form,
  Label,
  Input,
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
//import styled from 'styled-components';
import { withSnackbar } from 'notistack';
const initialState = {
  id: '',
  fromaccount: '',
  toaccount: '',
  money: '',
  fromaccountError: '',
  toaccountError: '',
  moneyError: '',

};
class Chuyentienthem extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getdatashow();
    //this.getdataupdate();

  }
  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idGiaoDich: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/thuchienkhaosat/select.php', config)
      .then(response => response.json())
      .then(datashow => {
        this.setState(
          {
            id: datashow.idGiaoDich,
            fromaccount: datashow.idKhaoSat,
            toaccount: datashow.idNhaHaoTam,
            money: datashow.SoTien,
          },
          () => console.log('kiemtradulieu>>', this.state.datashow),
        );
      });
  }
  chuyentienWay4() {
    let config2 = {
      method: "POST",
      body: JSON.stringify({
        NumberNguoiGui: this.state.fromaccount,
        NumberNguoiNhan: this.state.toaccount,
        SoTien: this.state.money
      }),
    };
    fetch('https://misappmobile.000webhostapp.com/apiway4/chuyentien.php', config2)
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
    let fromaccountError = '';
    let toaccountError = '';
    let moneyError = '';

    if (!this.state.fromaccount) {
      fromaccountError = 'Bạn cần chọn một tài khoản!';
    }
    if (!this.state.toaccount) {
      toaccountError = 'Bạn cần chọn một tài khoản!';
    }
    if (!this.state.money) {
      moneyError = 'Bạn cần nhập một số tiền!';
    }
    if (fromaccountError || toaccountError || moneyError) {
      this.setState({ fromaccountError, toaccountError, moneyError });
      //notifydefeat('this is a notify');
      return false;
    }
    //notifysuccess('this is a notify');
    return true;
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
          Thêm mới người dùng
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xl={12} lg={12} md={12}>
                <Card>
                  <CardBody className="pd-rancach">
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Label for="exampleEmail"> Mã giao dịch </Label>
                        </Col>
                        <Col md={8}>
                          <Input
                            disabled="true"

                            type="email"
                            name="id"
                            value={this.state.id}
                            onChange={this.handleChange}
                          />
                        </Col>
                      </Row>
                    </Form>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Label for="exampleSelect">
                            Tài khoản nguồn <span className="red-text">*</span>
                          </Label>
                        </Col>
                        <Col md={8}>
                          <div className="error-text">
                            {this.state.fromaccountError}
                          </div>
                          <Input
                            disabled="true"
                            type="email"
                            name="fromaccount"
                            value={this.state.fromaccount}
                            onChange={val => {
                              this.setState({
                                fromaccount: val.target.value,
                              });
                            }}
                          >

                          </Input>
                        </Col>
                      </Row>
                    </Form>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Label for="exampleSelect">
                            Tài khoản đích <span className="red-text">*</span>
                          </Label>
                        </Col>
                        <Col md={8}>
                          <div className="error-text">
                            {this.state.toaccountError}
                          </div>
                          <Input
                            disabled="true"
                            type="email"
                            name="toaccount"
                            value={this.state.toaccount}
                            onChange={val => {
                              this.setState({
                                toaccount: val.target.value,
                              });
                            }}
                          >

                          </Input>
                        </Col>
                      </Row>
                    </Form>

                    <Form>
                      <Row>
                        <Col md={4}>
                          <Label for="exampleNumber">
                            Số tiền <span className="red-text">*</span>
                          </Label>
                        </Col>
                        <Col md={8}>
                          <div className="error-text">
                            {this.state.moneyError}
                          </div>
                          <Input
                            disabled="true"
                            type="number"
                            name="money"
                            disabled="true"
                            value={this.state.money}
                            onChange={val => {
                              this.setState({
                                money: val.target.value,
                              });
                            }}
                          />
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="center-text-submit">
              <Container>
                <Button color="danger" type="submit" pill
                  className="px-4 my-3"
                  onClick={() =>
                    this.chuyentienWay4()
                  }
                >
                  Chấp nhận
                </Button>

              </Container>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default withSnackbar(Chuyentienthem);
