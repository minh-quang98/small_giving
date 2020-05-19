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
import Media from 'reactstrap/es/Media';
import Vang from '../assets/img/logo/HHV.png';
import Bac from '../assets/img/logo/HHB.png';
import Dong from '../assets/img/logo/HHD.png';


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
      SoDuTK: ""
    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getRankInfo()
    this.getUser()
  }

  getRankInfo = async () => {
    fetch('http://smallgiving.cf/mobileapp/Bangxephang/bãngephang.php')
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

  HuyHieu(item) {
    switch (item) {
      case "0":
        return 'img/logo/HHV.png';
      case "1":
        return 'img/logo/HHB.png';
      case "2":
        return 'img/logo/HHD.png';
    }
  }

  getUser = () => {
    if (this.state.token !== "") {
      let config = {
        method: "POST",
        body: JSON.stringify({
          token: this.state.token
        })
      }
      fetch(`https://misappmobile.000webhostapp.com/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idNguoiDung: data.idNguoiDung
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
    fetch(`https://misappmobile.000webhostapp.com/ThongtinForWeb/thongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.SoDuTK
        }, () => console.log("stk>>", data))
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
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <div>
                <UncontrolledCarousel items={fakeData} />
              </div>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <div style={{ fontSize: 24, textAlign: "center", color: '#8e8e8e' }}>
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
              {this.state.token === ""
                ? <div></div>
                : <ListGroup flush>
                  <ListGroupItem>
                    <MdInsertChart size={25} /> Làm phiếu khảo sát&nbsp;&nbsp;
                    {/*<a href={""}>(Link)</a>*/}
                    <Link to={"/consider"}>(Link)</Link>
                  </ListGroupItem>
                  <ListGroupItem className="text-center">
                    <Button>Điểm danh</Button>
                  </ListGroupItem>
                </ListGroup>
              }
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Về chúng tôi</CardHeader>
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

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Bảng xếp hạng</CardHeader>
              <CardBody>
                {this.state.messageErr === ""
                  ? <Table responsive hover>
                    <thead>
                      <tr className="text-capitalize align-middle text-center">
                        <th>Huy Hiệu</th>
                        <th>Tên Người Dùng</th>
                        <th>Số Tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.data.map((item, index) => (
                        <tr key={index}>
                          <td className="align-middle text-center">
                            {index > 2
                              ? index + 1
                              : <Media
                                object
                                src={this.HuyHieu(index)}
                                className="rounded mr-2 mb-2"
                                style={{ width: 50, height: 50 }}
                              />
                            }

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
      </Page>
    );
  }
}
export default MainPage;
