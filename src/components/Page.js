import React from 'react';
import PropTypes from 'utils/propTypes';

import bn from 'utils/bemnames';

import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Typography from './Typography';
import { FaHome } from 'react-icons/fa';
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
        {/* {title && typeof title === 'string' ? (
          <Typography type="h3" className={bem.e('title')}>
            {title}
          </Typography>
        ) : (
            title
          )} */}
        {breadcrumbs && (
          <Breadcrumb className={bem.e('breadcrumb')}>
            <BreadcrumbItem><Link to={{
              pathname: '/',

            }}><FaHome /></Link></BreadcrumbItem>
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
