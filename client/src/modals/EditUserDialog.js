import { Dialog } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import useRoles from '../hooks/useRoles';

const EditUserDialog = ({ user, forceRefresh, setForceRefresh }) => {
  const roles = useRoles();

  const [isOpen, setIsOpen] = useState(false);

  // I'm passing the user data from the parent component to populate the fields because when the admin edits the user details the fields will be pre-populated (except for the password field)

  const [formData, setFormData] = useState({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitChanges = (event) => {
    event.preventDefault();
    setIsDisabled(true);
    fetch('/api/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setIsDisabled(false);
        setIsOpen(false);
        setForceRefresh(!forceRefresh);
        alert(data.message);
      })
      .catch((err) => {
        console.log(err);
        setIsDisabled(false);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <>
      <StyledDialog
        PaperProps={{
          style: {
            borderRadius: '0'
          }
        }}
        open={isOpen}
      >
        <Form onSubmit={handleSubmitChanges}>
          <h2>Edit User Details</h2>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            defaultValue={user.firstName}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            defaultValue={user.lastName}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            defaultValue={user.email}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Label htmlFor="email">Password</Label>
          <Input
            type="password"
            id="password"
            defaultValue=""
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Label htmlFor="role">Role</Label>
          <Select
            name="role"
            id="role"
            defaultValue={user.role}
            onChange={handleChange}
            disabled={isDisabled}
          >
            {roles.map((role) => {
              return <option key={role}>{role}</option>;
            })}
          </Select>
          <ButtonsWrapper>
            <SubmitButton
              type="submit"
              disabled={isDisabled}
            >
              Submit
            </SubmitButton>
            <CancelButton
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={isDisabled}
            >
              Cancel
            </CancelButton>
          </ButtonsWrapper>
        </Form>
      </StyledDialog>
      <EditUserButton
        onClick={() => setIsOpen(true)}
        disabled={isDisabled}
      >
        Edit User
      </EditUserButton>
    </>
  );
};

const StyledDialog = styled(Dialog)`
  font-family: sans-serif;
  * {
    padding: 10px 35px 0 35px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  padding-left: 0;
  margin: 10px 0;
`;

const Input = styled.input`
  padding: 3px 0 3px 2px;
  &:disabled {
    background: lightgray;
  }
`;

const Select = styled.select`
  padding: 3px 0;
  &:disabled {
    background: lightgray;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 25px 0;
`;

const SubmitButton = styled.button`
  background: var(--success-color);
  border: 0;
  padding: 5px 20px;
  color: white;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled(SubmitButton)`
  background: var(--cancel-color);
`;
const EditUserButton = styled.button`
  background: var(--edit-color);
  border: 0;
  color: white;
  padding: 5px 10px;
  border-radius: 2px;
  margin: 10px 10px 10px 0;
`;

export default EditUserDialog;
