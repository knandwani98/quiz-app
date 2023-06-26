import React from "react";

const Categories = ({ categories, handleState }) => {
  return (
    <div className="categories ">
      <h2 className="heading">Select your category</h2>
      <div className="flex">
        {categories.map((category) => {
          return (
            <div key={category.id} className="category card">
              <button onClick={() => handleState(category)}>
                {category.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
