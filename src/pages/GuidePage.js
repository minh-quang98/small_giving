import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Media from 'reactstrap/es/Media';
import { MdAccountBox } from "react-icons/md";
import moment from 'moment';
import NumberFormat from "react-number-format";

// const tableTypes = ['', 'bordered', 'striped', 'hover'];

const GuidePage = () => {
  return (
    <Page
      title="Hướng dẫn nạp tiền"
    >
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Media
            object
            src={""}
            className="rounded mr-2 mb-2"
            style={{ width: '100%', height: '100%' }}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={3} lg={3} md={12}>
          <Card className="d-flex flex-column align-items-center pt-4 pb-4">
            <div >
              <MdAccountBox style={{width: 50, height: 50}}/>
            </div>
            <div className="text-center">
              <div style={{fontSize:20}}>Nguyễn Thị A</div>
              <div>098989898</div>
              <div>abc@gmail.com</div>
            </div>
          </Card>
        </Col>
        <Col xl={9} lg={9} md={12}>
          <Card className="p-2">
            <Table bordered responsive>
                <tbody>
                  <tr>
                    <th className="text-center">Chủ thẻ</th>
                    <td className="text-center">Small Giving</td>
                  </tr>
                  <tr>
                    <th className="text-center">Số tài khoản</th>
                    <td className="text-center">1818173682</td>
                  </tr>
                  <tr>
                    <th className="text-center">Tên ngân hàng</th>
                    <td className="text-center">BIDV</td>
                  </tr>
                </tbody>
            </Table>
          </Card>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader className="text-center" style={{fontSize: 22}}>
              Cách thức nạp tiền
            </CardHeader>
            <CardBody>
              <div style={{fontSize: 30 }}>
                <div>Bước 1: Chuyển tiền vào số tải khoản trên</div>
                <div>Bước 2: Nội dung chuyển tiền (Số điện thoại bạn đăng ký)</div>
                <div className="text-center">098989898</div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default GuidePage;
