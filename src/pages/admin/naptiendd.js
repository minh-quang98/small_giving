import Page from 'components/admin/Page';
import React from 'react';
import Naptienthem from 'pages/admin/naptienddthem';
import { Card, CardBody, Col, Row, Table, Badge } from 'reactstrap';
const tableTypes = ['hover'];
const dataError = [
    {
        e1: "",
        e2: "",
        e3: "Chưa có dữ liệu",
        e4: "",
        e5: "",
    }
]
class naptien extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataError: [],
            dataerror: false,
            showModalThem: false,
        };
    }
    handleShowModalThem = () => {
        this.setState({
            showModalThem: true,
        });
    };
    handleCloseModalThem = () => {
        this.setState({
            showModalThem: false,
        });
    };
    componentDidMount() {
        this.getdata();
    }

    getdata = async () => {
        fetch('http://smallgiving.cf/mobileapp/trangquantri/shownaptiendd.php')
            .then(response => response.json())
            .then(data => {
                if (data.message === "No post found") {
                    this.setState({ dataerror: true, dataError: dataError });
                } else {
                    this.setState(
                        {
                            dataerror: false,
                            data: data,
                        },
                        () => console.log('kiemtradulieu', this.state.data),
                    );

                }

            });
    };
    toggle = modalType => () => {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }

        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
    };
    render() {
        return (
            <Page
                className="naptien"
                title="Nạp tiền quỹ điểm danh"
                breadcrumbs={[
                    { name: 'quản trị giao dịch' },
                    { name: 'nạp tiền quỹ điểm danh', active: true },
                ]}
            >
                {tableTypes.map((tableType, index) => (
                    <Row key={index}>
                        <Col>
                            <Card className="mb-3">
                                <CardBody>
                                    <Naptienthem
                                        show={this.state.showModalThem}
                                        onHide={this.handleCloseModalThem}
                                        size="lg"
                                        className={this.props.className}
                                    />
                                    <Badge
                                        color="danger"
                                        pill
                                        className=" mb-3 p-2 can-click"
                                        onClick={this.handleShowModalThem}
                                    >
                                        + Thêm mới
                  </Badge>
                                    <Table {...{ [tableType || 'hover']: true }}>
                                        <thead>
                                            <tr className="table-danger">
                                                <th>ID</th>
                                                <th>Quỹ điểm danh</th>
                                                <th>Thời gian</th>
                                                <th>Số tiền nạp</th>
                                                <th>CTV thưc hiện</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.dataerror ?
                                                this.state.dataError.map(Item => {
                                                    return (
                                                        <tr>
                                                            <td>{Item.e1}</td>
                                                            <td>{Item.e2}</td>
                                                            <td>{Item.e3}</td>
                                                            <td>{Item.e4}</td>
                                                            <td>{Item.e5}</td>
                                                        </tr>
                                                    );
                                                }) : this.state.data.map(Item => {
                                                    return (
                                                        <tr>
                                                            <td>{Item.idGiaoDich}</td>
                                                            <td>{Item.TenDiemDanh}</td>
                                                            <td>{Item.ThoiGian}</td>
                                                            <td>{Item.SoTien}</td>
                                                            <td>{Item.CTV}</td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Page>
        );
    }
}
export default naptien;
