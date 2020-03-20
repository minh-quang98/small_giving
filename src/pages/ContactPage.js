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

const ContactPage = () => {
  return (
    <Page className="ContactPage"
                 title="Liên hệ và góp ý">
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader style={{color: "#ae1f17", fontSize: "18px", textAlign: "center",marginTop: 10}}> Mọi ý kiến thắc mắc vui lòng liên hệ </CardHeader>
            <CardBody>
              <Form>
                <Table hover responsive style={{marginTop: 25}}>
                  <tbody>
                  <tr>
                    <th className="text-center">Số điện thoại</th>
                    <td className="text-center">0999999999</td>
                  </tr>
                  <tr>
                    <th className="text-center">Họ tên</th>
                    <td className="text-center">Trần Thị B</td>
                  </tr>
                  <tr>
                    <th className="text-center">Chức vụ</th>
                    <td className="text-center">Tình nguyện viên tư vấn</td>
                  </tr>
                  </tbody>
                </Table>
                {/*<FormGroup>*/}
                {/*  <Label for="exampleEmail"> Số điện thoại: 0999999999 </Label>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*  <Label for="exampleEmail"> Họ tên: Trần Thị B </Label>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                {/*  <Label for="exampleEmail"> Chức vụ: Tình nguyện viên tư vấn </Label>*/}
                {/*</FormGroup>*/}
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader style={{color: "#ae1f17", fontSize: "18px", textAlign: "center",marginTop: 10}}> Rất mong nhận được sự góp ý của bạn </CardHeader>
            <CardBody style={{marginTop: 25}}>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}> Email </Label>
                  <Col sm={10}>
                    <Input type="email" name="email" placeholder="Nhập email"/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="examplePassword" sm={2}> SĐT </Label>
                  <Col sm={10}>
                    <Input type="password"
                           name="password"
                           placeholder="Nhập SĐT"/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelectMulti" sm={2}> Nội dung </Label>
                  <Col sm={10}>
                    <Input type="textarea"
                           name="text"
                           multiple/>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 100, offset: 2 }} style={{textAlign:"right",marginRight:15}}>
                    <Button > Gửi </Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Page>
  );
};

export default ContactPage;
