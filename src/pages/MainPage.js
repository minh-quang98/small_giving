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
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import DTN from 'assets/img/DTN.jpg';
import { withSnackbar } from 'notistack';
import thongtin from '../assets/img/thongtin.png';
import Media from 'reactstrap/es/Media';
import Animate from 'animate.css-react';
//import { Link } from 'react-router-dom';
//import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import 'animate.css/animate.css';
import CountUp from 'react-countup';
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
          src: 'img/Slide/bn2.png',
          key: '1',
        },
        {
          src: 'img/Slide/bn1.png',
          key: '2',
        },
        {
          src: 'img/Slide/bn3.png',
          key: '3',
        },
        {
          src: 'img/Slide/bn4.png',
          key: '4',
        },

      ],
      headers: [
        {
          name: 'Huy hiệu',
        },
        {
          name: 'Tên người dùng',
        },
        {
          name: 'Số tiền',
        },
      ],
      data: [],
      messageErr: '',
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
      idNguoiDung: '',
      SoDuTK: '',
      checkInDB: "",
      checkInMoney: "",
      phone: '',
      listData: [],
      idHoatDong: "",
      idTinTuc: "",
      listTin: [],
      dataSumqg: [],
      dataCountnht: [],
      dataSumthieu: "",
      datasumact: [],
      counter: []
    };
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getRankInfo();
    this.getUser();
    this.gethd();
    this.gettin();
    this.getSum();
    this.getCount();
    this.getThieu();
    this.getsumact();

  }
  getsumact = async () => {
    fetch(
      'http://apis.bav.edu.vn/smallgiving/trangquantri/soluonghoatdong.php',
    )
      .then(response => response.json())
      .then(datasumact => {
        this.setState(
          {
            datasumact: datasumact,
          },
          () => console.log('kiemtradulieu', this.state.datasumact),
        );
      });
  };
  getSum = async () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/Baocao/tongquyengop.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataSumqg: data
        })
      })
  };
  getCount = async () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/Baocao/tongnguoiquyengop.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataCountnht: data
        })
      })
  };
  getThieu = async () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/Baocao/soduhoatdong.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataSumthieu: data.ConThieu
        })
      })
  };

  gethd = () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/trangquantri/showhdmoi.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listData: data
        })
      })
  }
  gettin = () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/trangquantri/showtinmoi.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listTin: data
        })
      })
  }

  getRankInfo = () => {
    fetch('http://apis.bav.edu.vn/smallgiving/Bangxephang/bangxephang.php')
      .then((response) => response.json())
      .then((data) => {
        if (data.message !== 'No post found') {
          this.setState({
            data: data,
          });
        } else {
          this.setState({
            messageErr: data.message,
          });
        }

      });
  };


  getUser = () => {
    if (this.state.token !== '') {
      let config = {
        method: 'POST',
        body: JSON.stringify({
          token: this.state.token,
        }),
      };
      fetch(`http://apis.bav.edu.vn/smallgiving/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idNguoiDung: data.idNguoiDung,
            phone: data.SDT,
          }, () => this.getProfileW4());
        });
    }
  };

  // getProfile = () => {
  //   let config = {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       idNguoiDung: this.state.idNguoiDung,
  //     }),
  //   };
  //   fetch(`http://apis.bav.edu.vn/smallgiving/Thongtin/thongtin.php`, config)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({
  //         // SoDuTK: data.SoDuTK,
  //       }, () => this.getProfileW4());
  //     });
  // };

  getProfileW4 = () => {
    let config = {
      method: 'POST',
      body: JSON.stringify({
        ClientNumber: this.state.phone,
      }),
    };
    fetch(`http://apis.bav.edu.vn/smallgiving/apiway4/laythongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.Available,
        });
      });
  };

  // getInfoCheckInDB = () => {
  //   fetch(`http://apis.bav.edu.vn/smallgiving/trangquantri/laythongtindd.php`)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         checkInDB: data.idDiemDanh,
  //         checkInMoney: data.SoTienML
  //       }, () => this.handleCheckIn())
  //     })
  // }

  handleCheckIn = () => {
    let config = {
      method: 'POST',
      body: JSON.stringify({
        ClientNumber: this.state.phone,
      }),
    };
    fetch(`http://apis.bav.edu.vn/smallgiving/apiway4/diemdanh.php`, config)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'success') {
          this.props.enqueueSnackbar('Phần thưởng đã được chuyển tới quỹ của bạn !', {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'success',
          });
          //window.location.reload()
        } else if (data.message === 'Ban da diem danh roi') {
          this.props.enqueueSnackbar('Bạn đã điểm danh rồi', {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'error',
          });
          // this.handleMoneyCheckIn()

        } else {
          this.props.enqueueSnackbar('Đã có lỗi xảy ra !', {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
            variant: 'error',
          });
        }
      });
  };

  // handleMoneyCheckIn = () => {
  //   let config = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       NumberNguoiGui: this.state.checkInDB,
  //       NumberNguoiNhan: this.state.phone,
  //       SoTien: this.state.checkInMoney
  //     })
  //   }
  //   fetch(`http://apis.bav.edu.vn/smallgiving/apiway4/chuyentien.php`, config)
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.message === 'success') {
  //         this.props.enqueueSnackbar('Phần thưởng đã được chuyển tới quỹ của bạn !', {
  //           anchorOrigin: {
  //             vertical: 'top',
  //             horizontal: 'right',
  //           },
  //           variant: 'success',
  //         });
  //         window.location.reload()
  //       } else {
  //         this.props.enqueueSnackbar('Đã có lỗi xảy ra !', {
  //           anchorOrigin: {
  //             vertical: 'top',
  //             horizontal: 'right',
  //           },
  //           variant: 'error',
  //         });
  //       }
  //     })
  // }

  render() {
    let { fakeData } = this.state;
    return (
      <Page
        className="DashboardPage"
        title="Trang chủ"
      // breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>

          <Col lg="12" md="12" sm="12" xs="12" >
            <Row>
              <Col lg="12" md="12" sm="12" xs="12" className="ml-0 pl-0">
                <Card style={{ border: 0 }}>
                  <div>
                    <UncontrolledCarousel className="fix-banner" items={fakeData} />
                  </div>
                </Card>
              </Col>
              <Col lg="12" md="12" sm="12" xs="12" className="mar-0">
                <Row>
                  <Col lg="6" md="6" sm="12" xs="12" className="fix-button">

                    <Card style={{ border: 0, width: '100%' }}>
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
                      {this.state.token === ''
                        ? <div></div>
                        : <ListGroup flush>
                          {<ListGroupItem className="text-center fix-khaosat">
                            <MdInsertChart size={25} /> Làm phiếu khảo sát&nbsp;&nbsp;
                            {/*<a href={""}>(Link)</a>*/}
                            <Link to={'/consider'}>(Link)</Link>
                          </ListGroupItem>}
                          <ListGroupItem className="text-center diemdanh">
                            <Button onClick={() => this.handleCheckIn()}>Điểm danh</Button>
                            {/*<div className="mt-1">Tự thêm gì gì đó vào đây</div>*/}
                          </ListGroupItem>
                        </ListGroup>
                      }
                    </Card>
                  </Col>
                  <Col lg="6" md="6" sm="12" xs="12" className="fix-button-2">
                    <Card style={{ border: 0, width: '100%' }}>
                      <CardBody className="sodu">
                        <div style={{ fontSize: 18, color: '#8e8e8e' }}>
                          Số dư tài khoản: {' '}

                          {this.state.token === ''
                            ? <span>...</span>
                            : <NumberFormat style={{ fontSize: 17, color: '#ae1f17' }}
                              value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0}
                              displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />
                          }
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                </Row>
                <div className="double-border"></div>
                <Row style={{ textAlign: 'center' }}>

                </Row>
                <Row className="mt-1">

                </Row>
              </Col>
            </Row>
            <div className="about-layout">

              <div className="fix-header">
                <div className="card-header-1">Về chúng tôi</div>
                <div>
                  <img style={{ maxHeight: "40px" }} src='img/logo/after.png'></img>
                </div>

              </div>
              <Row className="about-slide">
                <Col lg="3" md="3" sm="6" xs="6" className="hix-hix">
                  <div className="bg-gradient">
                    <span>
                      <img src="https://bizweb.dktcdn.net/100/387/180/themes/765139/assets/icon_why_1.png?1590391920314">
                      </img>
                    </span>
                    <div className="pd-fix-about">
                      <span className="text-about">
                        sáng tạo
                      </span>
                      <div className="subtitle-about">
                        Cung cấp tùy chọn đóng góp kinh phí quyên góp đa dạng và hấp dẫn.
                      </div>
                    </div>
                  </div>

                </Col>
                <Col lg="3" md="3" sm="6" xs="6" className="hix-hix">
                  <div className="bg-gradient">
                    <span>
                      <img src="https://bizweb.dktcdn.net/100/387/180/themes/765139/assets/icon_why_2.png?1590391920314">
                      </img>
                    </span>
                    <div className="pd-fix-about">
                      <span className="text-about">
                        thuận tiện
                      </span>
                      <div className="subtitle-about">
                        Thực hiện quyên góp thuận tiện: mọi lúc, mọi nơi, mọi thiết bị.
                      </div>
                    </div>
                  </div>

                </Col>
                <Col lg="3" md="3" sm="6" xs="6" className="hix-hix">
                  <div className="bg-gradient" >
                    <span>
                      <img src="https://bizweb.dktcdn.net/100/387/180/themes/765139/assets/icon_why_3.png?1590391920314">
                      </img>
                    </span>
                    <div className="pd-fix-about">
                      <span className="text-about">
                        Nhanh chóng
                      </span>
                      <div className="subtitle-about">
                        Thao tác quyên góp đơn giản, nhanh chóng, trong 1 nút chạm.
                      </div>
                    </div>
                  </div>

                </Col>
                <Col lg="3" md="3" sm="6" xs="6" className="hix-hix">
                  <div className="bg-gradient">
                    <span>
                      <img src="https://bizweb.dktcdn.net/100/387/180/themes/765139/assets/icon_why_4.png?1590391920314">
                      </img>
                    </span>
                    <div className="pd-fix-about">
                      <span className="text-about">
                        Minh bạch
                      </span>
                      <div className="subtitle-about">
                        Đầy đủ, xác thực trong nội dung và minh bạch trong tài chính.
                      </div>
                    </div>
                  </div>

                </Col>

              </Row>

            </div>
            <div className="quyengop-layout">

              <div className="fix-header">
                <div className="card-header-1">Hoạt động thiện nguyện gần đây</div>
                <div>
                  <img style={{ maxHeight: "40px" }} src='img/logo/after.png'></img>
                </div>

              </div>
              <Row className="quyengop-slide">
                <Col lg="12" md="12" sm="12" xs="12" className="qg-layout" >
                  {this.state.listData.map((item, index) => (
                    <Col lg="12" md="12" sm="12" xs="12" className="qg-1">
                      <div className="qg-02">
                        <div>
                          <figure className="qg-img">
                            <Link to={{
                              pathname: '/donation-detail',
                              search: `?idHoatDong=${item.idHoatDong}`,
                              state: {
                                idHoatDong: item.idHoatDong
                              }
                            }}>
                              <Media
                                object
                                src={item.Anh}
                                className="rounded mr-2 mb-2"
                                style={{ width: '100%', height: '100%' }}
                              />
                            </Link>
                          </figure>

                        </div>
                        <div className="title-qg">
                          <Link to={{
                            pathname: '/donation-detail',
                            search: `?idHoatDong=${item.idHoatDong}`,
                            state: {
                              idHoatDong: item.idHoatDong
                            }
                          }}>
                            {item.TenHoatDong}
                          </Link>

                        </div>
                      </div>


                    </Col>
                  ))}
                </Col>
              </Row>

            </div>
            <Row className="bxh">

              <Col lg="1" md="1" sm="12" xs="12"></Col>
              <Col lg="10" md="10" sm="12" xs="12">
                <div className="fix-header-1">
                  <div className="card-header-1">Thống kê</div>
                  <div>
                    <img style={{ maxHeight: "40px" }} src='img/logo/after.png'></img>
                  </div>
                </div>
                <Row>
                  <Col lg="3" md="6" sm="6" xs="6" className="">
                    <Link className="no-hover" to={{
                      pathname: '/donation',

                    }}>
                      <div className="bg-thongke">
                        {this.state.datasumact.map((Item, index) => {
                          return (

                            <CountUp
                              style={{ fontSize: 34, fontWeight: 'bold', color: '#ae1f17' }}
                              start={0}
                              end={Item.soluong}
                              duration={5}
                              separator=","
                              thousandSeparator={true}
                            //decimals={4}
                            //decimal=","
                            //prefix="EUR "
                            //suffix=" left"
                            //onEnd={() => console.log('Ended! 👏')}
                            //onStart={() => console.log('Started! 💨')}
                            />



                          );
                        })}
                        <br />(chương trình)
                      <div className="title-thongke">
                          Hoạt động thiện nguyện
            </div>

                      </div>
                    </Link>
                  </Col>
                  <Col lg="3" md="6" sm="6" xs="6" className="">
                    <Link className="no-hover" to={{
                      pathname: '/donation',

                    }}>
                      <div className="bg-thongke">
                        {this.state.dataSumqg.map((Item, index) => {
                          return (
                            <CountUp
                              style={{ fontSize: 34, fontWeight: 'bold', color: '#ae1f17' }}
                              start={100000}
                              end={Item.TongSoTienQuyenGop}
                              duration={5}
                              separator=","

                              thousandSeparator={true}
                            />

                          );
                        })}
                        <br />(vnd)
                      <div className="title-thongke">
                          Đã nhận quyên góp
              </div>


                      </div>
                    </Link>
                  </Col>
                  <Col lg="3" md="6" sm="6" xs="6" className="">
                    <Link className="no-hover" to={{
                      pathname: '/donation',

                    }}>
                      <div className="bg-thongke">
                        {this.state.dataCountnht.map((Item, index) => {
                          return (
                            <CountUp
                              style={{ fontSize: 34, fontWeight: 'bold', color: '#ae1f17' }}
                              start={0}
                              end={Item.SoLuongNguoiQuyenGop}
                              duration={5}
                              separator=","

                              thousandSeparator={true}
                            />


                          );
                        })}
                        <br />(lượt)
                      <div className="title-thongke">
                          Quyên góp
              </div>

                      </div>
                    </Link>
                  </Col>
                  <Col lg="3" md="6" sm="6" xs="6" className="">
                    <Link className="no-hover" to={{
                      pathname: '/donation',

                    }}>
                      <div className="bg-thongke">
                        <CountUp
                          style={{ fontSize: 34, fontWeight: 'bold', color: '#ae1f17' }}
                          start={1000000}
                          end={this.state.dataSumthieu}
                          duration={5}
                          separator=","
                          thousandSeparator={true}
                        />

                        <br />(vnd)
                      <div className="title-thongke">Quyên góp còn thiếu</div>

                      </div>
                    </Link>
                  </Col>


                </Row>
                {/* <Card className="bg-bxh">
                  <CardBody >
                    {this.state.messageErr === ''
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
                </Card> */}
              </Col>
              <Col lg="1" md="1" sm="12" xs="12"></Col>
            </Row>
            <div className="tintuc-layout">

              <div className="fix-header">
                <div className="card-header-1">Tin tức mới</div>
                <div>
                  <img style={{ maxHeight: "40px" }} src='img/logo/after.png'></img>
                </div>

              </div>
              <Row className="quyengop-slide">
                <Col lg="12" md="12" sm="12" xs="12" className="qg-layout" >
                  {this.state.listTin.map((item, index) => (
                    <Col lg="12" md="12" sm="12" xs="12" className="qg-1">
                      <div className="qg-03">
                        <div>
                          <figure className="qg-img">
                            <Link to={{
                              pathname: '/news-detail',
                              search: `?idTinTuc=${item.idTin}`,
                              state: {
                                idTinTuc: item.idTin
                              }
                            }}>
                              <Media
                                object
                                src={item.Anh}
                                className="rounded mr-2 mb-2"
                                style={{ width: '100%', height: '100%' }}
                              />
                            </Link>
                          </figure>

                        </div>
                        <div className="title-tt">
                          <Link to={{
                            pathname: '/news-detail',
                            search: `?idTinTuc=${item.idTin}`,
                            state: {
                              idTinTuc: item.idTin
                            }
                          }}>
                            {item.TenTin}
                          </Link>

                        </div>
                      </div>


                    </Col>
                  ))}
                </Col>
              </Row>

            </div>




          </Col>
          <Col lg="1" md="12" sm="12" xs="12"></Col>
        </Row>
      </Page>
    );
  }
}

export default withSnackbar(MainPage);
