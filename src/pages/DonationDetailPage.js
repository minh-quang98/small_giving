import React, { Component } from 'react';
import Page from 'components/Page';
import { Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Media from 'reactstrap/es/Media';
import NGND from "*.jpg";
import NumberFormat from "react-number-format";

class DonationDetailPage extends Component {
  render() {
    return (
      <Page title="Người gia neo đơn">
        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                Người già neo đơn{' '}
                <small className="text-muted text-capitalize mt-1">
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
      </Page>
    );
  }
}

export default DonationDetailPage;
