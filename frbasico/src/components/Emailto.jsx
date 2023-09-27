import React, { Component } from "react";
/* import emailjs from "@emailjs/browser"; */

const Emailto = () => {
  /*   useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []); */
  /*  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_0wpnwrk", "template_ll2ar27", form.current, "D-Vt7oqI-cMp4aVPa").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  }; */

  return (
    <form>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default Emailto;
