import React from 'react';

import { Navbar, Nav, NavItem, Row, Col } from 'reactstrap';
import NumberFormat from 'react-number-format';
import SourceLink from 'components/SourceLink';
import { FaGlobeAmericas } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa';
import FT from "assets/img/news-banner.png"
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSumqg: [],
      dataCountnht: [],
      dataSumthieu: "",
    };
  }

  componentDidMount() {
    this.getSum();
    this.getCount();
    this.getThieu();
  }
  getSum = async () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/Baocao/tongquyengop.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataSumqg: data
        })
      })
  };
  getCount = async () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/Baocao/tongnguoiquyengop.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataCountnht: data
        })
      })
  };
  getThieu = async () => {
    fetch(`http://apis.bav.edu.vn/smallgiving/Baocao/soduhoatdong.php`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataSumthieu: data.ConThieu
        })
      })
  };

  render() {
    return (
      <div className="ft-fix">
        <Row className="footer">
          <Col md={4} className="item-footer">

            <div className="text-bold">Liên kết</div>

            {/* <div className="fix-margin">
              <a href="http://www.hvnh.edu.vn"><FaGlobeAmericas />{' '}{''} Học viện Ngân Hàng</a>
            </div> */}
            <div className="fix-margin">
              <a href="http://mis.hvnh.edu.vn"><FaGlobeAmericas />{' '}{''} Khoa Hệ thống thông tin quản lý</a>
            </div>
            <div className="fix-margin">
              <a href="https://www.openwaygroup.com/"><FaGlobeAmericas />{' '}{''} OpenWay Group</a>
            </div>
            <div className="fix-margin">
              <a href="https://www.facebook.com/hsvhvnh"><FaGlobeAmericas />{' '}{''} Đoàn thanh niên & Hội sinh viên</a>
            </div>



          </Col>
          <Col md={4} className="item-footer">

            <div className="text-bold"> Thông tin liên hệ</div>

            <div className="fix-margin"><FaHome />{' '}{''}Địa chỉ: 12 Chùa Bộc, Đống Đa, Hà Nội</div>
            <div className="fix-margin"><FaPhone />{' '}{''}Hotline: 093 463 83 33</div>
            <div className="fix-margin"><FaMailBulk />{' '}{''}Gmail: vpdoanhvnh@gmail.com</div>
          </Col>
          <Col md={4} className="item-footer">

            <div className="text-bold">
              Tải ứng dụng Small Giving trên
          </div>
            <div>
              <li md={6} className="display-bf">
                <div >
                  <img src="https://static.mservice.io/img/tai-appstore.png" width="130" class="img-fluid" alt=""></img>
                </div>
              </li>
              <li md={6} className="display-bf">
                <div >
                  <img src="https://static.mservice.io/img/tai-google-play.png" width="130" class="img-fluid" alt=""></img>
                </div>
              </li>
            </div>

          </Col>
        </Row>
        <div className="end-foot">
          @Copyright MisLab 2020
      </div>
      </div>


    );
  };
}
export default Footer;
