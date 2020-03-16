import Page from 'components/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

class ConsiderPage extends React.Component {
  render() {
    return (
      <Page className="ConsiderPage" title="KHẢO SÁT">
          <Row>
              <Col xl={6}
                   lg={12}
                   md={12}>
                  <Card>
                      <CardHeader className="text-center"> Tên công ty: ABC </CardHeader>
                      <CardBody>
                          <Form>
                              <FormGroup>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Tên khảo sát
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          Nhu cầu làm thêm của sinh viên HVNH
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Link KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          LINK
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số lượt còn lại
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          100 lượt
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số tiền làm KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          500.000 VNĐ / 1000 lượt
                                      </td>
                                  </Table>
                              </FormGroup>
                          </Form>
                      </CardBody>
                  </Card>

                  <Card>
                      <CardHeader className="text-center"> Tên công ty: CCA </CardHeader>
                      <CardBody>
                          <Form>
                              <FormGroup>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Tên khảo sát
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          Nhu cầu làm thêm của sinh viên HVNH
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Link KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          LINK
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số lượt còn lại
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          100 lượt
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số tiền làm KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          500.000 VNĐ / 1000 lượt
                                      </td>
                                  </Table>
                              </FormGroup>
                          </Form>
                      </CardBody>
                  </Card>
              </Col>
              <Col xl={6} lg={12} md={12}>
                  <Card>
                      <CardHeader className="text-center"> Tên công ty: BBA </CardHeader>
                      <CardBody>
                          <Form>
                              <FormGroup>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Tên khảo sát
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          Nhu cầu làm thêm của sinh viên HVNH
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Link KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          LINK
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số lượt còn lại
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          100 lượt
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số tiền làm KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          500.000 VNĐ / 1000 lượt
                                      </td>
                                  </Table>
                              </FormGroup>
                          </Form>
                      </CardBody>
                  </Card>
                  <Card>
                      <CardHeader className="text-center">
                          Tên công ty: BAC
                      </CardHeader>
                      <CardBody>
                          <Form>
                              <FormGroup>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Tên khảo sát
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          Nhu cầu làm thêm của sinh viên HVNH
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Link KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}> LINK</td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số lượt còn lại
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          100 lượt
                                      </td>
                                  </Table>
                                  <Table bordered>
                                      <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                                          Số tiền làm KS
                                      </th>
                                      <td className="text-center" style={{ width: '80%' }}>
                                          500.000 VNĐ / 1000 lượt
                                      </td>
                                  </Table>
                              </FormGroup>
                          </Form>
                      </CardBody>
                  </Card>
              </Col>
          </Row>
      </Page>
    );
  }
}

export default ConsiderPage;
