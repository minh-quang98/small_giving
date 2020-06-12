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
import Cookies from 'js-cookie';
const tableTypes = ['hover'];
const initialState = {
  startdate: '',
  enddate: '',
  data: [],
  dataError: [],
  dataerror: false,
  token: Cookies.get('small-giving') ? Cookies.get('small-giving') : "",
  user: [],
};
const dataError = [
  {
    id: "",
    TenHoatDong: " Chưa có dữ liệu",
    SoTien: "",
  }
]
class bcquyengop extends React.Component {
  state = initialState;
  componentDidMount() {
    this.getUser()

  }
  getUser = () => {
    if (this.state.token !== "") {
      let config = {
        method: "POST",
        body: JSON.stringify({
          token: this.state.token
        })
      }
      fetch(`http://smallgiving.cf/mobileapp/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            user: data
          })
        })
    }
  }
  getdatabaocao() {
    const isValid = this.validate();
    if (isValid) {
      let config = {
        method: "POST",
        body: JSON.stringify({
          NgayBD: this.state.startdate,
          NgayKT: this.state.enddate,
          ClientNumber: this.state.user.SDT,

        }),
      };
      fetch('https://misappmobile.000webhostapp.com/apiway4/lichsugiaodich.php', config)
        .then(response => response.json())
        .then(data => {
          if (data.message === "No post found") {
            this.setState({ dataerror: true, dataError: dataError });
          } else {
            this.setState(
              {
                dataerror: false,
                data: data,
              },
            );


          }
        });

    }
  }

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
    //const isValid = this.validate();
    //if (isValid) {
    console.log(this.state);
    //clear form
    //this.setState(initialState);
    //}
  };
  render() {
    return (
      <Page
        className="bcquyengop"
        title="Tổng quyên góp"
        breadcrumbs={[
          { name: 'lịch sử giao dịch' },

        ]}
      >
        <Row>
          <Col lg="1"></Col>
          <Col lg="10">
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
                                <Col md={4}>
                                  <Label for="exampleDate">
                                    Từ ngày <span className="red-text">*</span>
                                  </Label>
                                </Col>
                                <Col md={8}>
                                  <div className="error-text">
                                    {this.state.startdateError}
                                  </div>
                                  <Input
                                    type="date"
                                    name="startdate"
                                    value={this.state.startdate}
                                    onChange={(val) => {
                                      this.setState({
                                        startdate: val.target.value,
                                        startdateError: "",
                                      })
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Form>

                          </Col>
                          <Col xl={6} lg={12} md={12}>
                            <Form>
                              <Row>
                                <Col md={4}>
                                  <Label for="exampleDate">
                                    Đến ngày <span className="red-text">*</span>
                                  </Label>
                                </Col>
                                <Col md={8}>
                                  <div className="error-text">
                                    {this.state.enddateError}
                                  </div>
                                  <Input
                                    type="date"
                                    name="enddate"
                                    value={this.state.enddate}
                                    onChange={(val) => {
                                      this.setState({
                                        enddate: val.target.value,
                                        enddateError: "",
                                      })
                                    }}
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
                            <th>Thời gian</th>
                            <th>Giao dịch</th>

                            <th>Số tiền giao dịch</th>
                            <th>Ghi chú</th>
                          </tr>
                          </thead>
                          <tbody>
                          {this.state.dataerror ?
                            this.state.dataError.map(Item => {
                              return (
                                <tr>
                                  <td>{Item.id}</td>
                                  <td>{Item.TenHoatDong}</td>

                                  <td>{Item.SoTien}</td>
                                  <td>{Item.SoTien}</td>
                                </tr>
                              );
                            }) : this.state.data.map(Item => {
                              return (
                                <tr>
                                  <td>{Item.Ngaychuyen}</td>
                                  <td>{Item.TenGiaoDich}</td>

                                  <td>{Item.TransAmount}</td>
                                  <td>{Item.TrangThai}</td>
                                </tr>
                              );
                            })}
                          </tbody>

                        </Table>
                        <Table {...{ [tableType || 'hover']: true }}>

                        </Table>
                        <div className="button-bottom">
                          <Row>
                            <Col md={12} className="center">
                              <Button
                                className="submit-refix"
                                type="submit"
                                color="danger"
                                size="lg"
                                onClick={() => this.getdatabaocao()}
                              >
                                Tra cứu
                              </Button>
                            </Col>

                          </Row>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            ))}
          </Col>
          <Col lg="1"></Col>
        </Row>

      </Page>
    );
  }
}
export default bcquyengop;
