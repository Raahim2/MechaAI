import React from "react";
import "../CSS/faq.css"

function FAQ() {
  return (
    <>
      <div className="last">
        <h2 className="h2">Frequently Asked Questions</h2>

        <div
          style={{
            visibility: "hidden",
            position: "absolute",
            width: "0px",
            height: "0px",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol viewBox="0 0 24 24" id="expand-more">
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </symbol>
            <symbol viewBox="0 0 24 24" id="close">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </symbol>
          </svg>
        </div>

        <details>
          <summary>
            What file formats are supported for image uploads?
            <svg
              className="control-icon control-icon-expand invert"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#expand-more" />
            </svg>
            <svg
              className="control-icon control-icon-close"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#close" />
            </svg>
          </summary>
          <p>We support commonly used image formats such as JPEG, PNG</p>
        </details>

        <details>
          <summary>
            Can I edit images on mobile devices or tablets?
            <svg
              className="control-icon control-icon-expand invert"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#expand-more" />
            </svg>
            <svg
              className="control-icon control-icon-close"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#close" />
            </svg>
          </summary>
          <p>
            Yes, our website is optimized for use on mobile devices and tablets,
            allowing you to edit images on the go
          </p>
        </details>

        <details>
          <summary>
            Is there a limit to the number of edits I can apply to an image?
            <svg
              className="control-icon control-icon-expand invert"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#expand-more" />
            </svg>
            <svg
              className="control-icon control-icon-close"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#close" />
            </svg>
          </summary>
          <p>
            There is no limit to the number of edits you can apply to an image.
            Edit as much as you need until you achieve your desired result.
          </p>
        </details>

        <details>
          <summary>
            Do I need to create an account to use the editing features?
            <svg
              className="control-icon control-icon-expand invert"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#expand-more" />
            </svg>
            <svg
              className="control-icon control-icon-close"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#close" />
            </svg>
          </summary>
          <p>
            No, you can use the basic editing features without creating an
            account.
          </p>
        </details>

        <details>
          <summary>
            How can I save or download my edited images?
            <svg
              className="control-icon control-icon-expand invert"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#expand-more" />
            </svg>
            <svg
              className="control-icon control-icon-close"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#close" />
            </svg>
          </summary>
          <p>
            After completing your edits, you can save or download your images in
            the desired format (JPEG, PNG, etc.) directly to your device.
          </p>
        </details>

        <details>
          <summary>
            Are the editing tools and features easy to use for beginners?
            <svg
              className="control-icon control-icon-expand invert"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#expand-more" />
            </svg>
            <svg
              className="control-icon control-icon-close"
              width="24"
              height="24"
              role="presentation"
            >
              <use xlinkHref="#close" />
            </svg>
          </summary>
          <p>
            Yes, our website is designed with user-friendliness in mind, making
            it easy for beginners to navigate and utilize the editing tools.
          </p>
        </details>
      </div>
    </>
  );
}

export default FAQ;
