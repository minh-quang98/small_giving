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
};

class Diemdanhsua extends React.Component {
  state = initialState;
  componentDidMount = () => {
    console.log('check>>>', this.props.chooseId);
  };
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
          Sửa thông tin tài khoản điểm danh
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xl={12} lg={12} md={12}>
                <Card>
                  <CardBody className="pd-rancach">
                    <Form>
                      <FormGroup>
                        <Row>
                          <Col md={4}>
                            <Label for="exampleText"> Mã tài khoản</Label>
                          </Col>
                          <Col md={8}>
                            <Input
                              disabled="true"
                              type="text"
                              name="id"
                              value={this.props.chooseId}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col md={4}>
                            <Label for="exampleText">
                              Tên tài khoản<span className="red-text">*</span>
                            </Label>
                          </Col>
                          <Col md={8}>
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
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <Col md={4}>
                            <Label for="exampleText">
                              Số tiền cho mỗi lượt
                              <span className="red-text">*</span>
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
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <div className="center-text-submit">
              <Container>
                <Button color="danger" type="submit" pill className="px-4 my-3">
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
