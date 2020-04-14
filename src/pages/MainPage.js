import { AnnouncementCard, TodosCard } from 'components/Card';
import HorizontalAvatarList from 'components/HorizontalAvatarList';
import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/UserProgressTable';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from '../demo/dashboardPage';
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
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


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
      data: [],
      messageErr: "",
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
    }
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getRankInfo()
  }

  getRankInfo = async () => {
    fetch('https://misappmobile.000webhostapp.com/Bangxephang/bangxephang.php')
      .then((response) => response.json())
      .then((data) => {
// <<<<<<< HEAD
//         console.log("dâta>>>>", data);
// =======
     if(data.message !== "No post found") {
// >>>>>>> f06ae620ee6ee6481e81860992c959e5ff16c573
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
                <UncontrolledCarousel items={fakeData}/>
              </div>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                <div style={{fontSize: 24, textAlign: "center", color: '#8e8e8e'}}>
                   Số dư tài khoản
                  <br/>
                  {this.state.token === ""
                    ? <div style={{fontSize: 20, color: "#ae1f17", }}>
                      Vui lòng đăng nhập vào hệ thống để cùng nhau chia sẻ những yêu thương
                    </div>
                    : <NumberFormat value={0} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'}/>
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
                {this.state.messageErr === ""
                  ? <UserProgressTable
                    headers={[
                      //<MdPersonPin size={25} />,
                      'Huy hiệu',
                      'Tài khoản',
                      'Số tiền',
                    ]}
                    usersData={this.state.data}
                  />
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
