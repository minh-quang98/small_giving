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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
//import CKEditor from 'ckeditor4-react';
import parse from 'html-react-parser'

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
  dataselect1: [],
  selectedFile: null,
  //files: [],
  loading: false,
  a: '',



};

class Tintucthem extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    //this.handleChange = this.handleChange.bind( this );
    this.onEditorChange = this.onEditorChange.bind(this);
  }



  componentDidMount() {
    this.getUser()
    //this.getdatainsert();
    this.gethd();
    this.getloaitin();
  }
  gethd = async () => {
    fetch('http://apis.bav.edu.vn/smallgiving/trangquantri/showhoatdong.php')
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
    fetch('http://apis.bav.edu.vn/smallgiving/trangquantri/showloaitin.php')
      .then(response => response.json())
      .then(dataselect => {
        this.setState(
          {
            dataselect1: dataselect,
          },
          () => console.log('kiemtradulieu', this.state.dataselect1),
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
      fetch(`http://apis.bav.edu.vn/smallgiving/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            user: data
          })
        })
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
    this.setState({ a: '' }
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
    this.setState({ a: file.secure_url }
    )
    this.setState({ loading: false }
    )
  }

  getdatainsert() {
    const isValid = this.validate();
    if (isValid) {
      let config = {
        method: "POST",
        body: JSON.stringify({
          idCTV: this.state.user.idNguoiDung,
          TenTin: this.state.name,
          TenLoaiTin: this.state.receiver,
          TenHoatDong: this.state.idhoatdong,
          NoiDung: parse(this.state.content),
          Anh: this.state.a,
          TieuDeThongBao: this.state.title,
        }),
      };
      fetch('http://apis.bav.edu.vn/smallgiving/trangquantri/admin/tintuc/insert.php', config)
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
  // onFileChange = event => {

  //   // Update the state 
  //   this.setState({ selectedFile: event.target.files[0] });
  //   const target = event.target;
  //   const { name, value } = target;
  //   this.setState({
  //     image: value
  //   });
  // };
  // handleCkeditorState = (event, editor) => {
  //   const data = editor.getData();
  //   this.setState({
  //     content: data,
  //     contentError: ""
  //   })
  // }
  onEditorChange(evt, editor) {
    this.setState({
      content: editor.getData()
    });
  }

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
                              nameError: ""
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
                        ><option>Chọn một hoạt động</option>
                          {this.state.dataselect.map(Item => {
                            return <option>{Item.TenHoatDong}</option>;
                          })}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">
                          Loại tin tức
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
                        ><option>Chọn một loại tin</option>
                          {this.state.dataselect1.map(Item => {
                            return <option>{Item.TenLoaiTin}</option>;
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
                          name="file"
                          onChange={this.uploadImage}

                        />
                        {this.state.loading ? (
                          <h3>Loading...</h3>
                        ) : (
                            <img src={this.state.a} style={{ width: '300px' }}></img>
                          )

                        }
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
                      <CKEditor
                        //id="content"
                        editor={ClassicEditor}
                        //onInit={editor => { }}
                        //value={parse(this.state.content)}
                        data={this.state.content}
                        onChange={this.onEditorChange}
                      // config={{
                      //   language: 'fr',
                      //   htmlEncodeOutput: true,
                      //   entities: false,
                      //   entities_latin: false,
                      //   ForceSimpleAmpersand: true,
                      //   toolbar: 'Bold',
                      //   fullPage: true,


                      // }

                      //}



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
                //onClick={() => this.uploadFile()}

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
