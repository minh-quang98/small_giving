import React, { Component } from 'react';
import Page from 'components/Page';
import { Card, CardHeader, Table, Input, Col, Row, Button } from 'reactstrap';
import {TextField} from '@material-ui/core'

class ProfileUser extends Component {
  render() {
    return (
      <Page title="Thông tin cá nhân">
        <Row>
          <Col xl={9} lg={12} md={12}>
            <Card>
              <Table>
                <tbody className="text-center">
                  <tr>
                    <td>Tên tài khoản</td>
                    <td>Vũ Thị phượng</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Mật khẩu</td>
                    <td>********</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>giới tính</td>
                    <td style={{ width: "20%" }}>
                      <Input type="radio" name="radio2" />{' '}
                Nam
                </td>
                    <td style={{ width: "20%" }}>
                      <Input type="radio" name="radio2" />{' '}
                Nữ
                </td>
                  </tr>
                  <tr>
                    <td>Ngày sinh</td>
                    <td>
                      <TextField
                        id="date"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>Vu63375@gmail.com</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Số điện thoại</td>
                    <td>09888888484</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Số tài khoản</td>
                    <td>11109888888484</td>
                    <td></td>
                  </tr>
                </tbody>
                <div className="d-flex justify-content-center" style={{ width: "100%" }} ><Button>Chỉnh sửa</Button></div>
              </Table>
            </Card>
          </Col>
        </Row>

      </Page>
    );
  }
}

export default ProfileUser;
