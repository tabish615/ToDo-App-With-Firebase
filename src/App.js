import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(){
    super();
    this.state = {
      arr:[],
      barr:[],
      data: null,
      ebtn:[]
    }
  }

  componentDidMount(){
    firebase.database().ref('item').on('value', snap => {
      var barr = [];
      var item = snap.val();
      var task = [];
      var key = [];
      var ebtn = [];
      for (var i in item){
        task.push(item[i].task);
        key.push(i);
        barr.push(true);
        ebtn.push('Edit');
      }
      this.setState({
        arr : task,
        key : key,
        barr : barr,
        ebtn: ebtn
      })
    })
  }

  submit(){
    var task = this.refs.task.value;
    if(task) {
      firebase.database().ref('item').push({task : task})
      this.refs.task.value = "";
    }
    else{
      alert('Write something task');
    }
  }

  delete(i){
    firebase.database().ref('item').child(this.state.key[i]).remove();
  }

  edit(i, data){
    var barr = this.state.barr.slice(0);
    var ebtn = this.state.ebtn.slice(0);
    if(barr[i]){
      barr.splice(i,1,false);
      ebtn.splice(i,1,"Cancel"); 
      this.setState({
        ebtn: ebtn,
        barr: barr,
        data: data,
      });
    }
    else{
      barr.splice(i,1,true);
      ebtn.splice(i,1,"Edit");
      this.setState({
        ebtn:ebtn,
        barr:barr,
      });
    }
  }

  onChange(data){
    var edit = data.target.value;
    this.setState({
      data : edit
    });
  }

  changed(i){
    if(this.state.data){
      firebase.database().ref('item').child(this.state.key[i]).set({
        task: this.state.data,
      })
    }
    else{
      alert('Write something or delete this task');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ToDo App with Database</h1>
          <form action="javascript:void(0);">
            <input placeholder="Enter Task...." ref="task" autoFocus />
            <button type="submit" onClick={this.submit.bind(this)}>Add</button>
          </form>
        </header>
        {this.state.arr &&
        this.state.arr.map((data, i)=> {
          return(
            <ul  type='none'>
              <li>
                {this.state.barr[i] ?
                <span>{data}</span>
                :
                <form action="javascript:void(0);">
                  <input className='edit' value={this.state.data} autoFocus onChange={this.onChange.bind(this)}/>
                  <button className='btn1' type='submit' onClick={this.changed.bind(this, i)}>Enter</button>
                </form> 
                }
                <span>
                  <button className='btn' onClick={this.delete.bind(this, i)}>Delete</button>
                  <button className='btn' onClick={this.edit.bind(this, i, data)}>{this.state.ebtn[i]}</button>
                </span>  
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default App;
