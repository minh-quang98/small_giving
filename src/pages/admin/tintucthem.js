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

const initialState = {
  id: '',
  name: '',
  idhoatdong: '',
  image: '',
  content: '',
  title: '',
  receiver: '',

  idhoatdongError: '',
  nameError: '',
  contentError: '',
};

class Tintucthem extends React.Component {
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

    if (!this.state.name) {
      this.props.enqueueSnackbar('Không được để trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'success',
      });
    }
    if (!this.state.idhoatdong) {
      this.props.enqueueSnackbar('Không được để trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'success',
      });
    }
    if (!this.state.content) {
      this.props.enqueueSnackbar('Không được để trống!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'success',
      });
    }

    this.props.enqueueSnackbar('Thành công!', {
      anchorOrigin: {
        vertical: "top",
        horizontal: "right"
      },
      variant: 'success',
    });
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
          Thêm mới tin tức
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Card>
              <CardBody>
                <Row>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleText"> Mã tin tức</Label>
                        <Input
                          disabled="true"
                          type="text"
                          name="id"
                          value={this.state.id}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText">
                          Tên tin <span className="red-text">*</span>
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
                        <Label for="exampleSelect">
                          Thuộc hoạt động <span className="red-text">*</span>
                        </Label>
                        <div className="error-text">
                          {this.state.idhoatdongError}
                        </div>
                        <Input
                          type="select"
                          name="idhoatdong"
                          value={this.state.idhoatdong}
                          onChange={val => {
                            this.setState({
                              idhoatdong: val.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xl={6} lg={12} md={12}>
                    <Form>
                      <FormGroup>
                        <Label for="exampleImage"> Hình ảnh / Video</Label>
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
                      <FormGroup>
                        <Label for="exampleText"> Tiêu đề thông báo</Label>
                        <Input
                          type="text"
                          name="title"
                          value={this.state.title}
                          onChange={val => {
                            this.setState({
                              title: val.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">
                          Đối tượng nhận thông báo
                        </Label>
                        <Input
                          type="select"
                          name="receiver"
                          value={this.state.receiver}
                          onChange={val => {
                            this.setState({
                              receiver: val.target.value,
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
                <Button color="danger" type="submit" pill className="px-4 my-3">
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
export default withSnackbar(Tintucthem);
