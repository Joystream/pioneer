/* eslint-disable */
import * as React from 'react';
const reactI18Next = jest.createMockFromModule('react-i18next');

const hasChildren = (node) =>
  node && (node.children || (node.props && node.props.children));

const getChildren = (node) =>
  node && node.children ? node.children : node.props && node.props.children;


const renderNodes = (reactNodes) => {
  if (typeof reactNodes === 'string') {
    return reactNodes;
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key];
    const isElement = React.isValidElement(child);

    if (typeof child === 'string') {
      return child;
    }
    if (hasChildren(child)) {
      const inner = renderNodes(getChildren(child));
      return React.cloneElement(child, { ...child.props, key: i }, inner);
    }
    if (typeof child === 'object' && !isElement) {
      return Object.keys(child).reduce(
        (str, childKey) => `${str}${child[childKey]}`,
        '',
      );
    }

    return child;
  });
};

reactI18Next.useTranslation = () => {
  return {
    t: (str, opt) => `${str}${opt ? ` ${Object.values(opt).join(' ')}` : ''}`,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  };
};

reactI18Next.Trans = ({ children }) => renderNodes(children);
module.exports = reactI18Next;
