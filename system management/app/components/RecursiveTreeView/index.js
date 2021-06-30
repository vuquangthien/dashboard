import React, { useState, useEffect } from 'react';
import { ExpandMore, ChevronRight } from '@material-ui/icons';
import TreeItem from '@material-ui/lab/TreeItem';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { TreeView } from '@material-ui/lab';
import PropTypes from 'prop-types';

export function RecursiveTreeView(props) {
  const { data, selectedList, onChange, checkAll } = props;
 
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    if (!selectedList || !selectedList.length) {
      setSelected([]);
    }
  }, [selectedList]);
  useEffect(() => {
    let allNode = [];
    if (checkAll) {
      // debugger;
      if (Array.isArray(data) && data.length) {
        data.forEach(node => {
          const childs = getChildById(node, node.id);
          allNode = allNode.concat(childs);
        });
      } else {
        allNode = getChildById(data, data.id);
      }
    }
    setSelected(allNode);
    if (typeof onChange === 'function') {
      onChange(allNode);
    }
  }, [checkAll]);
  // console.log('selected', selected);
  function getChildById(node, id) {
    let array = [];
    function getAllChild(nodes = null) {
      if (nodes === null) return [];
      array.push(nodes);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach(node => {
          array = [...array, ...getAllChild(node)];
          array = array.filter(
            (v, i) => array.findIndex(item => item.id === v.id) === i,
          );
        });
      }
      return array;
    }

    function getNodeById(nodes, id) {
      if (nodes.id === id) {
        return nodes;
      }
      if (Array.isArray(nodes)) {
        for (let i = 0; i < nodes.length; i += 1) {
          if (getNodeById(nodes[i], id)) return getNodeById(nodes[i], id);
        }
      }
      if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach(node => {
          if (getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }
      return null;
    }
    return getAllChild(getNodeById(node, id));
  }
  function getOnChange(checked, nodes) {
    const allNode = getChildById(data, nodes.id);
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter(value => !allNode.find(item => item.id === value.id));
    array = array.filter(
      (v, i) => array.findIndex(item => item.id === v.id) === i,
    );
    setSelected(array);
    if (typeof onChange === 'function') {
      onChange(array);
    }
  }
  const renderTree = nodes =>
    Array.isArray(nodes) ? (
      nodes.map(node => renderTree(node))
    ) : (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some(item => item.id === nodes.id)}
                onChange={event =>
                  getOnChange(event.currentTarget.checked, nodes)
                }
                onClick={e => e.stopPropagation()}
              />
            }
            label={<>{nodes.displayName}</>}
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map(node => renderTree(node))
          : null}
      </TreeItem>
    );
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpanded={['0', '3', '4']}
      defaultExpandIcon={<ChevronRight />}
    >
      {renderTree(data)}
    </TreeView>
  );
}
RecursiveTreeView.defaultProps = {};

RecursiveTreeView.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  selectedList: PropTypes.array,
  checkAll: PropTypes.bool,
};

export default RecursiveTreeView;
