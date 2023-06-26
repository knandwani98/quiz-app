import React, { Component } from "react";
import Loader from "./Components/Loader";
import Categories from "./Components/Categories";
import Difficulty from "./Components/Difficulty";

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      categories: null,
      selectedCategory: null,
    };
  }

  handleState = (selectedCategory) => {
    return this.setState({ selectedCategory });
  };

  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((categories) =>
        this.setState({ categories: categories.trivia_categories })
      );
  }

  render() {
    // Loading Screen
    if (!this.state.categories) {
      return <Loader />;
    }

    return (
      <main className="homepage">
        {/* Load All Categories */}
        {!this.state.selectedCategory ? (
          <Categories
            handleState={this.handleState}
            categories={this.state.categories}
          />
        ) : (
          <Difficulty category={this.state.selectedCategory} />
        )}
      </main>
    );
  }
}

export default App;
