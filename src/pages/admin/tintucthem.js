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
  idhoatdong: '',
  image: '',
  content: '',
  title: '',
  receiver: '',
  token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
  user: [],

  idhoatdongError: '',
  nameError: '',
  contentError: '',
  dataselect: [],
};

class Tintucthem extends React.Component {
  state = initialState;
  componentDidMount() {
    this.getUser()
    //this.getdatainsert();
    this.gethd();
  }
  gethd = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/showhoatdong.php')
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
          TenTin: this.state.name,
          TenHoatDong: this.state.idhoatdong,
          NoiDung: this.state.content,
          Anh: this.state.image,
          TieuDeThongBao: this.state.title,
        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/tintuc/insert.php', config)
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
            this.props.enqueueSnackbar('Đã có lỗi xảy ra!', {
              anchorOrigin: {
                vertical: "top",
                horizontal: "right"
              },
              variant: 'error',
            });
            this.setState(initialState);
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
    let nameError = '';
    let idhoatdongError = '';
    let contentError = '';
    if (!this.state.name) {
      nameError = 'Bạn cần nhập một tên';
    }
    if (!this.state.idhoatdong) {
      idhoatdongError = 'Bạn cần chọn một hoạt động';
    }
    if (!this.state.content) {
      contentError = 'Bạn cần nhập nội dung';
    }

    if (nameError || idhoatdongError || contentError) {
      this.setState({ nameError, idhoatdongError, contentError });
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
                          Thuộc hoạt động
                        </Label>

                        <Input
                          type="select"
                          name="idhoatdong"
                          value={this.state.idhoatdong}
                          onChange={val => {
                            this.setState({
                              idhoatdong: val.target.value,
                            });
                          }}
                        ><option></option>
                          {this.state.dataselect.map(Item => {
                            return <option>{Item.TenHoatDong}</option>;
                          })}
                        </Input>
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
                <Button color="danger" type="submit"
                  pill className="px-4 my-3"
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
export default withSnackbar(Tintucthem);
