import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import UserProgressTable from 'components/UserProgressTable';
import {
  productsData,
} from '../demo/dashboardPage';
import React from 'react';
import {
  MdInsertChart,
} from 'react-icons/md';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row, Table, UncontrolledCarousel,
} from 'reactstrap';
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import DTN from "assets/img/DTN.jpg"
import { withSnackbar } from 'notistack';
import thongtin from '../assets/img/thongtin.png';
import Media from 'reactstrap/es/Media';
import Animate from 'animate.css-react'
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import 'animate.css/animate.css'

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: [
        {
          src: 'img/Slide/banner.png',
          key: '1'
        },
        {
          src: 'img/Slide/banner2.png',
          key: '2'
        },
        {
          src: 'img/Slide/banner3.png',
          key: '3'
        }
      ],
      headers: [
        {
          name: "Huy hiệu",
        },
        {
          name: "Tên người dùng"
        },
        {
          name: "Số tiền"
        }
      ],
      data: [],
      messageErr: "",
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
      idNguoiDung: "",
      SoDuTK: "",
      checkIn: false,
      phone: ""
    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getRankInfo()
    this.getUser()
  }

  getRankInfo = async () => {
    fetch('http://smallgiving.cf/mobileapp/Bangxephang/bangxephang.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== "No post found") {
          this.setState({
            data: data
          })
        } else {
          this.setState({
            messageErr: data.message
          })
        }

      });
  }


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
            idNguoiDung: data.idNguoiDung,
            phone: data.SDT
          }, () => this.getProfile())
        })
    }
  }

  getProfile = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNguoiDung: this.state.idNguoiDung
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Thongtin/thongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.SoDuTK
        }, () => this.getProfileW4())
      })
  }

  getProfileW4 = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ClientNumber: this.state.phone
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/apiway4/laythongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.Available
        })
      })
  }

  handleCheckIn = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNhaHaoTam: this.state.idNguoiDung
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Diemdanh/diemdanh.php`, config)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          this.props.enqueueSnackbar('Điểm danh thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
        } else if (data.message === "Ban da diem danh roi") {
          this.props.enqueueSnackbar('Bạn đã điểm danh rồi', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      })
  }

  render() {
    let { fakeData } = this.state
    return (
      <Page
        className="DashboardPage"
        title="Trang chủ"
      // breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          {/* <Col lg="1" md="12" sm="12" xs="12" >
          </Col> */}
          <Col lg="12" md="12" sm="12" xs="12" >
            <Row>
              <Col lg="12" md="12" sm="12" xs="12" className="ml-0 pl-0">
                <Card style={{ border: 0 }}>
                  <div>
                    <UncontrolledCarousel className="fix-banner" items={fakeData} />
                  </div>
                </Card>
              </Col>
              <Col lg="12" md="12" sm="12" xs="12">
                <Row>
                  <Col lg="6" md="6" sm="12" xs="12" className="fix-button">

                    <Card style={{ border: 0, width: "100%" }}>
                      {/*<CardBody >*/}
                      {/*  <div style={{ fontSize: 24, textAlign: "center", color: '#8e8e8e' }}>*/}
                      {/*    Số dư tài khoản*/}
                      {/*    <br />*/}
                      {/*    {this.state.token === ""*/}
                      {/*      ? <div style={{ fontSize: 20, color: "#ae1f17", }}>*/}
                      {/*        Vui lòng đăng nhập vào hệ thống để cùng nhau chia sẻ những yêu thương*/}
                      {/*      </div>*/}
                      {/*      : <NumberFormat value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />*/}
                      {/*    }*/}
                      {/*  </div>*/}
                      {/*</CardBody>*/}
                      {this.state.token === ""
                        ? <div></div>
                        : <ListGroup flush>
                          {<ListGroupItem className="text-center fix-khaosat">
                            <MdInsertChart size={25} /> Làm phiếu khảo sát&nbsp;&nbsp;
      {/*<a href={""}>(Link)</a>*/}
                            <Link to={"/consider"}>(Link)</Link>
                          </ListGroupItem>}
                          <ListGroupItem className="text-center">
                            <Button onClick={() => this.handleCheckIn()}>Điểm danh</Button>
                            {/*<div className="mt-1">Tự thêm gì gì đó vào đây</div>*/}
                          </ListGroupItem>
                        </ListGroup>
                      }
                    </Card>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12" className="fix-button-2">
                    <Card style={{ border: 0, width: "100%" }}>
                      <CardBody>
                        <div style={{ fontSize: 18, color: '#8e8e8e' }}>
                          Số dư tài khoản: {" "}

                          {this.state.token === ""
                            ? <div style={{ fontSize: 13, color: "#ae1f17", }}>
                              Vui lòng đăng nhập vào hệ thống
                          </div>
                            : <NumberFormat style={{ fontSize: 17, color: "#ae1f17", }} value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />
                          }
                        </div>
                      </CardBody>
                      {/*{this.state.token === ""*/}
                      {/*  ? <div></div>*/}
                      {/*  : <ListGroup flush>*/}
                      {/*    <ListGroupItem >*/}
                      {/*      <MdInsertChart size={25} /> Làm phiếu khảo sát&nbsp;&nbsp;*/}
                      {/*      /!*<a href={""}>(Link)</a>*!/*/}
                      {/*      <Link to={"/consider"}>(Link)</Link>*/}
                      {/*    </ListGroupItem>*/}
                      {/*    <ListGroupItem className="text-center">*/}
                      {/*      <Button onClick={() => this.handleCheckIn()}>Điểm danh</Button>*/}
                      {/*    </ListGroupItem>*/}
                      {/*  </ListGroup>*/}
                      {/*}*/}
                    </Card>
                  </Col>

                </Row>
                <div className="double-border"></div>
                <Row style={{ textAlign: "center", }}>

                </Row>
                <Row className="mt-1">

                </Row>
              </Col>
            </Row>
            <div className="fix-header">
              <div className="card-header-1">Về chúng tôi</div>

            </div>
            <Row className="about-slide">
              <Col lg="4" md="4" sm="12" xs="12" >


                <div className="text-bold animate__animated animate__fadeInLeft">Triển khai các hoạt động thiện nguyện bằng hình thức trực tuyến</div>
                <p className="animate__animated animate__fadeInLeft">
                  Cung cấp đầy đủ thông tin mang tính xác thực cao về các hoàn cảnh cần giúp đỡ, nhà hảo tâm có thế tìm hiểu và nạp tiền trực tuyến hoạc kiếm tiền bằng việc làm khảo sát từ nhà tài trợ
                </p>



              </Col>
              <Col lg="4" md="4" sm="12" xs="12" >
                <div className="animate__animated animate__zoomIn">
                  <img src={thongtin} className="fix-img-1"></img>
                </div>

              </Col>
              <Col lg="4" md="4" sm="12" xs="12" >
                <div className="text-bold animate__animated animate__fadeInRight">Kênh thông tin chính thống của Đoàn Thanh niên & Hội Sinh viên</div>
                <p className="animate__animated animate__fadeInRight">Bằng cách phân chia nhỏ số tiền của mình, người dùng chỉ cần sử dụng thiết bị di động hoạc máy tính là có thế quyên góp cho nhiều hoàn cảnh khó khăn và điều đặc biệt nhất là bạn .</p>
              </Col>
            </Row>

            <Row>
              <Col lg="7" md="7" sm="12" xs="12" className="pl-0 ml-0">
                <div className="fix-header">
                  <div className="card-header-1">Đoàn Thanh niên & Hội Sinh viên</div>

                </div>
                <Row>
                  {/*  <Col lg="7" md="7" sm="12" xs="12"></Col>*/}
                  {/*  <Col lg="7" md="7" sm="12" xs="12"></Col>*/}
                  <Card style={{ border: 0 }}>

                    <CardBody>
                      <div className="dtn">
                        <li md={4}>
                          <Media
                            object
                            src={DTN}
                            className="rounded mr-2"
                            style={{ width: '100px', height: '100%' }}
                          />
                        </li>
                        <li md={8}>
                          <p className="text-muted">- Đoàn kết, khuyến khích, giúp đỡ hội viên, sinh viên trong học tập và rèn luyện, hoàn thành nhiệm cụ của người sinh viên, góp phần xây dựng nhà trường vững mạnh.</p>
                          <p className="text-muted">- Giáo dục lý tưởng, truyền thống đạo đức, lối sống và ý thức pháp luật cho hội viên, sinh viên.</p>
                          <p className="text-muted">- Phản ánh nhu cầu, nguyện vọng của sinh viên; tham gia đề xuất các chủ trương chính sách liên quan đến sinh viên. Tổ chức các hoạt động thiết thực chăm lo đời sống vật chất,
tinh thần và bảo vệ các quyền lợi hợp pháp, chính đáng của hội viên, sinh viên và tổ chức Hội. </p>

                        </li>

                      </div>


                    </CardBody>
                    <CardBody className="pt-0">


                    </CardBody>
                  </Card>

                </Row>

              </Col>
              <Col lg="5" md="5" sm="12" xs="12">
                <div className="fix-header">
                  <div className="card-header-1">Bảng xếp hạng</div>

                </div>
                <Card style={{ border: 0 }}

                >

                  <CardBody>
                    {this.state.messageErr === ""
                      ? <Table responsive hover scrollY
                        maxHeight="200px">
                        <thead>
                          <tr className="text-capitalize align-middle text-center">
                            <th>STT</th>
                            <th>Tên Người Dùng</th>
                            <th>Số Tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.data.map((item, index) => (
                            <tr key={index}>
                              <td className="align-middle text-center">
                                {index + 1}
                              </td>
                              <td className="align-middle text-center">{item.TenNguoiDung}</td>
                              <td className="align-middle text-center">{item.SoTien}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      : <div className="text-center">Không có dữ liệu</div>
                    }

                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Col>
          <Col lg="1" md="12" sm="12" xs="12" ></Col>
        </Row>
      </Page>
    );
  }
}
export default withSnackbar(MainPage);
