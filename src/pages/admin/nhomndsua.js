import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
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
  nameError: '',
};

class Nhomndsua extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    //console.log("check>>>", this.props.chooseId);
    this.getdatashow();
    //this.getdataupdate();
  }
  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNhom: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/nhomnguoidung/select.php', config)
      .then(response => response.json())
      .then(datashow => {
        this.setState(
          {
            id: datashow.idNhom,
            name: datashow.TenNhom,
          },
          () => console.log('kiemtradulieu>>', datashow),
        );
      });
  }
  getdataupdate() {
    const isValid = this.validate();
    if (isValid) {
      let config2 = {
        method: "POST",
        body: JSON.stringify({
          idNhom: this.state.id,
          TenNhom: this.state.name,
        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/nhomnguoidung/update.php', config2)
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

    if (!this.state.name) {
      nameError = 'Bạn cần nhập một tên';
    }
    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    event.preventDefault();

  };
  render() {
    let { info } = this.state
    return (
      <Modal isOpen={this.props.show}>
        <ModalHeader className="text-danger" toggle={this.props.onHide}>
          Sửa thông tin nhóm người dùng
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <Row>

              <Col md={12}>
                <Card>
                  <CardBody>
                    <Form>
                      <Label for="exampleEmail"> Mã nhóm</Label>
                      <Input
                        disabled="true"
                        type="email"
                        name="id"
                        value={this.state.id}

                      />
                    </Form>
                    <Form>
                      <Label for="exampleText">Tên nhóm <span className="red-text">*</span> </Label>
                      <div className="error-text">
                        {this.state.nameError}
                      </div>
                      <Input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(val) => {
                          this.setState({
                            name: val.target.value
                          })
                        }}
                      />

                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
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
export default withSnackbar(Nhomndsua);
