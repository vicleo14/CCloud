import React from 'react';
import FSRoot from 'react-fs-tree';

const onSelect = (node) => {
  node.toggleOpen();
  node.deselect();
}

class Sidebrowser extends React.Component {
  render() {
    return (
      <div id="sidebrowser" className="d-flex justify-content-start">
        < FSRoot onSelect={onSelect} childNodes={[
          { name: 'file' },
          { name: 'added file' },
          { name: 'deleted file' },
          { name: 'modified file' },
          {
            name: 'folder', childNodes: [
              { name: 'foo' },
              { name: 'bar' },
              { name: 'baz' },
            ]
          }
        ]} />
      </div>
    );
  }
}

export default Sidebrowser;