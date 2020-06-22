import React, { Component } from 'react';
import Page from 'components/Page';
import {
  Card,
  CardBody,
  CardHeader,
  Col, Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody, ModalFooter,
  ModalHeader,
  Row, Button, Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Media from 'reactstrap/es/Media';
import NumberFormat from "react-number-format";
import {
  MdBubbleChart,
  MdInsertChart,
  MdAlarm,
  MdShowChart,
} from 'react-icons/md';
import { IconWidget, NumberWidget } from 'components/Widget';
import NGND from 'assets/img/NGND.jpg';
import Convert from "../utils/ConvertUrlPra"
import Cookies from 'js-cookie';


class NewsDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalParent: false,
      modal: false,
      idTinTuc: "",
      dataTinTuc: [],
      SoDiTK: "",
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
      idNguoiDung: ""
    }
  }

  componentWillMount() {
    let params = Convert.urlParams(this.props.location.search);
    this.setState({ idTinTuc: params.idTinTuc })
  }

  componentDidMount() {
    this.getInfo();
    this.getUser();
  }

  getInfo() {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idTin: this.state.idTinTuc
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/trangquantri/admin/tintuc/select.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataTinTuc: data
        })
      })
  }

  getUser = () => {
    if (this.state.token !== "") {
      let config = {
        method: "POST",
        body: JSON.stringify({
          token: this.state.token
        })
      }
      fetch(`http://smallgiving.cf/mobileapp/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idNguoiDung: data.idNguoiDung
          }, () => this.getProfile())
        })
    }
  }

  getProfile = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idNguoiDung: this.state.idNguoiDung
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Thongtin/thongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.SoDuTK
        })
      })
  }

  handleOpenModalParent() {
    this.setState({
      modalParent: true,
    });
  }

  handleCloseModalParent() {
    this.setState({
      modalParent: false,
    });
  }

  handleOpenModal() {
    this.setState({
      modal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      modal: false,
    });
  }

  render() {
    // const item = this.props.item;
    let { dataTinTuc } = this.state
    return (
      <Page className="bcquyengop"
        title="Tin Tức/ Chi tiết tin tức"
        breadcrumbs={[
          { name: 'Tin Tức/ Chi tiết tin tức' },

        ]}>
        <h1 className="text-center title-detail">{dataTinTuc.TenTin}</h1>
        <Row>
          <Col lg="1"></Col>
          <Col lg="10" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                <Media
                  object
                  src={dataTinTuc.Anh}
                  className="rounded mr-2 mb-2"
                  style={{ width: '100%', height: '100%' }}
                />

                <div className="mt-4">
                  {dataTinTuc.NoiDung}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="1"></Col>
        </Row>



      </Page>
    );
  }
}

export default NewsDetailPage;
