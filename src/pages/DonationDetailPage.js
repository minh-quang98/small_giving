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


class DonationDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      modalParent: false,
      modal: false,
    }
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
        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>

              <CardBody>
                {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                <Media
                  object
                  src={NGND}
                  className="rounded mr-2 mb-2"
                  style={{ width: '100%', height: '100%' }}
                />

                <div className="mt-4">
                  Tình cảm là nhu cầu không thể thiếu đối với mỗi con người, nhất là những người già neo đơn, không
                  nơi nương tựa tại Làng Tre. Các cụ - mỗi người một hoàn cảnh, một câu chuyện khác nhau nhưng lại đều
                  xuất thân từ những gia đình quá khó khăn, con cái người mất người còn hoặc không đủ khả năng nuôi
                  dưỡng nên đành đến nương náu tại Trung tâm.
                  <br/>
                  Khi gặp Đoàn đến thăm - các cụ mừng khôn xiết, như là gặp được những đứa con của mình, với tuổi già
                  bóng xế, họ cần lắm một sự an ủi yêu thương, nương tựa cho quãng đời ngắn ngủi còn lại.
                  <br/>
                  Ở đây lúc nào cũng rộn rã tiếng xe lăn, tiếng bước chân tập tễnh, tiếng phát ra từ chiếc radio cũ kỹ,
                  các cụ sum vầy bên nhau nói chuyện, kể cho nhau quãng đời “sóng gió” đã trải qua. Tuổi già với họ luôn
                  nặng tâm sự, nhưng ai cũng thấy may mắn khi có chỗ nương thân cuối đời
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
                  <NumberFormat value={4000000000} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'}/>
                </div>
              </CardBody>
              <ListGroup flush>
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
            </Card>
          </Col>
        </Row>

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
}

export default DonationDetailPage;
