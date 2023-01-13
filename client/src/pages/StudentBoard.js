import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import StudentBoardColumn from '../components/StudentBoardColumn';
// const background = require("../style/assets/images/corkboard-background.jpeg");
const background = require('../style/assets/images/corkboard-background-80-cropped.png');

const StudentBoard = () => {
  const { userState } = useContext(UserContext);

  const [boardState, setBoardState] = useState();

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => {
        setBoardState(data.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    boardState && (
      <Wrapper>
        <H2>Welcome {userState.firstName}! Here's your homework for the week.</H2>

        <BoardContainer>
          {/* Creating the columns from the board state */}
          {Object.values(boardState.columns).map((column) => {
            return (
              <StudentBoardColumn
                key={column.id}
                column={column}
                tasks={boardState.tasks}
                boardState={boardState}
                setBoardState={setBoardState}
              />
            );
          })}
        </BoardContainer>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  background: url(${background}) no-repeat;
  background-size: 100vw 100vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 3vh;
`;

const H2 = styled.h2`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Comic Sans MS';
  background: #ffffff5f;
  margin-bottom: 50px;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px 20px;
`;

const BoardContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default StudentBoard;
