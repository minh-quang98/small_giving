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
import DTN from "assets/img/ĐTN.PNG"
import { withSnackbar } from 'notistack';
import GUBN from '../assets/img/guide-banner.png';
import Media from 'reactstrap/es/Media';


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
          <Col lg="1" md="12" sm="12" xs="12" >
          </Col>
          <Col lg="10" md="12" sm="12" xs="12" >
            <Row>
              <Col lg="8" md="12" sm="12" xs="12" className="ml-0 pl-0">
                <Card style={{ border: 0 }}>
                  <div>
                    <UncontrolledCarousel items={fakeData} />
                  </div>
                </Card>
              </Col>
              <Col lg="4" md="12" sm="12" xs="12">
                <Row style={{textAlign: "center",}}>
                  <Card style={{ border: 0, width: "100%" }}>
                    <CardBody>
                      <div style={{ fontSize: 24,  color: '#8e8e8e' }}>
                        Số dư tài khoản
                        <br />
                        {this.state.token === ""
                          ? <div style={{ fontSize: 20, color: "#ae1f17", }}>
                            Vui lòng đăng nhập vào hệ thống để cùng nhau chia sẻ những yêu thương
                          </div>
                          : <NumberFormat value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />
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
                </Row>
                <Row className="mt-1">
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
                        <ListGroupItem className="text-center">
                          <MdInsertChart size={25} /> Làm phiếu khảo sát&nbsp;&nbsp;
                          {/*<a href={""}>(Link)</a>*/}
                          <Link to={"/consider"}>(Link)</Link>
                        </ListGroupItem>
                        <ListGroupItem className="text-center">
                          <Button onClick={() => this.handleCheckIn()}>Điểm danh</Button>
                          <div className="mt-1">Tự thêm gì gì đó vào đây</div>
                        </ListGroupItem>
                      </ListGroup>
                    }
                  </Card>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col lg="7" md="7" sm="12" xs="12" className="pl-0 ml-0">
                <Row>
                {/*  <Col lg="7" md="7" sm="12" xs="12"></Col>*/}
                {/*  <Col lg="7" md="7" sm="12" xs="12"></Col>*/}
                <Card style={{ border: 0 }}>
                  <CardHeader className="text-center" style={{ border: 0 }}>Đoàn thanh niên</CardHeader>
                  <CardBody>
                    <Media
                      object
                      src={DTN}
                      className="rounded mr-2"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </CardBody>
                  <CardBody className="pt-0">
                    <p className="text-muted">PHIẾU KHẢO SÁT BỆNH COVID-19 ĐỐI VỚI SINH VIÊN HỌC VIỆN NGÂN HÀNG LẦN 2
                      Nhằm phục vụ công tác phòng chống dịch COVID-19 và đảm bảo an toàn cho sinh viên Học viện Ngân hàng trở lại học tập trung tại Học viện.
                      Ban chỉ đạo phòng chống dịch bệnh viêm đường hô hấp cấp Học viện Ngân hàng thông báo tới toàn thể sinh viên  điền phiếu khảo sát điều tra bệnh COVID-19 theo mẫu dưới đâ</p>

                  </CardBody>
                </Card>

                </Row>

              </Col>
              <Col lg="5" md="5" sm="12" xs="12">
                <Card style={{ border: 0 }}>
                  <CardHeader className="text-center" style={{ border: 0 }}>Bảng xếp hạng</CardHeader>
                  <CardBody>
                    {this.state.messageErr === ""
                      ? <Table responsive hover>
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
            <Row>
              <Col lg="12" md="12" sm="12" xs="12" >
                <Card style={{ border: 0 }}>
                  <CardHeader className="text-center" style={{ border: 0 }}>Về chúng tôi</CardHeader>
                  <CardBody>
                    {productsData.map(
                      ({ id, image, title, description, }) => (
                        <ProductMedia
                          key={id}
                          image={image}
                          title={title}
                          description={description}
                          // right={right}
                        />
                      ),
                    )}
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
