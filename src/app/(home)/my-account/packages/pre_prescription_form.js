
'use client'
import { useEffect, useState, useRef } from "react";
import './css.css'

import { useAuth } from '../../useAuth';  // Import the useAuth hook

export default function pris_chat({ Pack_Purches_Id }) {

  const { token } = useAuth(); // Get session token and status

  const [resMessage, setMessage] = useState('')

  useEffect(() => {

    const questions = document.querySelectorAll('.question-container');
    const questionCounter = document.getElementById('question-counter');
    let currentQuestion = 0;

    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');

    function showQuestion(index) {
      questions.forEach((question, i) => {
        question.classList.toggle('active', i === index);
      });

      questionCounter.textContent = `Question ${index + 1} of ${questions.length}`;

      prevBtn.disabled = index === 0;
      nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-block';
      submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    }

    function toggleOtherInput(inputId, show) {
      const otherInput = document.getElementById(inputId);
      otherInput.style.display = show ? 'block' : 'none';
      if (!show) otherInput.value = '';  // Clear input if hidden
    }

    nextBtn.addEventListener('click', () => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
      }
    });

    // submitBtn.addEventListener('click', () => {
    //   console.log('sub');
    // });

    showQuestion(currentQuestion);


  }, []); // Fetch data whenever currentPage changes




  const handelSubit = async () => {

    console.log('sub');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_API_URL}/api/pre_prescription_form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token from useAuth hook
        },
        body: JSON.stringify({
          Pack_Purches_Id,
        })
      });

      if (!response.ok) {
        setMessage('Something went wrong');
        return;
      }
      const data = await response.json();

      if (data.success === true) {
        // Reload the window
        window.location.reload();
      }

      setMessage(data.message);

    } catch (error) {
      setMessage("Error applying coupon");
    }

  };


  return (

    <>

      <div className="py-14">
        <div className="container_chat mx-auto">
          {/* <h2>Multiple Choice Questionnaire</h2> */}
          <div className="question-counter" id="question-counter">
            Question 1 of 5
          </div>
          {/* Questions Container */}


          <div id="question-container">
            {/* Question 1 */}
            <div className="question-container active">
              <div className="question">Do you drink enough water every day?</div>
              <div className="options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer1"
                    defaultValue="yes"

                  />
                  Yes
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer1"
                    defaultValue="no"

                  />
                  No
                </label>

              </div>
            </div>
            {/* Question 2 */}
            <div className="question-container">
              <div className="question">
                Do you sleep well most nights?
              </div>
              <div className="options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer2"
                    defaultValue="yes"

                  />
                  Yes
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer2"
                    defaultValue="no"

                  />
                  No
                </label>

              </div>
            </div>
            {/* Question 3 */}
            <div className="question-container">
              <div className="question">
                Do you include fruits in your daily diet?
              </div>
              <div className="options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer3"
                    defaultValue="yes"

                  />
                  Yes
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer3"
                    defaultValue="no"

                  />
                  No
                </label>

              </div>
            </div>
            {/* Question 4 */}
            <div className="question-container">
              <div className="question">
                Do you exercise regularly during the week?
              </div>
              <div className="options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer4"
                    defaultValue="yes"

                  />
                  Yes
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer4"
                    defaultValue="no"

                  />
                  No
                </label>

              </div>
            </div>
            {/* Question 5 */}
            <div className="question-container">
              <div className="question">
                Do you take time for relaxation each day?
              </div>
              <div className="options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer5"
                    defaultValue="yes"

                  />
                  Yes
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="answer5"
                    defaultValue="no"

                  />
                  No
                </label>

              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons">
              <button className="default-btn" id="prev-btn" disabled="">
                Previous
              </button>
              <button className="default-btn" id="next-btn">
                Next
              </button>


              <button className="FormSub default-btn" onClick={handelSubit} id="submit-btn" style={{ display: "none" }}>
                Submit
              </button>

            </div>
            {/* Navigation Buttons */}

            <p>{resMessage}</p>

          </div>




          {/* Questions Container */}

        </div>
      </div>

    </>


  )
}
