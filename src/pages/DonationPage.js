import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import WebFont from 'webfontloader';

import React from 'react';
import {
  MdBubbleChart,
  MdInsertChart,
  MdAlarm,
  MdShowChart,
  MdFace,
} from 'react-icons/md';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col, Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Label,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import NGND from 'assets/img/NGND.jpg';
import TMC from 'assets/img/TMC.png';
import Media from 'reactstrap/es/Media';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';
import { TextField } from '@material-ui/core';
import { log } from 'd3-geo/src/math';


WebFont.load({
  google: {
    families: ['Open Sans: 400, 700', 'sans-serif'],
  },
});

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class DonationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalParent: false,
      modal: false,
      listData: [],
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
      idNguoiDung: "",
      SoDuTK: "",
      idHoatDong: "",
      money: "",
      phone: "",
      dataway4: [],
    };
  }

  componentDidMount() {
    this.getUser()
    this.getDonation()
  }

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
            idNguoiDung: data.idNguoiDung,
            phone: data.SDT
          }, () => this.getProfileW4())
        })
    }
  }

  getProfileW4 = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        ClientNumber: this.state.phone
      })
    }
    fetch(`http://apis.bav.edu.vn/smallgiving/apiway4/laythongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.Available
        })
      })
  }

  getDonation() {
    fetch(`http://apis.bav.edu.vn/smallgiving/Hoatdong/hoatdong.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listData: data
        }, () => console.log("data>>>", data))
      })
  }

  handleDoanation() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong,
        idNguoiDung: this.state.idNguoiDung,
        SoTien: this.state.money
      })
    }
    if (this.state.money - 1000 < 0) {
      this.props.enqueueSnackbar('Vui lòng nhập số tiền lớn hơn 1000VNĐ!', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else if (this.state.SoDuTK - this.state.money < 0) {
      this.props.enqueueSnackbar('Số dư trong tài khoản không đủ! Vui lòng nạp thêm tiền', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
    } else {
      fetch(`http://apis.bav.edu.vn/smallgiving/Quyengop/thuchienquyengop.php`, config)
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "success") {
            this.setState({
              dataway4: data
            }, () => this.naptienWay4())
            // this.props.enqueueSnackbar('Số tiền đã được thêm vào quỹ từ thiện cho hoạt động này !', {
            //   anchorOrigin: {
            //     vertical: "top",
            //     horizontal: "right"
            //   },
            //   variant: 'success',
            // });
            // this.handleDoanationW4();
            //this.handleCloseModal();
            //this.handleCloseModalParent();
            //window.location.reload();
          } else if (data.message === "fail") {
            this.props.enqueueSnackbar('Đã có lỗi xảy ra, giao dịch không được thực hiện !', {
              anchorOrigin: {
                vertical: "top",
                horizontal: "right"
              },
              variant: 'error',
            });
          } else if (data.message === "Hoat dong khong ton tai") {
            this.props.enqueueSnackbar('Hoạt động không tồn tại vui lòng thử hoạt động khác !', {
              anchorOrigin: {
                vertical: "top",
                horizontal: "right"
              },
              variant: 'error',
            });
          } else if (data.message === "Khong ton tai") {
            this.props.enqueueSnackbar('Tài khoản không tồn tại vui lòng đăng nhập!', {
              anchorOrigin: {
                vertical: "top",
                horizontal: "right"
              },
              variant: 'error',
            });
          } else if (data.message === "Khong duoc de mot trong cac truong trong\n") {
            this.props.enqueueSnackbar('Không được để trông ô nhập tiền!', {
              anchorOrigin: {
                vertical: "top",
                horizontal: "right"
              },
              variant: 'error',
            });
          }
        })
    }

  }
  naptienWay4() {
    let config2 = {
      method: "POST",
      body: JSON.stringify({
        NumberNguoiGui: this.state.phone,
        NumberNguoiNhan: this.state.idHoatDong,
        SoTien: this.state.money
      }),
    };
    fetch('http://apis.bav.edu.vn/smallgiving/apiway4/chuyentien.php', config2)
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

  // handleDoanationW4 = () => {
  //   let config = {
  //     method: "POST",
  //     body: JSON.stringify({
  //       NumberNguoiNhan: this.state.idHoatDong,
  //       NumberNguoiGui: this.state.idNguoiDung,
  //       SoTien: this.state.money
  //     })
  //   }
  //   fetch(`http://apis.bav.edu.vn/smallgiving/apiway4/chuyentien.php`, config)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  // }


  handleOpenModalParent(idHoatDong, SoDuTK, ChiDK) {
    if (SoDuTK * 1 - ChiDK >= 0) {
      this.props.enqueueSnackbar('Số tiền quyên góp đã đủ, vui lòng chuyển sang hoạt động khác !', {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        variant: 'error',
      });
      //window.location(reload)

    }
    else {
      this.setState({
        idHoatDong: idHoatDong,
        modalParent: true,
      });
    }
  }

  handleCloseModalParent() {
    this.setState({
      modalParent: false,
    });
  }

  handleOpenModal() {
    this.setState({
      modal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      modal: false,
    });
  }

  onFollow = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong,
        idNhaHaoTam: this.state.idNguoiDung
      })
    }
    fetch(`http://apis.bav.edu.vn/smallgiving/Theodoi/theodoi.php`, config)
      .then(res => res.json())
      .then(data => {
        if (data.message === "follow") {
          this.props.enqueueSnackbar('Các thông tin liên quan đến hoạt động này sẽ được gửi tới bạn !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });

        } else if (data.message === "unfollow") {
          this.props.enqueueSnackbar('Bạn đã bỏ theo dõi hoạt động !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });

        } else {
          this.props.enqueueSnackbar(data.message, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      })
  }


  handleJoinActivity = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong,
        idNhaHaoTam: this.state.idNguoiDung
      })
    }
    fetch(`http://apis.bav.edu.vn/smallgiving/Gopsuc/dangkigopsuc.php`, config)
      .then(res => res.json())
      .then(data => {
        if (data.message === "join") {
          this.props.enqueueSnackbar('Đăng ký thành công, chúng tôi sẽ liên lạc với bạn sớm nhất có thể !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
        } else if (data.message === "unjoin") {
          this.props.enqueueSnackbar('Hẹn gặp bạn trong các chương trình sắp tới !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        } else {
          this.props.enqueueSnackbar(data.message, {
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

    return (
      <Page
        className="bcquyengop"
        title="Quyên góp"
        breadcrumbs={[
          { name: 'Quyên góp', link: '/donation' },


        ]}>
        <Row>
          <Col lg="1"></Col>
          <Col lg="10" md="12" sm="12" xs="12" className="fix-new-1" >
            {this.state.listData.map((item, index) => (

              <Col lg="12" md="12" sm="12" xs="12" className="fix-inline">
                <Card className="donate-layout">
                  <CardHeader className="d-flex justify-content-between donate-header">
                    <b className="text-truncate">{item.TenHoatDong}{' '}</b>
                    <small className="text-muted text-capitalize mt-1">
                      <Link to={{
                        pathname: '/donation-detail',
                        search: `?idHoatDong=${item.idHoatDong}`,
                        state: {
                          idHoatDong: item.idHoatDong
                        }
                      }}>
                        Chi tiết
                      </Link>
                    </small>
                  </CardHeader>
                  <CardBody className="donate-body" style={{ textAlign: 'center' }}>
                    {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                    <figure className="fix-img">
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
                    <NumberWidget
                      className="mt-1"
                      //title="Số tiền quyên góp"
                      //subtitle="10.000.000"
                      className="donate-progress-1"
                      color="secondary"
                      thousandSeparator={true}
                      displayType={'text'}
                      separator=","
                      progress={{
                        //label: item.ChiDK,
                        value: Math.round(item.SoDuTK / item.ChiDK * 10000) / 100,

                      }}

                    />
                    <Row>
                      <Col lg="6" md="6" sm="6" xs="6" className="lable-pg">
                        <NumberFormat value={item.ChiDK} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />

                      </Col>

                      <Col lg="6" md="6" sm="6" xs="6">
                        <div className="percent-pg"> {Math.round(item.SoDuTK / item.ChiDK * 10000) / 100}%

</div>
                      </Col>
                    </Row>

                    <Button
                      disabled={this.state.token === "" ? true : false}
                      onClick={() => this.handleOpenModalParent(item.idHoatDong, item.SoDuTK, item.ChiDK)}
                    >
                      Quyên góp
                    </Button>
                    <ListGroupItem className="fix-donate">
                      <Row>
                        <Col md={6} sm="6" xs="6">
                          {item.SoNguoi} Lượt quyên góp

                          {/* <IconWidget
                            icon={MdFace}
                            bgColor="white"
                            inverse={false}
                            title="Lượt quyên góp: &nbsp;"
                            subtitle={item.SoNguoi}
                          /> */}
                        </Col>
                        <Col md={6} sm="6" xs="6">
                          {item.ThoiGian} Ngày còn lại
                          {/* <IconWidget
                            className="mt-1"
                            icon={MdAlarm}
                            bgColor="white"
                            inverse={false}
                            title="Ngày còn lại: &nbsp;"
                            subtitle={item.ThoiGian}
                          /> */}
                        </Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col md={6} sm="6" xs="6" className="fix-bo">
                          {/*<Label check>*/}
                          {/*  <MdBubbleChart size={25} style={{ color: '#ae1f17' }} />Theo dõi sự kiện*/}
                          {/*    <Input type="checkbox" className={'ml-3'} onChange={(data)=>console.log("test", data)} checked={true}/>*/}
                          {/*</Label>*/}
                          <Button onClick={() => this.setState({
                            idHoatDong: item.idHoatDong
                          }, () => this.onFollow())}>
                            Theo dõi
                              </Button>
                        </Col>
                        <Col md={6} sm="6" xs="6" className="fix-bo">
                          {/*<Label check>*/}
                          {/*  <MdShowChart size={25} style={{ color: '#ae1f17' }} />Tham gia hoạt động*/}
                          {/*    <Input type="checkbox" className={'ml-3'} />*/}
                          {/*</Label>*/}
                          <Button onClick={() => this.setState({
                            idHoatDong: item.idHoatDong
                          }, () => this.handleJoinActivity())}>Góp sức</Button>
                        </Col>
                      </Row>

                    </ListGroupItem>
                  </CardBody>
                </Card>

              </Col>
            ))}
            {/*<Col lg="4" md="12" sm="12" xs="12">*/}
            {/*  <Card>*/}
            {/*    /!* <CardHeader className="text-center">Quyên góp</CardHeader> *!/*/}
            {/*    <CardBody>*/}
            {/*      /!* <Bar data={chartjs.bar.data} options={chartjs.bar.options} /> *!/*/}
            {/*      <div style={{ fontSize: 24, textAlign: 'center', color: '#8e8e8e' }}>*/}
            {/*        Số dư tài khoản*/}
            {/*        <br />*/}
            {/*        {this.state.token === ""*/}
            {/*          ? <div style={{ fontSize: 20, color: "#ae1f17" }}>*/}
            {/*            Vui lòng đăng nhập vào hệ thống để cùng nhau chia sẻ những yêu thương*/}
            {/*          </div>*/}
            {/*          : <NumberFormat value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />*/}
            {/*        }*/}

            {/*      </div>*/}
            {/*    </CardBody>*/}
            {/*    {this.state.token === ""*/}
            {/*      ? <div></div>*/}
            {/*      : <ListGroup flush>*/}
            {/*        <ListGroupItem>*/}
            {/*          <MdInsertChart size={25} style={{ color: '#ae1f17' }} /> Làm phiếu khảo sát&nbsp;&nbsp;*/}
            {/*          /!*<a href={""}>(Link)</a>*!/*/}
            {/*          <Link to={'/consider'}>(Link)</Link>*/}
            {/*        </ListGroupItem>*/}
            {/*        <ListGroupItem>*/}
            {/*          <Label check>*/}
            {/*            <MdBubbleChart size={25} style={{ color: '#ae1f17' }} />Theo dõi sự kiện*/}
            {/*            <Input type="checkbox" className={'ml-3'} />*/}
            {/*          </Label>*/}
            {/*        </ListGroupItem>*/}
            {/*        <ListGroupItem>*/}
            {/*          <Label check>*/}
            {/*            <MdShowChart size={25} style={{ color: '#ae1f17' }} />Tham gia hoạt động*/}
            {/*            <Input type="checkbox" className={'ml-3'} />*/}
            {/*          </Label>*/}
            {/*        </ListGroupItem>*/}
            {/*        <ListGroupItem>*/}
            {/*        </ListGroupItem>*/}
            {/*      </ListGroup>*/}
            {/*    }*/}
            {/*  </Card>*/}
            {/*</Col>*/}




            {/*  ------------------------*/}

            <Col md="12" sm="12" xs="12">
              <Modal
                isOpen={this.state.modalParent}
                toggle={() => this.handleCloseModalParent()}
                className={this.props.className}>
                <ModalHeader toggle={() => this.handleCloseModalParent()}>
                  Quyên góp tiền
            </ModalHeader>
                <ModalBody className="d-flex flex-column align-items-center">
                  <Media
                    object
                    src='img/Slide/money.png'
                    className="rounded mr-2 mb-2 "
                    style={{ width: '10%', height: '10%' }}
                  />
                  <div>Số tiền hiện tại bạn có là:</div>
                  <div style={{ color: '#ae1f17' }}><NumberFormat value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} /></div>
                  <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    type="number"
                    onChange={(val) => {
                      this.setState({
                        money: val.target.value
                      })
                    }}
                  />
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.handleCloseModal}>
                    <ModalHeader>Xác nhận quyên góp</ModalHeader>
                    <ModalBody>Bạn xác nhận quyên góp chứ?</ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={() => {
                        this.handleDoanation()
                      }}>
                        Xác nhận
                  </Button>{' '}
                      <Button
                        color="primary"
                        onClick={() => this.handleCloseModal()}>
                        Không
                  </Button>
                    </ModalFooter>
                  </Modal>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    onClick={() => this.handleOpenModal()}>
                    Quyên góp
              </Button>{' '}
                  <Button
                    outline
                    color="primary"
                    onClick={() => this.handleCloseModalParent()}>
                    <Link to={"/guides"}>
                      Nạp tiền
                </Link>

                  </Button>
                </ModalFooter>
              </Modal>
            </Col>
          </Col>
          <Col lg="1"></Col>

        </Row>
      </Page>
    );
  }
};

export default withSnackbar(DonationPage);
