/*
 * 文件说明: 将数据组件的渲染异常限制在当前卡片内，保留相邻内容和页面导航。
 */
import React from 'react';

export default class DataBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('Data component failed', error, info.componentStack);
  }

  render() {
    return this.state.failed ? 'No data' : this.props.children;
  }
}
