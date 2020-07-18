import React, { Component } from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';
import { configure } from '@testing-library/react';


class App extends Component {
  constructor(props){
    // 컴퍼넌트가 실행될때 render보다 먼저 실행돼서 초기화 시키려면 여기 안에 작성
    super(props);
    this.state = {
      mode: 'welcome',
      selected_content_id:2,
      subject:{title:'WEB', sub:'World Wide Web'},
      welcome:{title:'Welcome', desc:'Hello, React!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  //props나 state가 바뀌면 render가 다시 호출된다(화면이 새로고침된다)
  render() {
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }else if(this.state.mode === 'read'){
      var i=0;
      while (i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i+1;
      }
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC
          data={this.state.contents}
          onChangePage = {function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data = {this.state.contents}
        ></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
