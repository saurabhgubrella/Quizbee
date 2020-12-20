import React, {Component} from "react";
import "./CSS/style.css";
import quizServices from "./quizServices/MCQ.js";
import Result from "./component/Result";
import QuestionBox from "./component/QuestionBank";


class QuizBee extends Component {
  state ={
    questionBank:[],
    score:0,
    responses: 0
  };
  getQuestions =() => {
    quizServices().then(question =>{
      this.setState({
        questionBank: question
      });
    });
  };
computeAnswer = (answer,correctAnswer)=>{
  if (answer===correctAnswer){
    this.setState({
      score:this.state.score +1
    });
  }
  this.setState({
    responses: this.state.responses <5?this.state.responses + 1 : 5
  });
};
playAgain =()=> {
  this.getQuestions();
  this.setState({
    score: 0,
    responses: 0
  });
};
componenetDidMount(){
  this.getQuestions();
}
render(){
  return(
    <div className="container">
      <div className="title">QuizBee</div>
      {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(
        ({question, answer , correct, questionId}) =>(
          <QuestionBox
          question={question}
          options={answer}
          key={questionId}
          selected={answer => this.computeAnswer(answer, correct)}/>
        )
      )}
      {this.state.responses === 5 ? (
        <Result score={this.state.score} playAgain={this.playAgain} />
      ): null }
    </div>
  );
}
}
export default QuizBee;