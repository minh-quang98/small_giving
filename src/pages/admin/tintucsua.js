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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';

const initialState = {
  id: '',
  name: '',
  idhoatdong: '',
  image: '',
  content: '',
  title: '',
  receiver: '',
  loading: false,
  idhoatdongError: '',
  nameError: '',
  contentError: '',
  tenhd: '',
  loaitin: '',
  dataselect: [],
  dataselect1: [],
};

class Tintucsua extends React.Component {
  state = initialState;
  componentWillReceiveProps = () => {
    console.log("check>>>", this.props.chooseId);
    this.getdatashow();
    //this.getdataupdate();

  }
  componentDidMount() {

    this.gethd();
    this.getloaitin();

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
  getloaitin = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/showloaitin.php')
      .then(response => response.json())
      .then(dataselect => {
        this.setState(
          {
            dataselect1: dataselect,
          },
          () => console.log('kiemtradulieu', this.state.dataselect),
        );
      });
  };

  getdatashow() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idTin: this.props.chooseId,
      }),
    };
    fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/tintuc/select.php', config)
      .then(response => response.json())
      .then(datashow => {
        this.setState(
          {
            id: datashow.idTin,
            name: datashow.TenTin,
            content: datashow.NoiDung,
            image: datashow.Anh,
            tenhd: datashow.TenHoatDong,
            loaitin: datashow.TenLoaiTin,


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
          idTin: this.state.id,
          TenTin: this.state.name,
          NoiDung: this.state.content,
          Anh: this.state.image,
          TenHoatDong: this.state.tenhd,
          TenLoaiTin: this.state.loaitin,

        }),
      };
      fetch('http://smallgiving.cf/mobileapp/trangquantri/admin/tintuc/update.php', config2)
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
      //this.setState(initialState);
    }
  }
  uploadImage = async e => {
    //this.setState({ files: e.target.files[0] });
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'darwin')
    this.setState({ loading: true }
    )
    this.setState({ image: '' }
    )
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/hocviennganhang/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    console.log('ckeck>>', file.url)
    this.setState({ image: file.secure_url }
    )
    this.setState({ loading: false }
    )
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

    if (!this.state.content) {
      contentError = 'Bạn cần nhập nội dung';
    }

    if (nameError || contentError) {
      this.setState({ nameError, contentError });
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
          Sửa tin tức
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
                        <Label for="exampleText"> Tên hoạt động</Label>
                        <Input

                          type="select"
                          name="tenhd"
                          value={this.state.tenhd}
                          onChange={val => {
                            this.setState({
                              tenhd: val.target.value,
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
                              nameError: ""
                            });
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleText"> Loại tin tức</Label>
                        <Input

                          type="select"
                          name="loaitin"
                          value={this.state.loaitin}
                          onChange={val => {
                            this.setState({
                              loaitin: val.target.value,
                            });

                          }}
                        ><option></option>
                          {this.state.dataselect1.map(Item => {
                            return <option>{Item.TenLoaiTin}</option>;
                          })}
                        </Input>
                      </FormGroup>


                    </Form>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <Label for="exampleImage"> Hình ảnh / Video</Label>
                      <Input
                        type="file"
                        name="image"
                        //value={this.state.image}
                        onChange={this.uploadImage}
                      />
                      {this.state.loading ? (
                        <h3>Loading...</h3>
                      ) : (
                          <img src={this.state.image} style={{ width: '300px' }}></img>
                        )

                      }
                    </FormGroup>
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
                            contentError: ""
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
export default withSnackbar(Tintucsua);
