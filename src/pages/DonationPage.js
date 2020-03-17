import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';

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
} from 'reactstrap';
import { getColor } from 'utils/colors';
import NGND from 'assets/img/NGND.jpg';
import TMC from 'assets/img/TMC.png';
import Media from 'reactstrap/es/Media';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';


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
      fakeData: [
        {
          title: "Người già neo đơn",
          money: "2.000.000",
          numberPeople: "50 người",
          time: "30 giờ",
          img: NGND,
          percent: 75
        },
        {
          title: "Trẻ mồ côi",
          money: "3.000.000",
          numberPeople: "35 người",
          time: "50 giờ",
          img: TMC,
          percent: 45
        },
      ]
    };
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
        {this.state.fakeData.map((item, index) => (
          <div>
            <Row>
              <Col lg="8" md="12" sm="12" xs="12">
                <Card>
                  <CardHeader className="d-flex justify-content-between">
                    {item.title}{' '}
                    <small className="text-muted text-capitalize mt-1">
                      <Link to={'/donation-detail'}>
                        Xem chi tiết
                      </Link>
                    </small>
                  </CardHeader>
                  <CardBody>
                    {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                    <Media
                      object
                      src={item.img}
                      className="rounded mr-2 mb-2"
                      style={{ width: '100%', height: '100%' }}
                    />
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
                      <NumberFormat value={4000000000} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'}/>
                    </div>
                  </CardBody>
                  <ListGroup flush>
                    <ListGroupItem>
                      <MdInsertChart size={25} color="primary"/> Làm phiếu khảo sát&nbsp;&nbsp;
                      {/*<a href={""}>(Link)</a>*/}
                      <Link to={'/cards'}>(Link)</Link>
                    </ListGroupItem>
                    <ListGroupItem>
                      <MdBubbleChart size={25} color="primary"/>Theo dõi sự kiện
                    </ListGroupItem>
                    <ListGroupItem>
                      <MdShowChart size={25} color="primary"/>Tham gia hoạt động{' '}
                    </ListGroupItem>
                    <ListGroupItem>
                      {/* <MdPieChart size={25} color="primary" /> Other operating
                costs <Badge color="secondary">$2400</Badge> */}
                      <Row>
                        <Col lg={12} md={6} sm={6} xs={12}>
                          <NumberWidget
                            title="Số tiền quyên góp"
                            //subtitle="This month"
                            color="secondary"
                            progress={{
                              value: item.percent,
                              //label: 'Last month',
                            }}
                            number={item.money}
                          />
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <CardGroup style={{ marginBottom: '1rem' }}>
              <Card body>
                {/*<CardTitle className="text-center">Quyên góp</CardTitle>*/}
                <Button
                  className="mt-2"
                  onClick={() => this.handleOpenModalParent()}
                >
                  Quyên góp
                </Button>
              </Card>
              <IconWidget
                icon={MdFace}
                bgColor="white"
                inverse={false}
                title="Số người theo dõi"
                subtitle={item.numberPeople}
              />
              <IconWidget
                icon={MdAlarm}
                bgColor="white"
                inverse={false}
                title="Số ngày còn lại:"
                subtitle={item.time}
              />
            </CardGroup>
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
              <div style={{ color: '#ae1f17' }}>2.000.000</div>
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
                color="primary"
                onClick={() => this.handleCloseModalParent()}>
                Nạp tiền
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Page>
    );
  }
};

export default DonationPage;
