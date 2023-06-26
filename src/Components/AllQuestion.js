import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "./Loader";
import Question from "./Question";
import Result from "./Result";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class AllQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuestions: [],
      currentQuestion: 0,
      scores: [],
      gameOver: false,
      total: 0,
      totalQuestions: 10,
    };
  }

  handleNext = (answers) => {
    let currentIndex = this.state.currentQuestion;
    let correct_answer =
      this.state.allQuestions[this.state.currentQuestion].correct_answer;

    this.setState({
      currentQuestion: currentIndex + 1,
      scores: [
        ...this.state.scores,
        {
          question: this.state.allQuestions[currentIndex].question,
          correctAnswer: correct_answer,
          youSelected: answers,
        },
      ],
    });

    if (correct_answer === answers) {
      return this.setState({ total: this.state.total + 1 });
    }
  };

  checkResults = () => {
    this.setState({ gameOver: true });
  };

  componentDidMount() {
    const { category, difficulty } = this.props.location.state;

    if (this.state.allQuestions.length > 0) {
      return;
    } else {
      let url = `https://opentdb.com/api.php?amount=${this.state.totalQuestions}&category=${category.id}&difficulty=${difficulty}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            allQuestions: data.results,
          })
        );
    }
  }

  render() {
    if (!this.state.allQuestions.length) {
      return <Loader />;
    }

    if (!this.state.gameOver) {
      return (
        <Question
          totalQuestions={this.state.totalQuestions}
          index={this.state.currentQuestion}
          current={this.state.allQuestions[this.state.currentQuestion]}
          handleNext={this.handleNext}
          checkResults={this.checkResults}
        />
      );
    }

    return (
      <Result
        scores={this.state.scores}
        total={this.state.total}
        handleReset={this.handleReset}
      />
    );
  }
}

export default withRouter(AllQuestion);
