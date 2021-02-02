import Styled from 'styled-components'

const ButtonHeading = Styled.span`
.ant-radio-button-wrapper{
    height: 30px;
    line-height: 28px;
    font-size: 12px;
    font-weight: 500;
    padding: 0 10.5px;
    color: ${({ theme }) => theme['gray-color']};
    &:before{
        display: none;
    }
    &:focus-within{
        box-shadow: 0 0;
    }
    &:first-child{
        border-radius: 3px 0 0 3px;
    }
    &:last-child{
        border-radius: 0 3px 3px 0;
    }
    &.ant-radio-button-wrapper-checked{
        color: #fff !important;
        background: ${({ theme }) => theme['primary-color']} !important;
        &:hover{
            color: #fff !important;
            background: ${({ theme }) => theme['primary-color']} !important;
        }
    }
    &:hover{
        background: ${({ theme }) => theme['bg-color-normal']} !important;
    }
}
`;

export {
    ButtonHeading
};