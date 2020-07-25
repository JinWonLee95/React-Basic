import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import './App.css';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

// import { configure } from '@testing-library/react';

//상위 -> 하위는 props 사용 하위 -> 상위는 event 사용

class App extends Component {
  constructor(props){
    // 컴퍼넌트가 실행될때 render보다 먼저 실행돼서 초기화 시키려면 여기 안에 작성
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
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
  getReadContent(){
    var i=0;
    while (i < this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
      i = i+1;
    }
  }

  getContent(){
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        // setState로 새로운 content 원소 추가
        this.max_content_id = this.max_content_id + 1;

        // push는 원본을 수정해서 별로 좋은 방법은 아님 concat 사용하는걸 추천
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        // concat처럼 복사해서 새로운 Array로 만들어 사용
        // Objcet.assign({},옮길 Object) 도 같은 기능
        // 이렇게 immutable 사용(원본을 바꾸지 않고 복제해서 그것을 사용) 검색해서 더 알기
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents: newContents
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
          function(_id, _title, _desc){
            var _contents = Array.from(this.state.contents);
            var i =0;

            while(i < _contents.length){
              if(_contents[i].id === _id){
                _contents[i] = {id : _id, title:_title, desc:_desc};
                break;
              }
              i = i+1;
            }
            this.setState({
              contents: _contents
          });
          console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }

    return _article;
  }

  //props나 state가 바뀌면 render가 다시 호출된다(화면이 새로고침된다)
  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            //props는 read only이기 때문에 setState 함수를 사용해야지 변경가능
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
        ></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({mode:_mode});
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;