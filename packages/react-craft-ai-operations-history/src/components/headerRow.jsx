import { craftAiStanley } from '../utils/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'react-emotion';
import { TYPES } from 'craft-ai/lib/constants';
import { computeCellWidth, INIT_AGENT_NAME_CELL_WIDTH } from './table';
import {
  faCalendar,
  faClock,
  faGlobeAfrica,
  faStopwatch,
  faTachometerAlt,
  faTags
} from '@fortawesome/free-solid-svg-icons';

const PropertyTypeIcons = {
  [TYPES.continuous]: <FontAwesomeIcon icon={ faTachometerAlt } />,
  [TYPES.enum]: <FontAwesomeIcon icon={ faTags } />,
  [TYPES.timezone]: <FontAwesomeIcon icon={ faGlobeAfrica } />,
  [TYPES.time_of_day]: <FontAwesomeIcon icon={ faClock } />,
  [TYPES.day_of_week]: <FontAwesomeIcon icon={ faCalendar } />,
  [TYPES.day_of_month]: <FontAwesomeIcon icon={ faCalendar } />,
  [TYPES.month_of_year]: <FontAwesomeIcon icon={ faCalendar } />
};

const CustomWidthTh = styled('th')`
  width: ${({ width }) => computeCellWidth(width)}px !important;
`;

const HeaderCell = ({ output, property, type }) => (
  <CustomWidthTh width={ property.length }>
    <span>
      {PropertyTypeIcons[type]} {property}
    </span>
    {output ? <small>output</small> : null}
  </CustomWidthTh>
);
HeaderCell.propTypes = {
  property: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  output: PropTypes.bool.isRequired
};

const HeaderRow = ({ isGenerator, properties, agentColumnWidth }) => (
  <tr>
    <th>
      <span>
        <FontAwesomeIcon icon={ faStopwatch } /> timestamp
      </span>
    </th>
    {
      isGenerator ? (
        <th width={ agentColumnWidth }>
          <span>
            <FontAwesomeIcon icon={ craftAiStanley } /> agent_id
          </span>
        </th>
      ) : null
    }
    {properties.map((property, index) => (
      <HeaderCell key={ index } { ...property } />
    ))}
    <th />
  </tr>
);

HeaderRow.defaultProps = {
  agentColumnWidth: INIT_AGENT_NAME_CELL_WIDTH,
  isGenerator: false
};

HeaderRow.propTypes = {
  agentColumnWidth: PropTypes.number,
  properties: PropTypes.array.isRequired,
  isGenerator: PropTypes.bool
};

export default HeaderRow;
