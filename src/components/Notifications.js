import React from 'react';
import PropTypes from 'utils/propTypes';

import { Media } from 'reactstrap';

import Avatar from 'components/Avatar';

const Notifications = ({ notificationsData }) => {
  return (
    notificationsData &&
    notificationsData.length &&
    notificationsData.map(({ id, TieuDeThongBao, NoiDung, ThoiGian }) => (
      <Media key={id} className="pb-2">
        {/*<Media left className="align-self-center pr-3">*/}
        {/*  <Avatar tag={Media} object src={avatar} alt="Avatar" />*/}
        {/*</Media>*/}
        <Media body middle className="align-self-center">
          <h6>{TieuDeThongBao}</h6>
          <p>{NoiDung}</p>
        </Media>
        <Media right className="align-self-center">
          <small className="text-muted">{ThoiGian}</small>
        </Media>
      </Media>
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
