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
  Row, UncontrolledCarousel,
} from 'reactstrap';
import { getColor } from 'utils/colors';
import NumberFormat from 'react-number-format';
import Media from 'reactstrap/es/Media';
import { Link } from "react-router-dom";
import banner from 'assets/img/banner.png';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fakeData : [
        {
          src: 'img/Slide/banner.png',
          // altText: 'Slide 1',
          // caption: 'Slide 1',
          // header: 'Slide 1 Header',
          key: '1'
        },
        {
          src: 'img/Slide/banner2.png',
          // altText: 'Slide 2',
          // caption: 'Slide 2',
          // header: 'Slide 2 Header',
          key: '2'
        },
        {
          src: 'img/Slide/banner3.png',
          // altText: 'Slide 3',
          // caption: 'Slide 3',
          // header: 'Slide 3 Header',
          key: '3'
        }
      ]
    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    let {fakeData} = this.state
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
              </ListGroup>
              <ListGroup flush>
                <ListGroupItem className="text-center">
                  <Button>Điểm danh</Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Về chúng tôi</CardHeader>
              <CardBody>
                {productsData.map(
                  ({ id, image, title, description,}) => (
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
                <UserProgressTable
                  headers={[
                    //<MdPersonPin size={25} />,
                    'Huy hiệu',
                    'Tài khoản',
                    'Số tiền',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default MainPage;
