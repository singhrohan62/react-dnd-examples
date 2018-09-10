import React,{Component} from 'react';
import {DragSource} from 'react-dnd';
import './App.css'
const itemSource = {
	beginDrag(props)
	{
		return props.item;
	},

	endDrag(props, monitor, component)
	{
		if(!monitor.didDrop()){ console.log(monitor.didDrop());return ;}
		return props.handleDrop(props.item.id);
	}
}

function collect (connect, monitor)
	{
		return {
			connectDragSource : connect.dragSource(),
			connectDragPreview : connect.dragPreview(),
			isDragging : monitor.isDragging(),
		}
	}

class Item extends Component {
	
	render(){
		const {isDragging, connectDragSource, item} = this.props;
		const opacity = isDragging ? 0.5 : 1;
		return connectDragSource(
				<div className="item" style={{opacity}}>
					<span>{item.name}</span>
				</div>
			)
	}
}

export default DragSource('items', itemSource, collect)(Item);