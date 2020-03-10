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
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import NGND from "assets/img/NGND.jpg";
import Media from 'reactstrap/es/Media';
import NumberFormat from "react-number-format";
import {Link} from "react-router-dom";

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const DonationPage = () => {
  return (
    <Page title="Quyên góp">
      <Row>
        <Col lg="8" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              Người già neo đơn{' '}
              <small className="text-muted text-capitalize">
                <Link to={""}>
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
          <Card >
            <CardHeader className="text-center">Quyên góp</CardHeader>
            <CardBody>
              {/* <Bar data={chartjs.bar.data} options={chartjs.bar.options} /> */}
              <div style={{fontSize: 20, textAlign: "center"}}>
                Số dư tài khoản
                <br/>
                <NumberFormat value={4000000000} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />
              </div>
            </CardBody>
            <ListGroup flush>
              <ListGroupItem>
                <MdInsertChart size={25} color="primary" /> Làm phiếu khảo sát&nbsp;&nbsp;
                {/*<a href={""}>(Link)</a>*/}
                <Link to={"/cards"}>(Link)</Link>
              </ListGroupItem>
              <ListGroupItem>
                <MdInsertChart size={25} color="primary" /> Nạp tiền {' '}
                {/* <Badge color="secondary">$3000</Badge> */}
              </ListGroupItem>
              <ListGroupItem>
                <MdBubbleChart size={25} color="primary" />Theo dõi sự kiện
              </ListGroupItem>
              <ListGroupItem>
                <MdShowChart size={25} color="primary" />Tham gia hoạt động{' '}
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
        <IconWidget
            className="text-center"
          bgColor="white"
          inverse={false}
          icon={MdThumbUp}
          title="Quyên góp"
          subtitle="Button quyên góp"
        />
        <IconWidget
            className="text-center"
          bgColor="white"
          inverse={false}
          icon={MdRateReview}
          title="Số người theo dõi"
          subtitle="50 người"
        />
        <IconWidget
            className="text-center"
          bgColor="white"
          inverse={false}
          icon={MdShare}
          title="Số ngày còn lại"
          subtitle="30 ngày"
        />
      </CardGroup>

    {/*  ------------------------*/}

      <Row className="mt-5">
        <Col lg="8" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              Người già neo đơn{' '}
              <small className="text-muted text-capitalize">
                <Link to={""}>
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
          <Card >
            <CardHeader className="text-center">Quyên góp</CardHeader>
            <CardBody>
              {/* <Bar data={chartjs.bar.data} options={chartjs.bar.options} /> */}
              <div style={{fontSize: 20, textAlign: "center"}}>
                Số dư tài khoản
                <br/>
                <NumberFormat value={4000000000} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} />
              </div>
            </CardBody>
            <ListGroup flush>
              <ListGroupItem>
                <MdInsertChart size={25} color="primary" /> Làm phiếu khảo sát&nbsp;&nbsp;
                {/*<a href={""}>(Link)</a>*/}
                <Link to={"/cards"}>(Link)</Link>
              </ListGroupItem>
              <ListGroupItem>
                <MdInsertChart size={25} color="primary" /> Nạp tiền {' '}
                {/* <Badge color="secondary">$3000</Badge> */}
              </ListGroupItem>
              <ListGroupItem>
                <MdBubbleChart size={25} color="primary" /> Quyên góp
              </ListGroupItem>
              <ListGroupItem>
                <MdShowChart size={25} color="primary" />Tham gia góp sức{' '}
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
        <IconWidget
          className="text-center"
          bgColor="white"
          inverse={false}
          icon={MdThumbUp}
          title="Số người theo dõi"
          subtitle="50.000 người"
        />
        <IconWidget
          className="text-center"
          bgColor="white"
          inverse={false}
          icon={MdRateReview}
          title="Số ngày còn lại"
          subtitle="10 ngày"
        />
        <IconWidget
          className="text-center"
          bgColor="white"
          inverse={false}
          icon={MdShare}
          title="Chia sẻ"
          subtitle="30+ chia sẻ"
        />
      </CardGroup>
    </Page>
  );
};

export default DonationPage;
