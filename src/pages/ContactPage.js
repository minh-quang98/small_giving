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

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      noiDung: ''
    }
  }

  themGopY () {
    let config = {
      method: "POST",
      body: JSON.stringify({
        NoiDung: this.state.noiDung
      })
    }
    fetch(`https://misappmobile.000webhostapp.com/Gopy/gopyweb.php`, config)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data)
      })
  }

  render() {
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
                    <Label for="exampleSelectMulti" sm={2}> Nội dung </Label>
                    <Col sm={10}>
                      <TextField
                        style={{width: "100%"}}
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        onChange={(val)=> {
                          this.setState({
                            noiDung: val.target.value
                          })
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 100, offset: 2 }} style={{textAlign:"right",marginRight:15}}>
                      <Button onClick={()=>this.themGopY}> Gửi </Button>
                    </Col>
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

export default ContactPage;
