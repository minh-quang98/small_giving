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
      idHoatDong: ""
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
      fetch(`https://misappmobile.000webhostapp.com/checktoken.php`, config)
        .then((response) => response.json())
        .then((data)=> {
          this.setState({
            idNguoiDung: data.idNguoiDung
          }, () => this.getProfile())
        })
    }
  }

  getProfile = () => {
    let config = {
      method: "GET"
    }
    fetch(`http://misappmobile.000webhostapp.com/ThongtinForWeb/thongtin.php?idNguoiDung=` + this.state.idNguoiDung, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.SoDuTK
        }, () => console.log("stk>>", data))
      })
  }

  getDonation () {
    fetch(`https://misappmobile.000webhostapp.com/Hoatdong/hoatdong.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          listData: data
        })
      })
  }


  handleOpenModalParent() {
    this.setState({
      modalParent: true,
    });
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

  render() {
    return (
      <Page title="Quyên góp">
        {this.state.listData.map((item, index) => (
          <div>
            <Row className="mt-3">
              <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                  <CardHeader className="d-flex justify-content-between">
                    <b>{item.TenHoatDong}{' '}</b>
                    <small className="text-muted text-capitalize mt-1">
                      <Link to={{
                        pathname: '/donation-detail',
                        search: `?idHoatDong=${item.idHoatDong}`,
                        state: {
                          idHoatDong: item.idHoatDong
                        }
                      }}>
                        Xem chi tiết
                      </Link>
                    </small>
                  </CardHeader>
                  <CardBody>
                    {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                    <Media
                      object
                      src={item.Anh}
                      className="rounded mr-2 mb-2"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <Button
                      disabled={this.state.token === "" ? true : false}
                      className="mt-2"
                      onClick={() => this.handleOpenModalParent()}
                    >
                      Quyên góp
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                  <IconWidget
                    icon={MdFace}
                    bgColor="white"
                    inverse={false}
                    title="Số người theo dõi"
                    subtitle={item.SoNguoi}
                  />
                  <IconWidget
                    className="mt-1"
                    icon={MdAlarm}
                    bgColor="white"
                    inverse={false}
                    title="Số ngày còn lại:"
                    subtitle={item.ThoiGian}
                  />
                  <NumberWidget
                    className="mt-1"
                    title="Số tiền quyên góp"
                    //subtitle="10.000.000"
                    color="secondary"
                    progress={{
                      value: item.SoDuTK / item.ChiDK * 100,
                      //label: 'Last month',
                    }}
                    number={item.ChiDK}
                  />
                </Card>
              </Col>
              <Col lg="4" md="12" sm="12" xs="12">
                <Card>
                  {/* <CardHeader className="text-center">Quyên góp</CardHeader> */}
                  <CardBody>
                    {/* <Bar data={chartjs.bar.data} options={chartjs.bar.options} /> */}
                    <div style={{ fontSize: 24, textAlign: 'center', color: '#8e8e8e'}}>
                      Số dư tài khoản
                      <br/>
                      {this.state.token === ""
                        ? <div style={{fontSize: 20, color: "#ae1f17"}}>
                          Vui lòng đăng nhập vào hệ thống để cùng nhau chia sẻ những yêu thương
                        </div>
                        : <NumberFormat value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'}/>
                      }

                    </div>
                  </CardBody>
                  {this.state.token === ""
                    ? <div></div>
                    : <ListGroup flush>
                      <ListGroupItem>
                        <MdInsertChart size={25} style={{ color: '#ae1f17' }}/> Làm phiếu khảo sát&nbsp;&nbsp;
                        {/*<a href={""}>(Link)</a>*/}
                        <Link to={'/consider'}>(Link)</Link>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Label check>
                          <MdBubbleChart size={25} style={{ color: '#ae1f17' }}/>Theo dõi sự kiện
                          <Input type="checkbox" className={'ml-3'}/>
                        </Label>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Label check>
                          <MdShowChart size={25} style={{ color: '#ae1f17' }}/>Tham gia hoạt động
                          <Input type="checkbox" className={'ml-3'}/>
                        </Label>
                      </ListGroupItem>
                      <ListGroupItem>
                      </ListGroupItem>
                    </ListGroup>
                  }
                </Card>
              </Col>
            </Row>

          </div>
        ))}


        {/*  ------------------------*/}

        <Col md="12" sm="12" xs="12">
          <Modal
            isOpen={this.state.modalParent}
            toggle={() => this.handleCloseModalParent()}
            className={this.props.className}>
            <ModalHeader toggle={() => this.handleCloseModalParent()}>
              Người già neo đơn
            </ModalHeader>
            <ModalBody className="d-flex flex-column align-items-center">
              <Media
                object
                src='img/Slide/money.png'
                className="rounded mr-2 mb-2 "
                style={{ width: '10%', height: '10%' }}
              />
              <div>Số tiền hiện tại bạn có là:</div>
              <div style={{ color: '#ae1f17' }}><NumberFormat value={this.state.SoDuTK !== null ? this.state.SoDuTK : 0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'}/></div>
              <Input className="w-50" type="text" placeholder="Nhập số tiền"/>
              <Modal
                isOpen={this.state.modal}
                toggle={this.handleCloseModal}>
                <ModalHeader>Xác nhận quyên góp</ModalHeader>
                <ModalBody>Bạn xác nhận quyên góp chứ?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => {
                    this.handleCloseModal();
                    this.handleCloseModalParent();
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
                Quên góp
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
      </Page>
    );
  }
};

export default DonationPage;
