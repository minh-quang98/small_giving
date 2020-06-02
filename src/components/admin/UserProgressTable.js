import React from 'react';
import PropTypes from 'utils/propTypes';
import { MdPersonPin } from 'react-icons/md';
import { Table, Progress } from 'reactstrap';
import {
  Col, Row, Media,
} from 'reactstrap';
import Avatar from 'components/Avatar';
import withBadge from 'hocs/withBadge';
import user4Image from 'assets/img/users/100_4.jpg';

const tableTypes = ['hover'];
const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

class UserProgressTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    fetch('http://smallgiving.cf/mobileapp/trangquantri/nguoidungmoi.php')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data: data,
        }, () => console.log('kiemtradulieu', this.state.data),
        );
      });
  };
  render() {
    return (
      <Row>
        {tableTypes.map((tableType, index) => (

          <Table {...{ [tableType || 'hover']: true }}>
            <thead>
              <tr className="text-capitalize align-middle text-center">
                <th><MdPersonPin size={25} /></th>
                <th>Họ tên</th>
                <th>Thời gian</th>
                <th>Huy hiệu</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((Item, index) => {
                return (
                  <tr>
                    <td className="align-middle text-center"><AvatarWithBadge src={user4Image} /></td>
                    <td className="align-middle text-center">{Item.TenNguoiDung}</td>
                    <td className="align-middle text-center">{Item.ThoiGian}</td>
                    <td className="align-middle text-center">{Item.HuyHieu}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ))}
      </Row>
    );
  }
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(

  ),
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserProgressTable;
