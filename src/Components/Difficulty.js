import React, { Component } from "react";
import { Link } from "react-router-dom";

class Difficulty extends Component {
  constructor(props) {
    super();

    this.state = {
      difficulty: "",
    };
  }

  handleDifficulty = (level) => {
    return this.setState({ difficulty: level });
  };

  render() {
    let levels = ["easy", "medium", "hard"];
    const { category } = this.props;

    return (
      <section className="difficulty ">
        <h2 className="heading">
          Select Difficulty for <span className="accent">{category.name}</span>
        </h2>

        <div className="flex">
          {levels.map((level) => {
            return (
              <button
                onClick={() => this.handleDifficulty(level)}
                className={
                  this.state.difficulty === level ? "level active" : "level"
                }
                key={level}
              >
                {level}
              </button>
            );
          })}

          {this.state.difficulty && (
            <Link
              to={{
                pathname: "/" + category.name,
                state: { category, difficulty: this.state.difficulty },
              }}
              className="start"
            >
              Start
            </Link>
          )}
        </div>
      </section>
    );
  }
}

export default Difficulty;
