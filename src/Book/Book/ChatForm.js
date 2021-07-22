import React, { useState } from "react";
import Navbar from "../Home/HomeComponents/Navbar";

const ChatForm = ({ onSendButton }) => {
  const [currentContent, setcurrentContent] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //alert(`Submitting currentContent ${currentContent}`)
    onSendButton(currentContent);
    setcurrentContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        currentContent:
        <input
          type="text"
          value={currentContent}
          onChange={(e) => setcurrentContent(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ChatForm;
