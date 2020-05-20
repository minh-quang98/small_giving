// import { AnnouncementCard, TodosCard } from 'components/Card';
// import HorizontalAvatarList from 'components/HorizontalAvatarList';
// import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/admin/Page';
import ProductMedia from 'components/admin/ProductMedia';
// import SupportTicket from 'components/SupportTicket';
import UserProgressTable from 'components/admin/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/admin/Widget';
// import { getStackLineChart, stackLineChartOptions } from 'demos/chartjs';
import {
  // avatarsData,
  chartjs,
  //productsData,
  //supportTicketsData,
  //todosData,
  //userProgressTableData,
} from '../../demo/admin/dashboardPage';
//import {labels, title, datasets, responsive, legend, tooltips, hover, scales} from 'demos/chartjs';
import React from 'react';

import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  //Button,
  Card,
  CardBody,
  //CardDeck,
  CardGroup,
  CardHeader,
  //CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';
//import axios from 'axios';

// const today = new Date();
// const lastWeek = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate() - 7,
// );

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datasumuser: [],
      datasumact: [],
      datasumsurvey: [],
      datasumgiving: [],
      datanaptien: [],
      datakhaosat: [],
      datanamnay: [],
    };
  }

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getsumuser();
    this.getsumact();
    this.getsumsurvey();
    this.getsumgiving();
    this.getnaptien();
    this.getkhaosat();
    this.getnamnay();
  }
  getnamnay = async () => {
    fetch(
      'https://misappmobile.000webhostapp.com/trangquantri/quyengopnamnay.php',
    )
      .then(response => response.json())
      .then(datanamnay => {
        this.setState(
          {
            datanamnay: datanamnay,
          },
          () => console.log('kiemtradulieu', this.state.datanamnay),
        );
      });
  };
  getsumuser = async () => {
    fetch(
      'http://smallgiving.cf/mobileapp/trangquantri/soluongnguoidung.php',
    )
      .then(response => response.json())
      .then(datasumuser => {
        this.setState(
          {
            datasumuser: datasumuser,
          },
          () => console.log('kiemtradulieu', this.state.datasumuser),
        );
      });
  };
  getsumact = async () => {
    fetch(
      'http://smallgiving.cf/mobileapp/trangquantri/soluonghoatdong.php',
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
  getsumsurvey = async () => {
    fetch(
      'http://smallgiving.cf/mobileapp/trangquantri/soluottraloiks.php',
    )
      .then(response => response.json())
      .then(datasumsurvey => {
        this.setState(
          {
            datasumsurvey: datasumsurvey,
          },
          () => console.log('kiemtradulieu', this.state.datasumsurvey),
        );
      });
  };
  getsumgiving = async () => {
    fetch(
      'http://smallgiving.cf/mobileapp/trangquantri/soluotquyengop.php',
    )
      .then(response => response.json())
      .then(datasumgiving => {
        this.setState(
          {
            datasumgiving: datasumgiving,
          },
          () => console.log('kiemtradulieu', this.state.datasumgiving),
        );
      });
  };
  getnaptien = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/tongnaptien.php')
      .then(response => response.json())
      .then(datanaptien => {
        this.setState(
          {
            datanaptien: datanaptien,
          },
          () => console.log('kiemtradulieu', this.state.datanaptien),
        );
      });
  };
  getkhaosat = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/tongkhaosat.php')
      .then(response => response.json())
      .then(datakhaosat => {
        this.setState(
          {
            datakhaosat: datakhaosat,
          },
          () => console.log('kiemtradulieu', this.state.datakhaosat),
        );
      });
  };

  render() {
    const primaryColor = getColor('primary');
    // const dangerColor = getColor('danger');

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Trang chủ', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            {this.state.datasumuser.map((Item, index) => {
              return <NumberWidget title="Người dùng" number={Item.soluong} />;
            })}
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            {this.state.datasumact.map((Item, index) => {
              return (
                <NumberWidget
                  title="Hoạt động thiện nguyện"
                  number={Item.soluong}
                />
              );
            })}
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            {this.state.datasumsurvey.map((Item, index) => {
              return (
                <NumberWidget title="Trả lời khảo sát" number={Item.soluong} />
              );
            })}
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            {this.state.datasumgiving.map((Item, index) => {
              return (
                <NumberWidget title="Lượt quyên góp" number={Item.soluong} />
              );
            })}
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Tổng quyên góp </CardHeader>
              <CardBody>
                <Line data={chartjs.line.data} options={chartjs.line.options} />
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Đầu tư người dùng</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Nạp tiền{' '}
                  {this.state.datanaptien.map((Item, index) => {
                    return <Badge color="danger">{Item.tongnap}</Badge>;
                  })}
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Trả lời khảo
                  sát{' '}
                  {this.state.datakhaosat.map((Item, index) => {
                    return <Badge color="danger">{Item.tongkhaosat}</Badge>;
                  })}
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Xem quảng cáo{' '}
                  <Badge color="danger">0</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdPieChart size={25} color={primaryColor} /> Khác{' '}
                  <Badge color="danger">0</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>



        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Hoạt động thiện nguyện gần đây</CardHeader>
              <CardBody>
                <ProductMedia />
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Người dùng mới</CardHeader>
              <CardBody>
                <UserProgressTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;