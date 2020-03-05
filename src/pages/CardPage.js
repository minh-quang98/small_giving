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

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const CardPage = () => {
  return (
    <Page title="Cards" breadcrumbs={[{ name: 'cards', active: true }]}>
      <Row>
        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="Total Profit"
            subtitle="This month"
            number="9.8k"
            color="secondary"
            progress={{
              value: 75,
              label: 'Last month',
            }}
          />
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="Monthly Visitors"
            subtitle="This month"
            number="5,400"
            color="secondary"
            progress={{
              value: 45,
              label: 'Last month',
            }}
          />
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="New Users"
            subtitle="This month"
            number="3,400"
            color="secondary"
            progress={{
              value: 90,
              label: 'Last month',
            }}
          />
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="Bounce Rate"
            subtitle="This month"
            number="38%"
            color="secondary"
            progress={{
              value: 60,
              label: 'Last month',
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col lg="8" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>
              Total Revenue{' '}
              <small className="text-muted text-capitalize">This year</small>
            </CardHeader>
            <CardBody>
              <Line data={chartjs.line.data} options={chartjs.line.options} />
            </CardBody>
          </Card>
        </Col>

        <Col lg="4" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>Total Expense</CardHeader>
            <CardBody>
              <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
            </CardBody>
            <ListGroup flush>
              <ListGroupItem>
                <MdInsertChart size={25} color="primary" /> Cost of sales{' '}
                <Badge color="secondary">$3000</Badge>
              </ListGroupItem>
              <ListGroupItem>
                <MdBubbleChart size={25} color="primary" /> Management
                costs <Badge color="secondary">$1200</Badge>
              </ListGroupItem>
              <ListGroupItem>
                <MdShowChart size={25} color="primary" /> Financial costs{' '}
                <Badge color="secondary">$800</Badge>
              </ListGroupItem>
              <ListGroupItem>
                <MdPieChart size={25} color="primary" /> Other operating
                costs <Badge color="secondary">$2400</Badge>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <CardGroup style={{ marginBottom: '1rem' }}>
        <IconWidget
          bgColor="white"
          inverse={false}
          icon={MdThumbUp}
          title="50+ Likes"
          subtitle="People you like"
        />
        <IconWidget
          bgColor="white"
          inverse={false}
          icon={MdRateReview}
          title="10+ Reviews"
          subtitle="New Reviews"
        />
        <IconWidget
          bgColor="white"
          inverse={false}
          icon={MdShare}
          title="30+ Shares"
          subtitle="New Shares"
        />
      </CardGroup>
    </Page>
  );
};

export default CardPage;
