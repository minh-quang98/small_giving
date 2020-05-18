import Page from 'components/Page';
import React from 'react';
import ReactToExcel from 'react-html-table-to-excel';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  Form,
  Label,
  Input,
  Button,
} from 'reactstrap';
const tableTypes = ['hover'];
const initialState = {
  startdate: '',
  enddate: '',
};
class bcquyengop extends React.Component {
  state = initialState;
  handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };
  validate = () => {
    let startdateError = '';
    let enddateError = '';

    if (!this.state.startdate) {
      startdateError = 'Bạn cần chọn một mốc thời gian';
    }
    if (!this.state.enddate) {
      enddateError = 'Bạn cần chọn một mốc thời gian';
    }
    if (this.state.startdate >= this.state.enddate) {
      enddateError = 'Mốc thời gian không hợp lệ';
    }
    if (startdateError || enddateError) {
      this.setState({ startdateError, enddateError });
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      //clear form
      //this.setState(initialState);
    }
  };
  render() {
    return (
      <Page
        className="bcquyengop"
        title="Tổng quyên góp"
        breadcrumbs={[
          { name: 'báo cáo' },
          { name: 'giao dịch quyên góp', active: true },
        ]}
      >
        {tableTypes.map((tableType, index) => (
          <Form onSubmit={this.handleSubmit}>
            <Row key={index}>
              <Col>
                <Card className="mb-3">
                  <CardBody>
                    <Row>
                      <Col xl={6} lg={12} md={12}>
                        <Form>
                          <Row>
                            <Col md={3}>
                              <Label for="exampleDate">
                                Từ ngày <span className="red-text">*</span>
                              </Label>
                            </Col>
                            <Col md={9}>
                              <div className="error-text">
                                {this.state.startdateError}
                              </div>
                              <Input
                                type="date"
                                name="startdate"
                                value={this.state.startdate}
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                      <Col xl={6} lg={12} md={12}>
                        <Form>
                          <Row>
                            <Col md={3}>
                              <Label for="exampleDate">
                                Đến ngày <span className="red-text">*</span>
                              </Label>
                            </Col>
                            <Col md={9}>
                              <div className="error-text">
                                {this.state.enddateError}
                              </div>
                              <Input
                                type="date"
                                name="enddate"
                                value={this.state.enddate}
                                onChange={this.handleChange}
                              />
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                    <Table
                      {...{ [tableType || 'hover']: true }}
                      id="table-to-xls-2"
                    >
                      <thead>
                        <tr className="table-danger">
                          <th>STT</th>
                          <th>Tên hoạt động</th>
                          <th> Nhà hảo tâm</th>
                          <th>Số tiền quyên góp</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>120000</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>100000</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>50000</td>
                        </tr>
                        <tr>
                          <th scope="row">4</th>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>60000</td>
                        </tr>
                        <tr>
                          <th scope="row">5</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>60000</td>
                        </tr>
                        <tr>
                          <th scope="row">6</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>7000</td>
                        </tr>
                        <tr>
                          <th scope="row">7</th>
                          <td>Wendy</td>
                          <td>the Magic</td>
                          <td>200000</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Table {...{ [tableType || 'hover']: true }}>
                      <Row>
                        <Col md={9} className="sum-left">
                          <div className="sum"> Tổng tiền</div>
                        </Col>
                        <Col md={3} className="sum-right">
                          <div className="sum"> 14500000</div>
                        </Col>
                      </Row>
                    </Table>
                    <div className="button-bottom">
                      <Row>
                        <Col md={6} className="center">
                          <Button
                            className="submit-refix"
                            type="submit"
                            color="danger"
                            size="lg"
                          >
                            Báo cáo
                          </Button>
                        </Col>
                        <Col md={6} className="center">
                          <ReactToExcel
                            outline
                            color="danger"
                            size="lg"
                            className="btn btn-excel-report"
                            table="table-to-xls-2"
                            filename="excelfile"
                            sheet="sheet 1"
                            buttonText="Xuất Excel"
                          ></ReactToExcel>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        ))}
      </Page>
    );
  }
}
export default bcquyengop;
