import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col,
  Row, Table, CardImg, CardTitle } from 'reactstrap';
import Media from 'reactstrap/es/Media';
import { MdAccountBox } from "react-icons/md";
import moment from 'moment';
import NumberFormat from "react-number-format";
import GUBN from 'assets/img/guide-banner.png';
import IMGU from 'assets/img/image-guide.png';


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
            src={GUBN}
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
              <div style={{fontSize:20}}><b>Nguyễn Thị A</b></div>
              <div>098989898</div>
              <div>abc@gmail.com</div>
            </div>
          </Card>
        </Col>
        <Col xl={9} lg={9} md={12}>
          <Card className="p-2">
            <Table hover bordered responsive>
                <tbody>
                  <tr>
                    <th className="text-center" style={{color: "#ae1f17"}}>Chủ thẻ</th>
                    <td className="text-center">Small Giving</td>
                  </tr>
                  <tr>
                    <th className="text-center" style={{color: "#ae1f17"}}>Số tài khoản</th>
                    <td className="text-center">1818173682</td>
                  </tr>
                  <tr>
                    <th className="text-center" style={{color: "#ae1f17"}}>Tên ngân hàng</th>
                    <td className="text-center">BIDV</td>
                  </tr>
                </tbody>
            </Table>
          </Card>
        </Col>
        <Col xl={12} lg={12} md={12}>
          <Card className="flex-row">
            <CardImg
              className="card-img-left"
              src={IMGU}
              style={{ width: 'auto', height: 250 }}
            />
            <CardBody>
              <CardTitle style={{color: "#ae1f17", fontSize: "24px", textAlign: "center"}}><b>Hướng dẫn nạp tiền</b></CardTitle>
              <Table striped responsive>
                <tbody>
                <tr>
                  <td className="text-center">Bước 1: </td>
                  <td>Nhập số tài khoản phía trên</td>
                </tr>
                <tr>
                  <td className="text-center">Bước 2:</td>
                  <td>Điền nội dung chuyển tiền: Số điện thoại mà bạn đăng ký</td>
                </tr>
                <tr>
                  <td className="text-center">Bước 3:</td>
                  <td>Ấn nút chuyển tiền và chờ kết quả</td>
                </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default GuidePage;
