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
import NumberFormat from 'react-number-format';
import {
  MdBubbleChart,
  MdInsertChart,
  MdAlarm,
  MdShowChart,
} from 'react-icons/md';
import { IconWidget, NumberWidget } from 'components/Widget';
import NGND from 'assets/img/NGND.jpg';
import Convert from '../utils/ConvertUrlPra';
import Cookies from 'js-cookie';
import { withSnackbar } from 'notistack';


class DonationDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalParent: false,
      modal: false,
      idHoatDong: '',
      dataHoatDong: [],
      SoDiTK: '',
      token: Cookies.get('small-giving') ? Cookies.get('small-giving') : '',
      idNguoiDung: '',
    };
  }

  componentWillMount() {
    let params = Convert.urlParams(this.props.location.search);
    this.setState({ idHoatDong: params.idHoatDong });
  }

  componentDidMount() {
    this.getInfo();
    this.getUser();
  }

  getInfo() {
    let config = {
      method: 'POST',
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong,
      }),
    };
    fetch(`http://smallgiving.cf/mobileapp/trangquantri/admin/hoatdong/select.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataHoatDong: data,
        });
      });
  }

  getUser = () => {
    if (this.state.token !== '') {
      let config = {
        method: 'POST',
        body: JSON.stringify({
          token: this.state.token,
        }),
      };
      fetch(`http://smallgiving.cf/mobileapp/checktoken.php`, config)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idNguoiDung: data.idNguoiDung,
          }, () => this.getProfile());
        });
    }
  };

  getProfile = () => {
    let config = {
      method: 'POST',
      body: JSON.stringify({
        idNguoiDung: this.state.idNguoiDung,
      }),
    };
    fetch(`http://smallgiving.cf/mobileapp/Thongtin/thongtin.php`, config)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          SoDuTK: data.SoDuTK,
        });
      });
  };

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

  onFollow = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong,
        idNhaHaoTam: this.state.idNguoiDung
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Theodoi/theodoi.php`, config)
      .then(res => res.json())
      .then(data => {
        if (data.message === "follow") {
          this.props.enqueueSnackbar('Theo dõi thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
        } else if (data.message === "unfollow") {
          this.props.enqueueSnackbar('Bỏ theo dõi thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
        } else {
          this.props.enqueueSnackbar(data.message, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'error',
          });
        }
      })
  }


  handleJoinActivity = () => {
    let config = {
      method: "POST",
      body: JSON.stringify({
        idHoatDong: this.state.idHoatDong,
        idNhaHaoTam: this.state.idNguoiDung
      })
    }
    fetch(`http://smallgiving.cf/mobileapp/Gopsuc/dangkigopsuc.php`, config)
      .then(res => res.json())
      .then(data => {
        if (data.message === "join") {
          this.props.enqueueSnackbar('Tham gia thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
        } else if (data.message === "unjoin") {
          this.props.enqueueSnackbar('Bỏ tham gia thành công !', {
            anchorOrigin: {
              vertical: "top",
              horizontal: "right"
            },
            variant: 'success',
          });
        } else {
          this.props.enqueueSnackbar(data.message, {
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
    // const item = this.props.item;
    let { dataHoatDong } = this.state;
    return (
      <Page className="bcquyengop"
        title="Quyên góp/Chi tiết quyên góp"
        breadcrumbs={[
          { name: 'Quyên góp/ Chi tiết quyên góp' },

        ]}>
        <h1 className="text-center title-detail">{dataHoatDong.TenHoatDong}</h1>
        <Row>
          <Col lg="1"></Col>
          <Col lg="10" md="12" sm="12" xs="12">
            <Card>
              <CardBody>
                {/* <Line data={chartjs.line.data} options={chartjs.line.options} /> */}
                <Media
                  object
                  src={dataHoatDong.Anh}
                  className="rounded mr-2 mb-2"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="align-center">
                  <Button
                    className="mt-2"
                    onClick={() => this.handleOpenModalParent()}
                    color="secondary"
                  >
                    Quyên góp
                        </Button>
                </div>


                <div className="mt-4">
                  {dataHoatDong.NoiDung}
                </div>
              </CardBody>
            </Card>
          </Col>


        </Row>


        <Col md="12" sm="12" xs="12">
          <Modal
            isOpen={this.state.modalParent}
            toggle={() => this.handleCloseModalParent()}
            className={this.props.className}>
            <ModalHeader toggle={() => this.handleCloseModalParent()}>
              Quyên góp cho: "{dataHoatDong.TenHoatDong}"
            </ModalHeader>
            <ModalBody className="d-flex flex-column align-items-center">
              <Media
                object
                src='img/Slide/money.png'
                className="rounded mr-2 mb-2 "
                style={{ width: '10%', height: '10%' }}
              />
              <div>Số tiền hiện tại bạn có là:</div>
              <div style={{ color: '#ae1f17' }}>{this.state.SoDuTK !== null ? this.state.SoDuTK : 0}</div>
              <Input className="w-50" type="text" placeholder="Nhập số tiền" />
              <Modal
                isOpen={this.state.modal}
                toggle={this.handleCloseModal}>
                <ModalHeader>Xác nhận quyên góp</ModalHeader>
                <ModalBody>Bạn xác nhận quyên góp chứ?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => {
                    this.handleCloseModal();
                    this.handleCloseModalParent();
                  }}>
                    Xác nhận
                  </Button>{' '}
                  <Button
                    color="primary"
                    onClick={() => this.handleCloseModal()}>
                    Không
                  </Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => this.handleOpenModal()}>
                Quyên góp
              </Button>{' '}
              <Button
                outline
                color="primary"
                onClick={() => this.handleCloseModalParent()}>
                <Link to={'/guides'}>
                  Nạp tiền
                </Link>
              </Button>
            </ModalFooter>
          </Modal>
        </Col>
      </Page>
    );
  }
}

export default withSnackbar(DonationDetailPage);
