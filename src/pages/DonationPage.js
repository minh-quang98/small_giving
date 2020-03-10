import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
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
      modal: true
    });
  }

  handleCloseModal() {
    this.setState({
      modal: false
    });
  }

  render() {
    return (
      <Page title="Quyên góp">
        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Người già neo đơn{' '}
                <small className="text-muted text-capitalize">
                  <Link to={''}>
                    Xem chi tiết
                  </Link>
                </small>
              </CardHeader>
              <CardBody>
                {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                <Media
                  object
                  src={NGND}
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
                          value: 75,
                          //label: 'Last month',
                        }}
                        number="20.000.000 VNĐ"
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
              onClick={()=>this.handleOpenModalParent()}
            >
              Quyên góp
            </Button>
          </Card>
          <IconWidget
            className="text-center"
            bgColor="white"
            inverse={false}
            title="Số người theo dõi"
            subtitle="50 người"
          />
          <IconWidget
            className="text-center"
            bgColor="white"
            inverse={false}
            title="Số ngày còn lại"
            subtitle="30 ngày"
          />
        </CardGroup>

        {/*  ------------------------*/}

        <Col md="12" sm="12" xs="12">
          <Modal
            isOpen={this.state.modalParent}
            toggle={()=>this.handleCloseModalParent()}
            className={this.props.className}>
            <ModalHeader toggle={()=>this.handleCloseModalParent()}>
              Người già neo đơn
            </ModalHeader>
            <ModalBody className="text-center">
              <Media
                object
                src='img/Slide/money.png'
                className="rounded mr-2 mb-2 "
                style={{ width: '10%', height: '10%' }}
              />
              <div>Số tiền hiện tại bạn có là:</div>
              <div style={{color: "#ae1f17"}}>2.000.000</div>
              <Modal
                isOpen={this.state.modal}
                toggle={this.handleCloseModal}>
                <ModalHeader>Xác nhận quyên góp</ModalHeader>
                <ModalBody>Bạn xác nhận quyên góp chứ?</ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={()=>this.handleCloseModal()}>
                    Xác nhận
                  </Button>{' '}
                  <Button
                    color="primary"
                    onClick={()=>this.handleCloseModal()}>
                    Không
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={()=>this.handleOpenModal()}>
                Quên góp
              </Button>{' '}
              <Button
                color="primary"
                onClick={()=>this.handleCloseModalParent()}>
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
