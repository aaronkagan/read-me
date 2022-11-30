import { useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import getUserId from "../functions/getUserId";
import useUserFullName from "../hooks/useUserFullName";
const { v4: uuidv4 } = require("uuid");

const CreateAnnouncementModal = ({ isModalOpen, setIsModalOpen, myAnnouncements, setMyAnnouncements }) => {
  const initialFormState = {
    // title: "",
    message: ""
  };
  const [formData, setFormData] = useState(initialFormState);

  const userId = getUserId();
  const userName = useUserFullName();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.message === "") return;

    const enrichedFormData = {
      ...formData,
      announcementId: uuidv4(),
      createdById: userId,
      createdByName: userName
    };

    // Setting the myAnnouncements array locally in the parent component in order to render the announcement without waiting for the POST to happen and the a refetch to occur. In the case that the patch fails, the actions in  .catch will cause the refetch of the announcements that exist in the DB
    setMyAnnouncements([...myAnnouncements, enrichedFormData]);
    // Resetting the form inputs
    setFormData(initialFormState);
    // Closing this modal
    setIsModalOpen(false);

    // Adding the announcement to the DB
    fetch("/api/announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(enrichedFormData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) alert(data.error);
        else console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("An unknown error has occurred");
        // Used to get the latest state on failed POST
        // TODO replace with parent component refresh not not page reload
        window.location.reload();
      });
  };

  return (
    <Dialog open={isModalOpen}>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <h2>Create Announcement</h2>
          {/* <label htmlFor="title">Title</label>
          <input type="text" value={formData.title} id="title" onChange={handleChange} /> */}
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" cols="30" rows="5" value={formData.message} onChange={handleChange} required />
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
        <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
      </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitButton = styled.button`
  width: 100px;
  background: lightgreen;
  border: 0;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background: lightgray;
  }
`;

const CancelButton = styled(SubmitButton)`
  background: lightpink;
`;

export default CreateAnnouncementModal;