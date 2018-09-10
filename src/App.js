import React, { Component } from 'react';
import logo from './logo.svg';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Item from './Item';
import Target from './Target';
import './App.css';
import Card from './Card';
import update from 'immutability-helper';

class App extends Component {

  state = {
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
    ],
    cards: [
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      },
      {
        id: 5,
        text:
          'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      },
      {
        id: 6,
        text: '???',
      },
      {
        id: 7,
        text: 'PROFIT',
      },
    ],
  }

  deleteItem = (id) => {
    console.log("dragging item#" +id+ " to trash");
    this.setState(prevState => {
        let items = prevState.items;
        const index = items.findIndex(item => item.id === id);
        items.splice(index,1);

        return {items};
    });
  }

  moveCard = (dragIndex, hoverIndex) => {
      const {cards} = this.state
      const dragCard = cards[dragIndex]

      this.setState(
          update(this.state,{
            cards : {
              $splice: [[dragIndex,1],[hoverIndex,0, dragCard]],
            },
          }),
        )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div className="App-container">
            <div className="Item-container">
              {this.state.items.map((item, index) => (
                  <Item key={item.id} item={item} handleDrop={(id) => this.deleteItem(id)}/>
                ))}
            </div>
            <Target/>

            <div className="Card-container">
            <p>Example 2</p>
            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                moveCard={this.moveCard}
              />
            ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App) ;
