import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row, Table,
} from 'reactstrap';
import { TextField } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { FaGlobeAmericas } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noiDung: ''
    }
  }

  themGopY() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        NoiDung: this.state.noiDung
      })
    }
    fetch(`http://apis.bav.edu.vn/smallgiving/Gopy/gopyinsert.php`, config)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          this.props.enqueueSnackbar('Góp ý của bạn đã được gửi về hệ thống !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        } else {
          this.props.enqueueSnackbar('Bạn cần nhập một nội dung góp ý nào đó !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      })
  }

  render() {
    return (
      <Page
        className="bcquyengop ContactPage"
        title="Liên hệ và góp ý"
        breadcrumbs={[
          { name: 'Liên hệ và góp ý', link: '/contact' },

        ]}
      >
        <div className="bg-contact">
          <Row>

            {/*<Col xl={4} lg={12} md={12}>*/}
            {/*  <Card>*/}
            {/*    <CardHeader style={{ color: "#ae1f17", fontSize: "18px", textAlign: "center", marginTop: 10 }}> Mọi ý kiến thắc mắc vui lòng liên hệ </CardHeader>*/}
            {/*    <CardBody>*/}
            {/*      <Form>*/}
            {/*        <Table hover responsive style={{ marginTop: 25 }}>*/}
            {/*          <tbody>*/}
            {/*            <tr>*/}
            {/*              <th className="text-center">Số điện thoại</th>*/}
            {/*              <td className="text-center">0999999999</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*              <th className="text-center">Họ tên</th>*/}
            {/*              <td className="text-center">Trần Thị B</td>*/}
            {/*            </tr>*/}
            {/*            <tr>*/}
            {/*              <th className="text-center">Chức vụ</th>*/}
            {/*              <td className="text-center">Tình nguyện viên tư vấn</td>*/}
            {/*            </tr>*/}
            {/*          </tbody>*/}
            {/*        </Table>*/}
            {/*        /!*<FormGroup>*!/*/}
            {/*        /!*  <Label for="exampleEmail"> Số điện thoại: 0999999999 </Label>*!/*/}
            {/*        /!*</FormGroup>*!/*/}
            {/*        /!*<FormGroup>*!/*/}
            {/*        /!*  <Label for="exampleEmail"> Họ tên: Trần Thị B </Label>*!/*/}
            {/*        /!*</FormGroup>*!/*/}
            {/*        /!*<FormGroup>*!/*/}
            {/*        /!*  <Label for="exampleEmail"> Chức vụ: Tình nguyện viên tư vấn </Label>*!/*/}
            {/*        /!*</FormGroup>*!/*/}
            {/*      </Form>*/}
            {/*    </CardBody>*/}
            {/*  </Card>*/}
            {/*</Col>*/}
            {/*<Col xl={6} lg={12} md={12}>*/}

            <Col xl={6} lg={6} md={6}>
              <Card className="layout-contact">
                <CardHeader className="header-contact" style={{ color: "#ae1f17", fontSize: "18px", textAlign: "center", marginTop: 10 }}> Rất mong nhận được sự góp ý của bạn </CardHeader>
                <CardBody className="body-contact" style={{ marginTop: 25 }}>
                  <Form>

                    <FormGroup >

                      <Col sm={12}>
                        <Input
                          style={{ width: "100%" }}
                          type="text"
                          placeholder="Họ tên"
                          onChange={(val) => {
                            this.setState({
                              noiDung: val.target.value
                            })
                          }}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup >

                      <Col sm={12}>
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Email"
                          type="text"
                          onChange={(val) => {
                            this.setState({
                              noiDung: val.target.value
                            })
                          }}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup >

                      <Col sm={12}>
                        <Input
                          style={{ width: "100%" }}
                          className="gopy-heigh"
                          type="textarea"
                          placeholder="Nội dung góp ý"
                          multiline
                          rowsMax={4}
                          variant="outlined"
                          onChange={(val) => {
                            this.setState({
                              noiDung: val.target.value
                            })
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col className="align-center" sm={{ size: 100, offset: 0 }} style={{ textAlign: "center" }}>
                        <Button onClick={() => this.themGopY()}> Gửi góp ý</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col className="info-contact" xl={6} lg={6} md={6}>
              <div>
                <div className="text-bold align-center title-contact"> Thông tin liên hệ</div>

                <div className="fix-margin-ct"><FaHome />{' '}{''}Địa chỉ: 12 Chùa Bộc, Đống Đa, Hà Nội</div>
                <div className="fix-margin-ct"><FaPhone />{' '}{''}Hotline: 093 463 83 33</div>
                <div className="fix-margin-ct"><FaMailBulk />{' '}{''}Gmail: vpdoanhvnh@gmail.com</div>

              </div>
              <div>

              </div>


            </Col>
          </Row>
        </div>
      </Page>
    );
  }
}

export default withSnackbar(ContactPage);
