import React from 'react';
import PropTypes from 'utils/propTypes';

import { Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar';
import parse from 'html-react-parser'
const Notifications = ({ notificationsData }) => {
  return (
    notificationsData &&
    notificationsData.length &&
    notificationsData.map(({ idThongBao, TieuDeThongBao, NoiDung, ThoiGian }) => (
      <div className="limit-noti">
        <Link to={{
          pathname: '/news-detail',
          search: `?idTinTuc=${idThongBao}`,
          // state: {
          //   idHoatDong: id
          // }
        }}>
          <Media key={idThongBao} className="pb-2 fixx-noti">
            {/*<Media left className="align-self-center pr-3">*/}
            {/*  <Avatar tag={Media} object src={avatar} alt="Avatar" />*/}
            {/*</Media>*/}
            <Media body middle className="align-self-center">
              <h6>{TieuDeThongBao}</h6>
              <div className="text-muted">{ThoiGian}</div>
              <div className="content-noti">{parse(NoiDung)}</div>
            </Media>
            <Media right className="align-self-center">

            </Media>
          </Media>
        </Link>
      </div>
    ))
  );
};

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.ID,
      TieuDeThongBao: PropTypes.node,
      NoiDung: PropTypes.node,
      ThoiGian: PropTypes.date,
    })
  ),
};

Notifications.defaultProps = {
  notificationsData: [],
};

export default Notifications;
