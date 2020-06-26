import React from 'react';
import PropTypes from 'utils/propTypes';

import bn from 'utils/bemnames';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FaHandHoldingHeart } from 'react-icons/fa';

// import Typography from './Typography';

const bem = bn.create('page');

const Page = ({
  title,
  breadcrumbs,
  tag: Tag,
  className,
  children,
  ...restProps
}) => {
  const classes = bem.b('px-3', className);

  return (
    <Tag className={classes} {...restProps}>
      <div className={bem.e('header')}>
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <Link to={{
              pathname: '/admin/trangchu',

            }}><FaHandHoldingHeart size="1.5em" /></Link>

            <BreadcrumbItem><Link to={{
              pathname: '/admin/trangchu',

            }}>Small Giving</Link></BreadcrumbItem>
            {breadcrumbs.length &&
              breadcrumbs.map(({ name, active, link }, index) => (
                <BreadcrumbItem key={index} active={active}>

                  <Link to={{
                    pathname: link,

                  }}>{name}</Link>
                </BreadcrumbItem>
              ))}
          </Breadcrumb>
        )}
      </div>
      {children}
    </Tag>
  );
};

Page.propTypes = {
  tag: PropTypes.component,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  className: PropTypes.string,
  children: PropTypes.node,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      active: PropTypes.bool,
    })
  ),
};

Page.defaultProps = {
  tag: 'div',
  title: '',
};

export default Page;
