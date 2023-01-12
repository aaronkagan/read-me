import styled from 'styled-components';
import { Dialog } from '@mui/material';
import { useState } from 'react';

const DeleteUser = ({ user, forceRefresh, setForceRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    setIsDisabled(true);

    // Delete the user
    fetch(`/api/user/${user.userId}`, {
      method: 'DELETE'
    })
      .then((res) => res.json())
      .then((data) => {
        setIsOpen(false);
        setIsDisabled(false);
        setForceRefresh(!forceRefresh);
        alert(data.message);
      })
      .catch((err) => {
        setIsOpen(false);
        setIsDisabled(false);
        console.log(err);
      });
  };
  return (
    <>
      <Dialog
        // Removing border radius from modal
        PaperProps={{
          style: {
            borderRadius: '0'
          }
        }}
        open={isOpen}
      >
        <Wrapper>
          <h2>
            Confirm Delete of User: {user.firstName} {user.lastName}
          </h2>
          <DialogButtonsContainer>
            <ConfirmDeleteButton
              onClick={handleDelete}
              disabled={isDisabled}
            >
              Confirm
            </ConfirmDeleteButton>
            <CancelButton
              onClick={() => setIsOpen(false)}
              disabled={isDisabled}
            >
              Cancel
            </CancelButton>
          </DialogButtonsContainer>
        </Wrapper>
      </Dialog>

      <DeleteUserButton onClick={() => setIsOpen(true)}>Delete User</DeleteUserButton>
    </>
  );
};

const DeleteUserButton = styled.button`
  background: var(--cancel-color);
  color: white;
  border: 0;
  border-radius: 2px;
  padding: 5px 10px;
`;

const Wrapper = styled.div`
  padding: 20px;
  font-family: sans-serif;
`;

const DialogButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0 10px;
`;

const ConfirmDeleteButton = styled.button`
  color: white;
  border: 0;
  border-radius: 2px;
  padding: 5px 10px;
  background: var(--success-color);
`;

const CancelButton = styled(ConfirmDeleteButton)`
  background: var(--cancel-color);
`;

export default DeleteUser;
