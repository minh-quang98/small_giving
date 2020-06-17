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
    fetch(`http://smallgiving.cf/mobileapp/Gopy/gopyinsert.php`, config)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Success") {
          this.props.enqueueSnackbar('Gửi góp ý thành công !', {
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
          this.props.enqueueSnackbar('Không được để trống nội dung !', {
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
          { name: 'Liên hệ và góp ý' },

        ]}
      >
        <Row>
          <Col lg="1"></Col>

          <Col xl={8} lg={12} md={12}>
            <Card>
              <CardHeader style={{ color: "#ae1f17", fontSize: "18px", textAlign: "center", marginTop: 10 }}> Rất mong nhận được sự góp ý của bạn </CardHeader>
              <CardBody style={{ marginTop: 25 }}>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup >
                        <Label for="exampleSelectMulti" sm={12}> Họ tên </Label>
                        <Col sm={12}>
                          <Input
                            style={{ width: "100%" }}
                            type="text"
                            onChange={(val) => {
                              this.setState({
                                noiDung: val.target.value
                              })
                            }}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup >
                        <Label for="exampleSelectMulti" sm={12}> Email</Label>
                        <Col sm={12}>
                          <Input
                            style={{ width: "100%" }}
                            type="text"
                            onChange={(val) => {
                              this.setState({
                                noiDung: val.target.value
                              })
                            }}
                          />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup row>
                    <Label for="exampleSelectMulti" sm={2}> Nội dung </Label>
                    <Col sm={10}>
                      <Input
                        style={{ width: "100%" }}
                        type="textarea"
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
                    <Col className="align-center" sm={{ size: 100, offset: 2 }} style={{ textAlign: "right", marginRight: 15 }}>
                      <Button onClick={() => this.themGopY()}> Gửi </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col lg="1"></Col>
        </Row>

      </Page>
    );
  }
}

export default withSnackbar(ContactPage);
