/* eslint-disable linebreak-style */
import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  border-radius: 4px;
  overflow: hidden;
  @media screen and (max-width: 500px) {
    opacity:1;
  }  
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  * {
    margin: 0;
  }
  span {
    font-size: 12px;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  background-color: ${({ theme }) => `${theme.colors.mainBg}99`};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
  }
  ul#userAnswersList li.success_result {
    background-color: ${({ theme }) => `${theme.colors.success}`};
    padding: 10px 0;
  }
  ul#userAnswersList li.error_result {
    background-color: ${({ theme }) => `${theme.colors.wrong}`};
    padding: 10px 0;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}`};
  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
  
  &:hover,
  &:focus {
    opacity: .5;
  }
`;

export default Widget;
