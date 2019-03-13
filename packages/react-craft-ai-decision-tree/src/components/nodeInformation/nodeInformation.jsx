import DecisionRules from './decisionRules';
import { findSelectedNode } from '../../utils/utils';
import Prediction from './prediction';
import PropTypes from 'prop-types';
import React from 'react';
import semver from 'semver';
import Split from './split';
import Statistics from './statistics';
import styled from 'react-emotion';

const NodeInformationContainer = styled('div')`
  width: 200px;
  display: flex;
  flex-direction: column;
  float: left;
  z-index: 586;
  padding: 10px;
  position: relative;
  background-color: white;
  border-right: solid 1px;
`;

const NodeInformation = ({ updateSelectedNode, tree, selectedNodePath }) => {
  if (selectedNodePath) {
    const treeVersion = semver.major(tree._version);
    const treeData = tree.trees[Object.keys(tree.trees)[0]];
    const selectedNode = findSelectedNode(selectedNodePath, treeData);

    return (
      <NodeInformationContainer className='node-informations'>
        <div
          style={{
            flexDirection: 'column',
            flex: '1 1 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button style={{ cursor: 'pointer' }} onClick={ updateSelectedNode }>
              X
            </button>
          </div>
          <Prediction
            configuration={ tree.configuration }
            node={ selectedNode }
            treeVersion={ treeVersion }
          />
          <DecisionRules
            context={ tree.configuration.context }
            node={ selectedNode }
          />
          <Split context={ tree.configuration.context } node={ selectedNode } />
          <Statistics node={ selectedNode } />
        </div>
      </NodeInformationContainer>
    );
  }
  else {
    return <div className='node-informations' />;
  }
};

NodeInformation.propTypes = {
  updateSelectedNode: PropTypes.func.isRequired,
  tree: PropTypes.object.isRequired,
  selectedNodePath: PropTypes.string.isRequired
};

export default NodeInformation;