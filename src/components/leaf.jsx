import _ from 'lodash';
import classnames from 'classnames';
import DecisionRulesPopover from '../widgets/decisionRulesPopover';
import PopOver from '../widgets/popover';
import PropTypes from 'prop-types';
import React from 'react';
import { NODE_HEIGHT, NODE_WIDTH } from './constants';
import { Overlay } from 'react-overlays';

class Leaf extends React.Component {
  state = {
    showingPopover: false,
    tooltipOnPovover: false,
    popoverRef: null,
    placement: 'bottom'
  }

  showPopover = () => {
    this.setState({ showingPopover: true, popoverRef: this.leafRef });
  }

  hidePopover = () => {
    this.setState({ showingPopover: false, placement: 'bottom' });
  }

  setLeafRef = (input) => {
    this.leafRef = input;
  }

  updatePopOverPlacement = (changePlacement) => {
    if (changePlacement) {
      this.setState({ placement: 'top' });
    }
  }

  setMouseOnToolTip = (onPopover) => {
    this.setState({ tooltipOnPovover: onPopover });
  }

  render() {
    const { node, text, color } = this.props;
    const rendererText = _.isNull(text) ?
      '' :
      (_.isFinite(text) ? parseFloat(text.toFixed(3)).toString() : text);

    const renderList = node ? (
      <DecisionRulesPopover
        node={ node }
        context={ this.props.configuration.context }
        title={ rendererText }
        color={ color } />
    ) : null;
    return (
      <div>
        <div
          ref={ this.setLeafRef }
          onMouseEnter={ this.showPopover }
          onMouseLeave={ this.hidePopover }
          className={ classnames('craft-nodes', { 'empty-node': _.isNull(text) }) }
          style={{ top: node.y - NODE_HEIGHT / 3, left: node.x - NODE_WIDTH / 2, backgroundColor: color }}>
          { rendererText }
        </div>
        <Overlay
          show={ this.state.showingPopover || this.state.tooltipOnPovover }
          placement={ this.state.placement }
          target={ this.state.popoverRef }>
          <PopOver
            onTooltip={ this.setMouseOnToolTip }
            onPlacementUpdated={ this.updatePopOverPlacement }>
            { renderList }
          </PopOver>
        </Overlay>
      </div>
    );
  }
}

Leaf.propTypes = {
  node: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  color: PropTypes.string.isRequired,
  configuration: PropTypes.object
};

export default Leaf;
