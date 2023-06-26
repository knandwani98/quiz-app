import React, { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answersTicked: "",
      allOptions: null,
    };
  }

  getRandomOption = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  handleAnswers = (ans) => {
    return this.setState({
      answersTicked: ans,
    });
  };

  saveResult = (ans) => {
    let result = this.state.answersTicked;
    this.props.handleNext(result);

    this.setState({
      answersTicked: "",
    });
  };

  componentDidMount() {
    const { current } = this.props;

    this.setState({
      allOptions: this.getRandomOption([
        current.correct_answer,
        ...current.incorrect_answers,
      ]),
    });
  }

  componentDidUpdate(prevProps) {
    const { current } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        allOptions: this.getRandomOption([
          current.correct_answer,
          ...current.incorrect_answers,
        ]),
      });
    }
  }

  render() {
    const { current, index, checkResults, totalQuestions } = this.props;
    // console.log(current.correct_answer, this.state.answersTicked);

    return (
      <section className="question container">
        <span className="breadcrum">
          Question {index + 1}/{totalQuestions}
          <div className="bar">
            <div
              className="liquid"
              style={{ width: (index + 1) * totalQuestions + "%" }}
            ></div>
          </div>
        </span>
        <h2
          dangerouslySetInnerHTML={{
            __html: current.question,
          }}
        ></h2>

        <ul className="answers">
          {/* All Incorrect Answers */}
          {this.state.allOptions &&
            this.state.allOptions.map((option) => {
              return (
                <li key={option}>
                  <button
                    className={
                      this.state.answersTicked === option ? "active" : ""
                    }
                    onClick={() => this.handleAnswers(option)}
                    dangerouslySetInnerHTML={{
                      __html: option,
                    }}
                  ></button>
                </li>
              );
            })}
        </ul>

        {this.state.answersTicked && (
          <div className="flex next">
            {index < totalQuestions - 1 ? (
              <button
                onClick={() => this.saveResult(this.state.answersTicked)}
                className="start"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  this.saveResult(this.state.answersTicked);
                  checkResults();
                }}
                className="result start "
              >
                Results
              </button>
            )}
          </div>
        )}
      </section>
    );
  }
}

export default Question;
