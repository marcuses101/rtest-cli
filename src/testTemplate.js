export default function testTemplate(componentName, isRouterTest) {
  const test = isRouterTest
    ? `import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import ${componentName} from './${componentName}';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><${componentName} /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  `
    : `import React from 'react';
import ReactDOM from 'react-dom';
import ${componentName} from './${componentName}';

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<${componentName} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  `;
  return test;
}
