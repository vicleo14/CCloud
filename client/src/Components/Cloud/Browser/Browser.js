import React from 'react';
import Moment from 'moment';

import FileBrowser from 'react-keyed-file-browser';

class Browser extends React.Component {
  render() {
    return (
        <FileBrowser
        files={[
          {
            key: 'cat.png',
            modified: +Moment(),
            size: 1.5 * 1024 * 1024,
          },
          {
            key: 'kitten.png',
            modified: +Moment(),
            size: 545 * 1024,
          },
          {
            key: 'elephant.png',
            modified: +Moment(),
            size: 52 * 1024,
          },
        ]}
      />
    )
  }
}

export default Browser;