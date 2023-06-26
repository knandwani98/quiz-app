import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Result = ({ scores, total, handleReset }) => {
  return (
    <section className="result-page">
      <div className="flex">
        <h2>Results of the Quiz.</h2>
        <Link className="retake" to="/">
          retake
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Correct Answers</th>
            <th>You Selected</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {scores.map((ques, i) => {
            return (
              <tr key={i}>
                <td dangerouslySetInnerHTML={{ __html: ques.question }}></td>
                <td>{ques.correctAnswer}</td>
                <td>{ques.youSelected}</td>
                <td className="icon">
                  {ques.youSelected === ques.correctAnswer ? "✅" : "❌"}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={2}>Total Correct</td>
            <td style={{ textAlign: "center" }} colSpan={2}>
              {total}/10
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default Result;
