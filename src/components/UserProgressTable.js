import React from 'react';
import PropTypes from 'utils/propTypes';

import { Table, Progress } from 'reactstrap';

import Avatar from 'components/Avatar';

import withBadge from 'hocs/withBadge';
import Vang from "assets/img/logo/HHV.png"
import Bac from "assets/img/logo/HHB.png"
import Dong from "assets/img/logo/HHD.png"
import Media from 'reactstrap/es/Media';

const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

function HuyHieu(item) {
  switch (item) {
    case "0":
      return Vang;
    case "1":
      return Bac;
    case "2":
      return Dong;
  }
}

const UserProgressTable = ({ headers, usersData, ...restProps }) => {
  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {usersData.map(({ avatar, TenNguoiDung, SoTien }, index) => (
          <tr key={index}>
            <td className="align-middle text-center">
              {index > 2
                ? index + 1
                : HuyHieu(index)
              }

            </td>
            <td className="align-middle text-center">{TenNguoiDung}</td>
            <td className="align-middle text-center">{SoTien}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.date,
    })
  ),
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserProgressTable;
