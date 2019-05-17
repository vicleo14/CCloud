import React from 'react';
import FSRoot from 'react-fs-tree';

const onSelect = (node) => {
    node.toggleOpen();
    node.deselect();
}

class Sidebrowser extends React.Component {
    render() {
        return (
            <div id="sidebrowser">
                < FSRoot onSelect={onSelect} childNodes={[
                    { name: 'file' },
                    { name: 'added file', mode: 'a' },
                    { name: 'deleted file', mode: 'd' },
                    { name: 'modified file', mode: 'm' },
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