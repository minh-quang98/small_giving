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
import NotificationSuccess, {
  notifysuccess,
} from '../../components/admin/Notification/notificationSuccess';
import NotificationDefeat, {
  notifydefeat,
} from '../../components/admin/Notification/notificationDefeat';

const initialState = {
  id: '',
  fromaccount: '',
  toaccount: '',
  money: '',

  fromaccountError: '',
  toaccountError: '',
  moneyError: '',
  dataselect: [],
};
class Chuyentienthem extends React.Component {
  state = initialState;
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
      notifydefeat('this is a notify');
      return false;
    }
    notifysuccess('this is a notify');
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
  componentDidMount() {
    this.getdataselect();
  }

  getdataselect = async () => {
    fetch('https://misappmobile.000webhostapp.com/trangquantri/showkhaosat.php')
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
                            type="select"
                            name="fromaccount"
                            value={this.state.fromaccount}
                            onChange={val => {
                              this.setState({
                                fromaccount: val.target.value,
                              });
                            }}
                          >
                            {this.state.dataselect.map(Item => {
                              return <option>{Item.TenKhaoSat}</option>;
                            })}
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
                            type="select"
                            name="toaccount"
                            value={this.state.toaccount}
                            onChange={this.handleChange}
                          >
                            {this.state.dataselect.map(Item => {
                              return <option>{Item.TenNguoiDung}</option>;
                            })}
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
                            type="number"
                            name="money"
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
                <Button color="danger" type="submit" pill className="px-4 my-3">
                  Chuyển
                </Button>
                <NotificationSuccess />
                <NotificationDefeat />
              </Container>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
export default Chuyentienthem;
