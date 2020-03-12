import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';

import NumberFormat from 'react-number-format';
import moment from 'moment';
import Pagination from 'react-bootstrap/Pagination'


function createData(stt, ngayThang, tenChuongtrinh, soTien) {
  return {stt, ngayThang, tenChuongtrinh, soTien};
}

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listdata: [
        createData('1', '02/02/2020', 'Người già neo đơn', '5000000'),
        createData('2', '01/03/2020', 'Giúp đỡ trẻ em chất độc màu da cam', '20000000'),
        createData('3', '01/09/2020', 'Những tấm lòng cao cả', '1000000'),
      ],
      page: 0,
      pageSize: 10,
      totalItem: 0,
    }
  }

  handleChangePage = page => {
    this.setState(
      {
        pageNumber: page - 1
      },
      () => {
        // this.getListContractFromAPI();
      }
    );
  };

  render() {
    let {listdata, page, totalItem, pageSize} = this.state
    return (
      <Page title="Lịch sử giao dịch">
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
                <Table bordered responsive>
                  <thead>
                  <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Ngày tháng</th>
                    <th className="text-center">Tên chương trình</th>
                    <th className="text-center">Số tiền</th>
                  </tr>
                  </thead>
                  {listdata.map((item, index) => (
                    <tbody>
                    <tr>
                      <th scope="row" className="text-center">{item.stt}</th>
                      <td className="text-center">{moment(item.ngayThang).format("DD/MM/YYYY")}</td>
                      <td>{item.tenChuongtrinh}</td>
                      <td className="text-right"><NumberFormat value={item.soTien} displayType={'text'} thousandSeparator={true} suffix={'VNĐ'} /></td>
                    </tr>
                    </tbody>
                  ))}
                  <div className="pagination-right">
                    <Pagination>
                      <Pagination.Prev />
                      <Pagination.Item>{totalItem}</Pagination.Item>
                      <Pagination.Next />
                    </Pagination>
                  </div>
                </Table>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }

};

export default HistoryPage;
