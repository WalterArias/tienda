import React, { Component } from "react";
const Base = () => {
  return (
    <>
      <div className="col-6">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                plugin adds the appropriate classNamees that we use to style each element. These classNamees control the
                overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
                with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can
                go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
                plugin adds the appropriate classNamees that we use to style each element. These classNamees control the
                overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
                with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can
                go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
                plugin adds the appropriate classNamees that we use to style each element. These classNamees control the
                overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this
                with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can
                go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6">
        <div className="alert alert-primary" role="alert">
          A simple primary alert—check it out!
        </div>
        <div className="alert alert-secondary" role="alert">
          A simple secondary alert—check it out!
        </div>
        <div className="alert alert-success" role="alert">
          A simple success alert—check it out!
        </div>
        <div className="alert alert-danger" role="alert">
          A simple danger alert—check it out!
        </div>
        <div className="alert alert-warning" role="alert">
          A simple warning alert—check it out!
        </div>
        <div className="alert alert-info" role="alert">
          A simple info alert—check it out!
        </div>
        <div className="alert alert-light" role="alert">
          A simple light alert—check it out!
        </div>
        <div className="alert alert-dark" role="alert">
          A simple dark alert—check it out!
        </div>
      </div>
    </>
  );
};

export default Base;
