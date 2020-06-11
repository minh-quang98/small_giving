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
      <Row className="guide-fix">
        <Col md={6}>
          <div className="fix-x-1">
            <img src={step1}>
            </img>
          </div>

          <div className="fix-x-1 ">
            <div className="fix-2">
              Nhập vào số tài khoản: 1039588920000333 <span>
                Bước 2
              </span>

            </div>
            <div className="guide-step">
            </div>
          </div>
          <div className="fix-x-1">
            <img src={step3}>
            </img>
          </div>
          <div className="fix-x-1 ">
            <div className="fix-2">
              Tại mục nội dung chuyển khoản:<br /> Nhập vào số điện thoại mà bạn đã đăng ký tài khoản ví <span>
                Bước 4
              </span>

            </div>

          </div>
        </Col>
        <Col md={6}>

          <div className="fix-x">
            <div className="fix-1">
              <span>
                Bước 1
              </span> Chọn ngân hàng thụ hưởng: Techcombank (Ngân hàng TMCP Kỹ thương Việt Nam)

            </div>


          </div>
          <div className="fix-x">
            <img src={step2}></img>
          </div>
          <div className="fix-x">
            <div className="fix-1">
              <span >
                Bước 3
    </span> Nhập số tiền bạn muốn nạp vào ví
            </div>

          </div>
          <div className="fix-x">
            <img src={step4}></img>
          </div>
        </Col>
      </Row>
      <div className="align-center notify-guide">
        Lưu ý*: Các giao dịch nạp tiền sẽ được cập nhật vào 18:00 mỗi ngày.
      </div>
    </Page>
  );
};

export default GuidePage;
