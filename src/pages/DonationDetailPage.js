import React, { Component } from 'react';
import Page from 'components/Page';
import {
  Card,
  CardBody,
  CardHeader,
  Col, Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody, ModalFooter,
  ModalHeader,
  Row, Button, Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Media from 'reactstrap/es/Media';
import NumberFormat from "react-number-format";
import {
  MdBubbleChart,
  MdInsertChart,
  MdAlarm,
  MdShowChart,
} from 'react-icons/md';
import { IconWidget, NumberWidget } from 'components/Widget';
import NGND from 'assets/img/NGND.jpg';
import Convert from "../utils/ConvertUrlPra"
import Cookies from 'js-cookie';


class DonationDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      modalParent: false,
      modal: false,
      idHoatDong: "",
      dataHoatDong: [],
      SoDiTK: "",
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
      idNguoiDung:""
    }
  }

  componentWillMount() {
    let params = Convert.urlParams(this.props.location.search);
    this.setState({idHoatDong: params.idHoatDong})
  }

  componentDidMount() {
    this.getInfo();
    this.getUser();
  }

  getInfo () {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/Hoatdong/webtinhoatdong.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataHoatDong: data
        })
      })
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
      <Page title="Người gia neo đơn">
        {this.state.dataHoatDong.map((item, index) => {
          return (
            <Row>
              <Col lg="8" md="12" sm="12" xs="12">

                <Card>
                  <CardBody>
                    {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                    <Media
                      object
                      src={item.Anh}
                      className="rounded mr-2 mb-2"
                      style={{ width: '100%', height: '100%' }}
                    />

                    <div className="mt-4">
                      {item.NoiDung}
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="4" md="12" sm="12" xs="12" className="align-items-center">

                <Card>
                  <CardHeader className="text-center">Quyên góp</CardHeader>
                  <CardBody>
                    {/* <Bar data={chartjs.bar.data} options={chartjs.bar.options} /> */}
                    <div style={{ fontSize: 20, textAlign: 'center' }}>
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
                    :<ListGroup flush>
                      <ListGroupItem>
                        <MdInsertChart size={25} style={{color: "#ae1f17"}}/> Làm phiếu khảo sát&nbsp;&nbsp;
                        {/*<a href={""}>(Link)</a>*/}
                        <Link to={'/consider'}>(Link)</Link>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Label check>
                          <MdBubbleChart size={25} style={{color: "#ae1f17"}}/>Theo dõi sự kiện
                          <Input type="checkbox" className={"ml-3"}/>
                        </Label>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Label check >
                          <MdShowChart size={25} style={{color: "#ae1f17"}}/>Tham gia hoạt động
                          <Input type="checkbox" className={"ml-3"}/>
                        </Label>
                      </ListGroupItem>
                      <ListGroupItem>
                        <Row>
                          <Col lg={12} md={6} sm={6} xs={12}>
                            <div style={{ fontSize: 20, textAlign: 'center' }}>
                              Số tiền quyên góp dự kiến
                              <br/>
                              <NumberFormat value={item.ChiDK} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'}/>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12} md={6} sm={6} xs={12} className="text-center">
                            <Button
                              className="mt-2"
                              onClick={() => this.handleOpenModalParent()}
                              color="secondary"
                            >
                              Quyên góp
                            </Button>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  }

                </Card>
              </Col>
            </Row>
          )
        })}


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
              <div style={{ color: '#ae1f17' }}>{this.state.SoDuTK !== null ? this.state.SoDuTK : 0}</div>
              <Input className="w-50" type="text" placeholder="Nhập số tiền"/>
              <Modal
                isOpen={this.state.modal}
                toggle={this.handleCloseModal}>
                <ModalHeader>Xác nhận quyên góp</ModalHeader>
                <ModalBody>Bạn xác nhận quyên góp chứ?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => {
                    this.handleCloseModal()
                    this.handleCloseModalParent()
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
}

export default DonationDetailPage;
