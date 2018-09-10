import React, { Component } from 'react';
import { DropTarget} from 'react-dnd';

function collect(connect, monitor) {
	return {
		connectDropTarget : connect.dropTarget(),
		hovered : monitor.isOver(),
		item : monitor.getItem(),
	}
}
class Target extends Component {
	render () {
		const { connectDropTarget, hovered, items} = this.props;
		const backgroundColor = hovered ? 'lightgreen':'white';
		return connectDropTarget(
				<div className='target' style ={{backgroundColor}}>Insert items here
				</div>
			)
	}
} 

export default DropTarget('items', {}, collect)(Target);