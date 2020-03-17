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
import NumberFormat from 'react-number-format';

class ConsiderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeData: [
              {
                title: "Công ty trách nhiệm hữu hạn openways Việt Nam",
                name: "Nhu cầu làm thêm của sinh viên",
                link: "LINK",
                number: 1000,
                money: 500000
              },
              {
                title: "Công ty trách nhiệm ACB",
                name: "Nhu cầu làm thêm của sinh viên",
                link: "LINK",
                number: 1000,
                money: 500000
              },
              {
                title: "Công ty trách nhiệm ACB",
                name: "Nhu cầu làm thêm của sinh viên",
                link: "LINK",
                number: 1000,
                money: 500000
              },
              {
                title: "Công ty trách nhiệm ACB",
                name: "Nhu cầu làm thêm của sinh viên",
                link: "LINK",
                number: 1000,
                money: 500000
              },
            ]
        }
    }
  render() {
    return (
      <Page className="ConsiderPage" title="LÀM KHẢO SÁT">
          <Row>
              <Col xl={12} lg={12} md={12}>
                {this.state.fakeData.map((item, index) => (
                  <Card className="mt-5">
                    <CardHeader className="text-center"> <b>{item.title}</b> </CardHeader>
                    <CardBody>
                      <Form>
                        <FormGroup>
                          <Table bordered >
                            <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                              Tên khảo sát
                            </th>
                            <td className="text-center" style={{ width: '80%' }}>
                              {item.name}
                            </td>
                          </Table>
                          <Table bordered>
                            <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                              Link khảo sát
                            </th>
                            <td className="text-center" style={{ width: '80%' }}>
                              {item.link}
                            </td>
                          </Table>
                          <Table bordered>
                            <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                              Số lượt còn lại
                            </th>
                            <td className="text-center" style={{ width: '80%' }}>
                              {item.number}
                            </td>
                          </Table>
                          <Table bordered>
                            <th className="text-center" style={{ backgroundColor: '#ae1f17', color: 'white' }}>
                              Số tiền khảo sát
                              <br/>
                              (VNĐ / lượt)
                            </th>
                            <td className="text-center" style={{ width: '80%' }}>
                              <NumberFormat value={item.money} displayType={'text'} thousandSeparator={true}/>
                            </td>
                          </Table>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                ))}
              </Col>
          </Row>
      </Page>
    );
  }
}

export default ConsiderPage;
