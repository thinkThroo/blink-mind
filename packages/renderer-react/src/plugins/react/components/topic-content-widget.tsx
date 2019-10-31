import * as React from 'react';
import styled from 'styled-components';
import {
  Controller,
  Model,
  TopicWidgetDirection,
  KeyType
} from '@blink-mind/core';
import { BaseProps } from '../../../components/BaseProps';
import debug from 'debug';

const log = debug('node:topic-content-widget');

const DropArea = styled.div`
  height: 20px;
  width: 100%;
`;

interface TopicContentProps {
  dragEnter?: boolean;
  isRoot?: boolean;
}

const TopicContent = styled.div<TopicContentProps>`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  white-space: pre-line;
  cursor: pointer;
  overflow: hidden;
  //@ts-ignore
  padding: ${props => (props.isRoot ? '6px 0 6px 20px' : '6px 20px 6px 0')};
`;

interface Props extends BaseProps {
  draggable: boolean;
}

interface State {
  dragEnter: boolean;
}

let dragSrcItemKey: KeyType = null;

export class TopicContentWidget extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  onDragStart = e => {
    log('onDragStart');
    dragSrcItemKey = this.props.topicKey;
    e.stopPropagation();
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragEnter = e => {};

  onDragLeave = e => {};

  onDrop = e => {
    log('onDrop');
  };

  onClick = () => {};

  onDoubleClick = () => {};

  render() {
    const props = this.props;
    const { dir, draggable, saveRef, topicKey ,controller} = props;
    log('saveRef:',saveRef);
    return (
      <div>
        <DropArea />
        <TopicContent
          isRoot={dir === TopicWidgetDirection.ROOT}
          // dragEnter={this.state.dragEnter}
          draggable={draggable}
          ref={saveRef(`content-${topicKey}`)}
          onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
        >
          {controller.run('renderBlocks',{props})}
        </TopicContent>
      </div>
    );
  }
}
