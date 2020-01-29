import Styled from 'styled-components';

const Main = Styled.div`
    padding: 0px 50px;
    min-height: 750px;
`;

const IconWrapper = Styled.div`
    position: relative;
    padding: 0px 30px;

    .anticon {
        position: absolute;
        top: -2px;
        width: 16px;
        height: 16px;
        line-height: 1;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.25);
      }
      
      .anticon:first-child {
        left: 0;
      }
      
      .anticon:last-child {
        right: 0;
      }
`;

export { Main, IconWrapper };
