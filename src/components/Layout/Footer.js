import React from 'react';

import { Navbar, Nav, NavItem, Row, Col } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Row className="footer">
      <Col md={4} className="item-footer">
        <p>Liên kết</p>
        <ul>
          <li>
            <a>Học viện ngân hàng</a>
          </li>
          <li>
            <a>Khoa hệ thống thông tin quản lý</a>
          </li>
          <li>
            <a>OpenWay</a>
          </li>
          <li>
            <a>Đoàn thanh niên & Hội sinh viên</a>
          </li>
        </ul>
      </Col>
      <Col md={4} className="item-footer">
        <p> Thông tin liên hệ</p>
        <ul>
          <li>Địa chỉ: </li>
          <li> Hotline</li>
          <li>
            Gmail:
                </li>
        </ul>
      </Col>
      <Col md={4} className="item-footer">
        <ul>
          <li>
            Số lượt truy cập hiện tại
                </li>
          <li>
            Số người đã truy cập
                </li>
        </ul>
      </Col>
    </Row>
  );
};

export default Footer;
