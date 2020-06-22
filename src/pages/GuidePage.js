import Page from 'components/Page';
import React from 'react';
import {
  Card, CardBody, CardHeader, Col,
  Row, Table, CardImg, CardTitle
} from 'reactstrap';
import Media from 'reactstrap/es/Media';
import { MdAccountBox } from "react-icons/md";
import moment from 'moment';
import NumberFormat from "react-number-format";
import GUBN from 'assets/img/guide-banner.png';
import IMGU from 'assets/img/image-guide.png';
import step1 from 'assets/img/step1.PNG'
import step2 from 'assets/img/step2.png'
import step3 from 'assets/img/step3.png'
import step4 from 'assets/img/step4.png'

// const tableTypes = ['', 'bordered', 'striped', 'hover'];

const GuidePage = () => {
  return (
    <Page
      className="bcquyengop"
      title="Hướng dẫn nạp tiền"
      breadcrumbs={[
        { name: 'Hướng dẫn nạp tiền' },

      ]}
    >
      <div className="bg-guide">
        <Row className="fix-heigh-bg">
          <Col md={6} sm={12} xs={12} className="guide-layout">
            <div className="fix-img-guide">
              <img src={step1}>
              </img>
            </div>
            <div className="title-guide">
              <span>
                Bước 1
                </span> Chọn ngân hàng thụ hưởng: Vietcombank <br /> (Ngân hàng TMCP Ngoại Thương Việt Nam)
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>

          </Col>
        </Row>
        <Row >
          <Col md={6} sm={12} xs={12}>
          </Col>
          <Col md={6} sm={12} xs={12} className="guide-layout-2">
            <div className="fix-img-guide">
              <img src={step2}></img>
            </div>
            <div className="title-guide-2">
              <span>
                Bước 2
              </span> Nhập vào số tài khoản: 0451000504125
            </div>
          </Col>
        </Row>
        <Row >
          <Col md={6} sm={12} xs={12} className="guide-layout">
            <div className="fix-img-guide">
              <img src={step3}>
              </img>
            </div>
            <div className="title-guide">
              <div className="fix-guide">
                <span >
                  Bước 3
                </span> Nhập số tiền bạn muốn nạp vào ví
              </div>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>

          </Col>
        </Row>
        <Row >
          <Col md={6} sm={12} xs={12}>

          </Col>
          <Col md={6} sm={12} xs={12} className="guide-layout-2">
            <div className="fix-img-guide">
              <img src={step4}></img>
            </div>
            <div className="title-guide-2">
              <span>
                Bước 4
              </span> Tại mục nội dung chuyển khoản:<br /> Nhập vào "TN"+"số điện thoại mà bạn đã đăng ký tài khoản" <br /> (Ví dụ: TN0985123123)
            </div>
          </Col>
        </Row>
      </div>
      <div className="align-center notify-guide">
        Lưu ý*: Các giao dịch nạp tiền sẽ được cập nhật sau 1-2 phút.
      </div>
    </Page>
  );
};

export default GuidePage;
