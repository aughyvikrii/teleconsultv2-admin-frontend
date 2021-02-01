import Styled from 'styled-components';

const Main = Styled.div`
    padding: 0px 30px 20px;
    min-height: 715px;
    background-color: rgb(244, 245, 247);
    &.grid-boxed{
        padding: 0px 180px 20px;
        @media only screen and (max-width: 1599px){
            padding: 0px 130px 20px;
        }
        @media only screen and (max-width: 1399px){
            padding: 0px 50px 20px;
        }
        @media only screen and (max-width: 991px){
            padding: 0px 30px 20px;
        }
    }
    .ant-card-rtl .ant-card-extra{
                margin-right: 0 !important;
            }
    .ant-tabs-tab span svg {        
        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 5px;
    }
    /* Picker Under Input */
    .ant-form-item-control-input .ant-picker {
        padding: ${({ theme }) => (theme.rtl ? '0 0 0 12px' : '0 12px 0 0')} !important;
    }

    /* progressbars */

    .ant-progress {
        display: inline-flex !important;
        align-items: center;
    }

    .ant-progress>div {
        display: flex;
        flex-direction: column;
    }

    .ant-progress .ant-progress-outer {
        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 0 !important;
        ${({ theme }) => (!theme.rtl ? 'padding-right' : 'padding-left')}: 0 !important;
    }

    .ant-progress .ant-progress-text {
        order: 0;
        margin-left: auto;
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 10px !important;
        align-self: flex-end;
        text-align: center;
    }

    .ant-progress-status-warning .ant-progress-bg {
        background: #fa8b0c;
    }

    /* progress bars */
    
    @media only screen and (max-width: 1199px){
        padding: 0px 15px;
    }
    @media only screen and (max-width: 991px){
        min-height: 580px;
    }
    .w-100{
        width: 100%;
    }
    .product-sidebar-col{
        @media only screen and (max-width: 767px){
            order: 2;
        }
    }
    .ant-skeleton-paragraph{
        margin-bottom: 0;
    }

    /* // ant alert */
    .ant-alert-closable{
        .ant-alert-message{
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
    }

    .ant-alert-with-description .ant-alert-description{
        display: inline-block;
    }

    /* // ant Calendar Picker */
    .ant-picker-calendar{
        .ant-badge-status-text{
            color: ${({ theme }) => theme['gray-color']}
        }
    }
    .ant-picker-calendar-header .ant-picker-calendar-year-select{
        @media only screen and (max-width: 400px){
            width: 50% !important;
        }
    }
    .ant-picker-calendar-header .ant-picker-calendar-month-select{
        @media only screen and (max-width: 400px){
            width: calc(50% - 8px) !important
        }
    }

    /* // Card Grid */
    .card-grid-wrap{
        .ant-card-grid{
            @media only screen and (max-width: 575px){
                width: 50% !important
            }
        }
    }

    /* // Drawer */
    .atbd-drawer{
        .ant-card-body{
            text-align: center;
        }
    }
    .drawer-placement{
        @media only screen and (max-width: 400px){
            text-align: center;
        }
        .ant-radio-group{
            @media only screen and (max-width: 400px){
                margin-bottom: 15px;
            }
        }
    }
    .ant-drawer-content-wrapper{
        @media only screen and (max-width: 400px){
            width: 260px !important;
        }
        @media only screen and (max-width: 375px){
            width: 220px !important;
        }
    }

    /* // Input */
    .input-wrap{
        @media only screen and (max-width: 991px){
            min-height: 500px;
        }
        input::placeholder{
            color: ${({ theme }) => theme['light-color']};
        }
    }
    /* // Modal Buttons */
    .modal-btns-wrap{
        margin: 0 -5px;
    }
    /* spinner */
    .ant-spin{
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
    }

    /* Column Cards Wrapper */
    .columnCardsWrapper{
        background: #F4F5F7;
        border-radius: 4px;
        padding: 50px 30px 25px;
    }
    .columnCardsWrapper .ant-card{
        background: #fff;
    }
    .columnCardsWrapper .ant-card-head{
        background: #fff;
    }

    /* Ant Collapse */
    .ant-collapse{
        border-color: #E3E6EF;
        border-radius: 5px;
    }
    .ant-collapse.ant-collapse-icon-position-left .ant-collapse-header{
        color: #5A5F7D;
        padding: 12px 16px 10px 45px;
        background-color: ${({ theme }) => theme['bg-color-light']};
    }
    .ant-collapse-content p{
        color: #9299B8;
        margin-bottom: 0;
    }
    .ant-collapse-content > .ant-collapse-content-box {
        padding: 20px 20px 12px;
    }
    .ant-collapse-content > .ant-collapse-content-box .ant-collapse-content-box{
        padding: 10.5px 20px;
    }
    .ant-collapse.ant-collapse-borderless{
        background-color: #fff;
    }
    .ant-collapse > .ant-collapse-item,
    .ant-collapse .ant-collapse-content{
        border-color: #E3E6EF;
    }
    .ant-collapse > .ant-collapse-item.ant-collapse-item-disabled .ant-collapse-header{
        color: #ADB4D2 !important;
    }

    .ant-collapse > .ant-collapse-item .ant-collapse-header .ant-collapse-arrow{

        font-size: 8px;
    }

    .ant-collapse .ant-collapse {
        border: 0 none;
        background: #fff;
    }

    .ant-collapse .ant-collapse > .ant-collapse-item {
        border-bottom: 0;
    }
    .ant-collapse .ant-collapse .ant-collapse-header{
        border: 1px solid #E3E6EF;
        background: #F8F9FB;
    }
    .ant-collapse .ant-collapse .ant-collapse-content{
        margin: 20px 0 10px 0;
        border: 1px solid #E3E6EF;
        border-radius: 0;
    }

    /* // Ant Radio */
    .ant-radio-button-wrapper{
        height: 48px;
        line-height: 46px;
        padding: 0 25.25px;
        @media only screen and (max-width: 1024px){
            padding: 0 10px;
        }
        @media only screen and (max-width: 379px){
            height: 40px !important;
            line-height: 38px !important;
            font-size: 12px;
            padding: 0 6px;
        }
    }

    /* // Select */
    .ant-tree-select .ant-select-selector{
        height: 42px;
    }
    .tag-select-list{
        margin-bottom: -10px;
        .ant-select{
            margin-bottom: 10px;
        }
    }
    .ant-select-selector{
        border-color: #E3E6EF !important;
    }

    .ant-select{
        &.ant-select-multiple{
            .ant-select-selection-item{
                ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 8px;
            }
        }
        .ant-select-selection-item{
            ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 10px !important;
        }
        &.ant-select-lg{
            height: 50px;
            line-height: 48px;
            .ant-select-selector{
                height: 50px !important;
                line-height: 48px;
            }
            .ant-select-selection-item{
                line-height: 48px !important;
                ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 8px;
            }
            &.ant-select-multiple.ant-select-lg .ant-select-selection-item{
                height: 32px;
                line-height: 32px !important;
            }
        }
        &.ant-select-multiple.ant-select-sm{
            .ant-select-selection-item{
                height: 16px;
                line-height: 14px;
                font-size: 11px;
            }
        }
    }

    /* // Slider */
    .slider-with-input{
        .ant-slider{
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
        .slider-with-input__single{
            margin-bottom: 15px;
        }
    }

    /* // Taglist */
    .taglist-wrap{
        margin: -5px;
        .ant-tag {
            line-height: 22px;
            padding: 0 10.2px;
            border: 0 none;
            margin: 5px;
            color: ${({ theme }) => theme['gray-color']};
            &.ant-tag-has-color{
                color: #fff !important;
            }
            &.ant-tag-magenta{
                color: #eb2f96;
            }
            &.ant-tag-red{
                color: #f5222d;
            }
            &.ant-tag-volcano{
                color: #fa541c;
            }
            &.ant-tag-orange{
                color: #fa8c16;
            }
            &.ant-tag-gold{
                color: #faad14;
            }
            &.ant-tag-line{
                color: #a0d911;
            }
            &.ant-tag-green{
                color: #a0d911;
            }
            &.ant-tag-cyan{
                color: #13c2c2;
            }
            &.ant-tag-blue{
                color: #1890ff;
            }
            &.ant-tag-geekbule{
                color: #2f54eb;
            }
            &.ant-tag-purple{
                color: #722ed1;
            }
        }
    }

    /* // Timepicker List */
    .timepicker-list{
        margin: -5px;
        .ant-picker{
            margin: 5px;
        }
    }

    /* // Ant Menu */
    .ant-menu{
        .ant-menu-submenu-title{
            svg{
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }

    /* Ant Comment */
    .ant-comment-inner{
        padding: 0;
    }
    .ant-comment-content-detail p{
        color: #9299B8;
    }
    .ant-list-items{
        padding-top: 22px;
    }
    .ant-list-items li:not(:last-child){
        margin-bottom: 22px;
    }
    .ant-comment:not(:last-child){
        margin-bottom: 22px;
    }
    .ant-comment-nested{
        margin-top: 22px;
    }
    .ant-comment-actions li span{
        color: #ADB4D2;
    }
    .ant-comment-content-detail textarea{
        resize: none;
        min-height: 170px;
        border-radius: 5px;
    }

    /* // Vector Map */
    .rsm_map{
        min-height: 505px;
        .world-map{
            width: 100%;
            height: auto;
            @media only screen and (max-width: 1599px){
                height: 480px;
            }
            @media only screen and (max-width: 1399px){
                height: 400px;
            }
            @media only screen and (max-width: 575px){
                height: 400px;
            }
            @media only screen and (max-width: 767px){
                height: 300px;
            }
            @media only screen and (max-width: 575px){
                height: 250px;
            }
            @media only screen and (max-width: 479px){
                height: 350px;
            }
            @media only screen and (max-width: 375px){
                height: 240px;
            }
        }
        .controls{
            position: absolute;
            right: 30px;
            bottom: 30px;
            button{
                display: block;
                width: 27px;
                height: 27px;
                background: none;
                color: #5a5f7d;
                border: 1px solid #f1f2f6;
                padding: 0;
                font-size: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #fff;
                cursor: pointer;
                &:first-child{
                    border-radius: 6px 6px 0 0;
                }
                &:last-child{
                    border-radius: 0 0 6px 6px;
                }
                &:focus{
                    outline: none;
                }
                svg{
                    width: 10px;
                }
            }
            button + button{
                border-top: 0 none;
            }
        }
    }

    /* // Checkout Wrapper */
    .checkoutWraper{
        .ant-card-body{
            padding: 50px 50px 50px 30px !important;
            @media only screen and (max-width: 575px){
                padding: 25px !important;
            }
            .ant-card-body{
                padding: 25px !important;
                @media only screen and (max-width: 375px){
                    padding: 15px !important;
                }
            }
        }
        .ant-steps{
            margin-top: -22px;
        }
    }

    /* // Star Active */
    a{
        i,
        span.fa{
          font-size: 16px;
          color: ${({ theme }) => theme['extra-light-color']};
        }
        &.starDeactivate{
          i:before{
            content: "\f31b";
          }
        }
        &.starActive{
          i,
          span.fa{
            color: ${({ theme }) => theme['warning-color']};
          }
          i:before,
          span.fa:before{
            color: ${({ theme }) => theme['warning-color']};
            content: "\f005";
    
          }
        }
    }

    .ant-timeline{
        color: ${({ theme }) => theme['gray-color']};
        .ant-timeline-item-content{
            font-size: 16px;
        }
    }

    
    .ant-rate-content{
        font-weight: 500;
        color: ${({ theme }) => theme['gray-color']}
    }

    .account-card{
        .ant-card-head{
            .ant-card-extra{
                @media only screen and (max-width: 575px){
                   padding-top: 0 !important;
                }
            }
            
        }
                
    }

    /* // Rechart */
    .recharts-default-legend{
        .recharts-legend-item{
            min-width: 100px !important;
        }
    }

    /* // Radio */
    .radio-size-wrap{
            .ant-radio-button-wrapper{
                @media only screen and (max-width: 1450px){
                    padding: 0 11.5px;
                }
            }
        }
    }

    /* // Message  */
    .message-button-list{
        margin: -4px;
        .ant-btn {
            margin: 4px;
        }
    }
    /* Chart Label */

    .chart-label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 6px;
        color: #5a5f7d;
    }

    .chart-label .label-dot {
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
    }

    .chart-label .label-dot.dot-success {
        background: #20c997;
    }

    .chart-label .label-dot.dot-info {
        background: #5f63f2;
    }

    .chart-label .label-dot.dot-warning {
        background: #fa8b0c;
    }

    .chart-label .label-dot {
        display: block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
    }

    // Ant comment action
    .ant-comment-actions{
        li{
            position: relative;
            &:not(:last-child){
                margin-right: 8px;
                padding-right: 8px;
                &:after{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 1px;
                    height: 12px;
                    background-color: #C6D0DC;
                    content: '';
                }
            }
            .com-time{
                cursor: default;
            }
            span{
                margin-right: 0;
            }
        }
    }

    // Emoji Picker React
    .emoji-picker-react{
        top: 15px;
        right: 25px;
        box-shadow: 0 5px 10px #efefef10;
        @media only screen and (max-width: 479px){
            top: 25px;
            right: -50px;
            width: 260px;
        }
        .emoji-categories{
            padding: 0 10px;
        }
        .emoji-search{
            margin: 0 10px;
        }
        .content-wrapper:before{
            display: none;
        }
        .emoji-group{
            padding: 0 10px;
        }
        .emoji-group:before{
            font-size: 12px;
            font-weight: 600;
            color: ${({ theme }) => theme['dark-color']};
        }
        .emoji-group .emoji-img{
            margin: 5px !important;
        }
    }

    .wizard-side-border{
        >.ant-card{
            .ant-card-body{
                padding: 0 25px !important;
            }
        }
        .checkout-successful{
            >.ant-card{
                .ant-card-body{
                    padding: 25px !important;
                }
            }
        }
        .payment-method-form.theme-light{
            .shipping-selection__card{
                .ant-card-body{
                    padding: 25px 0 !important;
                }
            }
        }
        .shipping-selection__card{
            .ant-card-body{
                padding: 25px !important;
            }
        }
        .atbd-review-order{
            .ant-card-body{
                padding: 25px 25px 0 !important;
                @media only screen and (max-width: 767px) {
                    padding: 15px 15px 0 !important;
                }
            }
        }
        
        .ant-steps {
            padding: 50px;
            @media only screen and (max-width: 1399px) {
                padding: 25px;
            }
        }
        .steps-wrapper{
            padding: 50px;
            @media only screen and (max-width: 1399px) {
                padding: 25px;
            }
            ${({ theme }) => (theme.rtl ? 'border-right' : 'border-left')}: 1px solid ${({ theme }) =>
  theme['border-color-light']};
        }
    }
    .editor-compose > div {
        position: static;
        max-width: 100%;
        margin: 25px 0;
    }
`;

const ButtonsGroupWrapper = Styled.div`
    margin-bottom: -25px;
    .button-group-single{
        margin-bottom: 15px;
        h4{
            font-size: 15px;
            margin-bottom: 8px;
        }
        .ant-btn-group{
            margin-bottom: 10px;
        }
    }
    .button-group-single .ant-btn-white{
        border: 1px solid #E3E6EF;
        background: #fff !important;
        ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 0px;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 1px;
        }
        &:hover{
            color: ${({ theme }) => theme['gray-color']} !important;
            background: ${({ theme }) => theme['bg-color-normal']} !important;
        }
    }
    .button-group-single .ant-btn-light{
        border: 1px solid #E3E6EF;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
        ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 0px;
        font-weight: 500;
        color: ${({ theme }) => theme['extra-light-color']} !important;
        background: ${({ theme }) => theme['bg-color-normal']} !important;
        &:last-child{
            ${({ theme }) => (theme.rtl ? 'border-left-width' : 'border-right-width')}: 1px;
        }
    }
    .ant-btn-group:not(:last-child){
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
    }
`;

const BlockButtonsWrapper = Styled.div`
    .ant-btn-block{
        margin-bottom: 10px;
    }
`;

const ButtonSizeWrapper = Styled.div`
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
`;

const BtnWithIcon = Styled.div`
    display: inline;
    .anticon i,
    .anticon svg,
    .anticon img{
        width: 10px;
        height: 10px;
    }
    .ant-btn-group button.active{
        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0px;
    }
`;

const AlertList = Styled.div`
    margin-top: -15px;
    .alert-empty-message{
        .ant-alert{
            padding: 10px 40px 10px!important;
            &.ant-alert-no-icon{
                padding: 10px 20px 10px!important;
            }
        }
        .ant-alert-icon{
            top: 15px !important;
        }
        .ant-alert-message{
            display: none !important;
        }
    }
`;

const AutoCompleteWrapper = Styled.div`
    .ant-select:not(:last-child){
        margin-bottom: 20px;
    }
    .auto-complete-input{
        .ant-select{
            width: 200px !important;
            @media only screen and (max-width: 575px){
                width: 100% !important;
            }
        }
    }
`;

const CalendarWrapper = Styled.div`
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
        height: 30px !important;
    }
    .ant-select-single .ant-select-selector .ant-select-selection-item,
    .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
        line-height: 28px !important;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content{
        height: 105px;
    }
    .ant-radio-button-wrapper{
        height: 30px;
        line-height: 28px;
        @media only screen and (max-width: 575px){
            height: 30px !important;
            line-height: 28px !important;
        }
    }
`;

const DatePickerWrapper = Styled.div`
    .ant-picker{
        padding: 6px 11px 6px;
        width: 100%;
        border-color: #E3E6EF;
        border-radius: 5px;
    }
    .ant-picker:not(:last-child){
        margin-bottom: 20px;
    }
    .ant-picker-input > input{
        color: #5A5F7D;
    }
    .ant-picker-range .ant-picker-input > input{
        text-align: center;
        font-weight: 500;
    }
`;

const NotificationListWrapper = Styled.div`
    margin: -4px;
    button{
        margin: 4px;
    }
`;

const TagInput = Styled.div`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme['border-color-normal']};
    margin: -3px;
    .ant-tag{
        margin: 3px;
        font-size: 11px;
        padding: 0 4px;
        border: 0 none;
        height: 24px;
        display: inline-flex;
        align-items: center;
    }
`;

const PageHeaderWrapper = Styled.div`
    .ant-page-header{
        border: 1px solid ${({ theme }) => theme['border-color-normal']};
        border-radius: 5px;
    }
    .ant-page-header .ant-page-header-heading-left{
        margin: 2px 0;
    }
`;

const MessageStyleWrapper = Styled.div`
    .ant-btn-lg{
        font-size: 14px;
    }
`;

const BasicFormWrapper = Styled.div`
    .ant-form {
        .form-item{
            margin-bottom: 30px;
            label{
                font-weight: 500;
                display: block;
                margin-bottom: 15px;
            }
            .ant-cascader-picker{
                width: 100%;
                min-height: 48px;
                .ant-cascader-input{
                    min-height: 48px;
                }
            }
        }
    }
    .ant-form-item{
        flex-flow: column;
        &:not(:last-child){
            margin-bottom: 26px;
        }
        &:last-child{
            margin-bottom: 0;
        }
        .ant-form-item-label{
            text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
            label{
                height: fit-content;
                margin-bottom: 6px;
            }
        }
        .ant-form-item-control-input{
            input,
            textarea{
                color: ${({ theme }) => theme['gray-color']};
                &:placeholder{
                    color: ${({ theme }) => theme['light-color']};
                }
            }
            input[type="password"]{
                padding-top: 12px;
                padding-bottom: 12px;
            }
            .ant-picker-input input{
                padding: 12px;
            }
            button{
                height: 44px;
            }
            .ant-input-affix-wrapper{
                padding: 0 11px;
            }
        }
        .ant-select-single{
            .ant-select-selector{
                padding: 0 20px;
                height: 48px !important;
                border: 1px solid ${({ theme }) => theme['border-color-normal']};
                .ant-select-selection-item{
                    line-height: 46px !important;
                    padding: 0 !important;
                }
                .ant-select-selection-placeholder{
                    line-height: 46px !important;
                }
            }
        }
    }
    .setting-form-actions{
        margin: 48px 0 14px;
        @media only screen and (max-width: 575px){
            margin: 40px 0 14px;
        }
        button{
            border-radius: 6px;
            height: 44px;
            margin-bottom: 14px;
            &.ant-btn-light{
                border: 1px solid ${({ theme }) => theme['border-color-light']};
                background-color: ${({ theme }) => theme['bg-color-light']};
            }
        }
    }
    .ant-form-item-control-input{
        .input-prepend{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            height: 48px;
            border-radius: ${({ theme }) => (theme.rtl ? '0 4px 4px 0' : '4px 0 0 4px')};
            z-index: 10;
            border: 1px solid ${({ theme }) => theme['border-color-normal']};
            background-color: ${({ theme }) => theme['bg-color-light']};
            svg,
            i{
                color: ${({ theme }) => theme['gray-color']};
            }
        }
        .input-prepend-wrap{
            .ant-input-number{
                input{
                    ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 70px;
                }
            }
        }
        .ant-input-number{
            width: 100% !important;
            border: 1px solid ${({ theme }) => theme['border-color-normal']};
        }
    }
    .add-record-form{
        margin: 25px 0 35px 0;
        
        .record-form-actions{
            padding-right: 40px;
        }
        .ant-btn{
            height: 44px;
            font-size: 14px;
            font-weight: 500;
        }
        .ant-radio-group{
            margin-bottom: -4px;
            .ant-radio-wrapper{
                margin-bottom: 4px;
            }
        }
    }
    .adTodo-form{
        .btn-adTodo {
            font-size: 14px;
        }
    }
`;

const CardToolbox = Styled.div`
    .ant-page-header-heading{
        @media only screen and (max-width: 991px){
            flex-flow: column;
            align-items: center;
        }
    }

    .ant-page-header-heading-left{
        @media only screen and (max-width: 575px){
            flex-flow: column;
        }
        @media only screen and (max-width: 800px){
            max-width: 100%;
        }
        .ant-page-header-back{
            @media only screen and (max-width: 575px){
                margin: 0;
                padding: 0;
            }
        }
        .ant-page-header-heading-title{
            @media only screen and (max-width: 575px){
                margin: 10px 0 8px;
                padding: 0;
            }
            &:after{
                @media only screen and (max-width: 575px){
                    display: none;
                }
            }
        }
        .ant-page-header-heading-sub-title{
            @media only screen and (max-width: 575px){
                margin: 0;
                padding: 0;
                flex-flow: column;
            }
            .title-counter{
                @media only screen and (max-width: 575px){
                    margin-bottom: 16px;
                }
            }
        }
    }

    .ant-page-header-heading-title{
        position: relative;
        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 24px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 24px;
        @media only screen and (max-width: 767px){
            ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 12px;
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px !important;
        }
        &:after{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0px;
            top: 0;
            height: 100%;
            width: 1px;
            content: '';
            background: ${({ theme }) => theme['border-color-normal']};
        }
    }
    .ant-page-header-heading-sub-title{
        font-weight: 500;
        display: flex;
        align-items: center;
    }
    .ant-select{
        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 25px;
        @media only screen and (max-width: 575px){
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
        .ant-select-selector{
            height: 46px !important;
            min-width: 350px;
            @media only screen and (max-width: 991px){
                min-width: 100%;
            }
        }
        .ant-select-selection-search-input{
            height: 46px;
            border-radius: 23px;
            border: 0 none;
            box-shadow: 0 5px 20px #9299B803;
            input{
                height: 46px !important;
                font-size: 14px;
            }
        }
    }
    .btn-add_new{
        border-radius: 6px;
        height: 40px;
        padding: 0 14px;
        font-size: 12px;
        @media only screen and (max-width: 991px){
            margin-top: 10px;
        }
        a{
            display: flex;
            align-items: center;
            svg{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
            }
        }
    }
`;

const FormGroupWrapper = Styled.div`
    .ant-card-body{
        @media only screen and (max-width: 767px){
            padding: 0 !important;
        }
    }
`;
const BannerCardStyleWrap = Styled.div`
    .ant-card-body{
        padding: 25px 25px 0 25px !important;
    }
`;

const FileCardWrapper = Styled.div`
    .file-list{
        min-height: 385px;
        .file-list__single{
            justify-content: space-between;
            align-items: center;
            &:not(:last-child){
                margin-bottom: 18px;
            }
            span{
                display: block;
                font-size: 12px;
                line-height: 1.42;
                &.file-name{
                    font-size: 14px;
                    font-weight: 500;
                    color: ${({ theme }) => theme['dark-color']};
                }
                &.file-size{
                    margin: 2px 0;;
                    color: ${({ theme }) => theme['gray-solid']};
                }
                &.file-content-action{
                    a{
                        font-weight: 500;
                        color: ${({ theme }) => theme['primary-color']};
                    }
                    a + a{
                        margin-left: 8px;
                    }
                }
            }
        }
        .file-single-info{
            width: 50%;
            align-items: center;
            .file-single-logo{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
                img{
                    max-width: 42px;
                }
            }
        }
        .file-single-action{
            .ant-dropdown-trigger {
                color: ${({ theme }) => theme['extra-light-color']};
            }
        }
    }
`;

const TableWrapper = Styled.div`
    .ant-pagination-prev, .ant-pagination-next {
        line-height: 28px !important;
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    .ant-table table{
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
    }
    .ant-table-thead > tr > th{
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')};
    }
    span.anticon.anticon-right{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    span.anticon.anticon-left{
        transform: rotateY(${({ theme }) => (theme.rtl ? '180deg' : '0deg')})
    }
    &.table-order,
    &.table-seller,
    &.table-data-view{
        .ant-table-selection{
            .ant-checkbox-indeterminate{
                .ant-checkbox-inner{
                    background: ${({ theme }) => theme['primary-color']};
                    border-color: ${({ theme }) => theme['primary-color']};
                    &:after{
                        height: 2px;
                        background-color: #fff;
                    }
                }
            }
        }
        .ant-table-container{
            padding-bottom: 25px;
            border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                td{
                    .product-id{
                        max-width: 60px;
                        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')};
                    }
                }
            }
        }
        .ant-pagination{
            margin-top: 25px !important;
        }
    }
    &.table-data-view{
        .ant-table-container{
            padding-bottom: 0;
        }
        table{
            thead{
                th{
                    padding: 15px 16px;
                }
            }
            tbody{
                td{
                    padding: 11px 16px;
                    .record-img{
                        img{
                            max-width: 38px;
                            border-radius: 50%;
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
                        }
                    }
                    .record-location{
                        display: block;
                        font-size: 12px;
                        font-weight: 400;
                        color: ${({ theme }) => theme['light-color']};
                    }
                    .status{
                        font-weight: 500;
                        text-transform: capitalize;
                        &.active{
                            color: ${({ theme }) => theme['success-color']};
                            background: ${({ theme }) => theme['success-color']}10;
                        }
                        &.deactivated{
                            color: ${({ theme }) => theme['warning-color']};
                            background: ${({ theme }) => theme['warning-color']}10;
                        }
                        &.blocked{
                            color: ${({ theme }) => theme['danger-color']};
                            background: ${({ theme }) => theme['danger-color']}10;
                        }
                    }
                    .table-actions{
                        a{
                            svg, i{
                                width: 16px;
                                color: ${({ theme }) => theme['extra-light-color']};
                            }
                            &.edit{
                                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 6px;
                              &:hover{
                                svg,
                                i{
                                    color: ${({ theme }) => theme['info-color']};
                                }
                              }  
                            }
                            &.delete{
                              &:hover{
                                svg,
                                i{
                                    color: ${({ theme }) => theme['danger-color']};
                                }
                              }  
                            }
                        }
                    }
                }
            }
        }
    }
    table{
        thead{
            tr{
                border-radius: 10px;
                th{
                    &:last-child{
                        text-align: center;/* ${({ theme }) => (theme.rtl ? 'left' : 'right')}; */
                    }
                    color: ${({ theme }) => theme['gray-color']};
                    background: ${({ theme }) => theme['bg-color-light']};
                    border-top: 1px solid ${({ theme }) => theme['border-color-light']};
                    border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
                    &:first-child{
                        ${({ theme }) => (!theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
  theme['border-color-light']};
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 1px solid ${({ theme }) =>
  theme['border-color-light']};
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                }
            }
        }
        tbody{
            tr{
                &:hover{
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                &.ant-table-row-selected{
                    &:hover{
                        td{
                            background: ${({ theme }) => theme['bg-color-light']};
                        }
                    }
                    td{
                        background: ${({ theme }) => theme['bg-color-light']};
                    }
                }
                td{
                    border: 0 none;
                    font-weight: 500;
                    color: ${({ theme }) => theme['dark-color']};
                    &:first-child{
                        border-radius: ${({ theme }) => (!theme.rtl ? '10px 0 0 10px' : '0 10px 10px 0')} !important;
                    }
                    &:last-child{
                        text-align: center;
                        border-radius: ${({ theme }) => (!theme.rtl ? '0 10px 10px 0' : '10px 0 0 10px')} !important;
                    }
                    .order-id{
                        min-width: 128px;
                    }
                    .customer-name{
                        min-width: 174px;
                    }
                    .status{
                        min-width: 175px;
                    }
                    .ordered-amount{
                        min-width: 175px;
                    }
                    .ordered-date{
                        min-width: 165px;
                    }
                    .table-actions{
                        min-width: 60px;
                    }
                }
            }
        }
        .seller-info{
            img{
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
            }
        }
        .user-info{
            display: flex;
            align-items: center;
            figure{
                margin: 0 8px 0;
            }
            .user-name{
                margin-bottom: 4px;
                font-weight: 500;
            }
            .user-designation{
                font-size: 12px;
                font-weight: 400;
                color: ${({ theme }) => theme['light-color']};
            }
        }
    }    
`;

const DragDropStyle = Styled.div`
    .ant-card-body{
        padding: 15px !important;
    }
    table{
        thead{
            display: none;
        }
        tbody{
            >tr{
                &:not(:last-child){
                    td{
                         border-bottom: 1px solid ${({ theme }) => theme['border-color-normal']} !important;
                    }
                 }
                 &:hover{
                     td{
                         background-color: transparent !important;
                     }
                 }
                >td{
                    font-size: 14px;
                    &:first-child,
                    &:last-child{
                        border-radius: 0 !important;
                    }
                }
            }
        }
        tr{
            td{
                &.drag-visible{
                    svg,
                    img{
                        width: 20px;
                    }
                    svg,
                    i{
                        color: ${({ theme }) => theme['extra-light-color']} !important;
                    }
                }
            }
        }
        .user-info{
            .user-name{
                font-size: 14px;
                margin-left: 8px;
            }
        }
    }
`;

const ImportStyleWrap = Styled.div`
    .ant-upload.ant-upload-drag{
        background-color: #fff;
        min-height: 280px;
        display: flex;
        align-items: center;
        border-color: #C6D0DC;
        border-radius: 10px;
        .ant-upload-drag-icon{
            svg,
            i{
                color: #ADB4D2;
            }
        }
    }
    .sDash_import-inner{
        .ant-upload-text{
            font-size: 20px;
            font-weight: 500;
        }
        .ant-upload-hint{
            margin-left: 4px;
            span{
                color: ${({ theme }) => theme['primary-color']};
            }
        }
        .ant-upload-list{
            .ant-upload-list-item{
                background-color: #fff;
                border-color: ${({ theme }) => theme['border-color-normal']};
            }
            .ant-upload-list-item-card-actions.picture{
                top: 18px;
                ${({ theme }) => (!theme.rtl ? 'right' : 'left')}: 15px;
            }
        }
    }
`;

const ExportStyleWrap = Styled.div`
    .sDash_export-box{
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        @media only screen and (max-width: 575px){
            flex-flow: column;
        }
        .btn-export{
            height: 44px; 
            @media only screen and (max-width: 575px){
                margin-bottom: 20px;
            }
        }
        .ant-select{
            width: auto !important;
            .ant-select-selector{
                padding: 0 20px;
                .ant-select-selection-search-input{
                    border-radius: 20px;
                }
            }
        }
    }
    .sDash_export-file-table{
        .ant-table-content{
            .ant-table-thead{
                border: 1px solid ${({ theme }) => theme['border-color-light']};
                border-radius: 10px;
                tr{
                    th{
                        background-color: ${({ theme }) => theme['bg-color-light']};
                        border: 0 none;
                        color: ${({ theme }) => theme['gray-color']};
                        &:first-child{
                            border-radius: 10px 0 0 10px;
                        }
                        &:last-child{
                            border-radius: 0 10px 10px 0;
                        }
                    }
                }
            }
            .ant-table-tbody{
                tr{
                    &:hover{
                        box-shadow: 0 15px 50px #9299B820;
                        td{
                            background-color: #fff !important;
                        }
                    }
                    td{
                        border: 0 none;
                        padding: 22px 25px;
                        background-color: #fff;
                    }
                }
            }
        }
    }
`;


const PricingCard = Styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 5px 20px #9299B830;
  padding: 30px;
  .pricing-badge{
    height: 32px;
    padding: 6px 22.6px;
  }
  .price-amount{
    font-size: 36px;
    margin-bottom: 10px;
    .currency{
      font-size: 16px;
      font-weight: 600;
      top: -12px;
      ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 2px;
      color: ${({ theme }) => theme['extra-light-color']};
    }
    .pricing-validity{
      font-size: 13px;
      font-weight: 400;
      bottom: 0;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: -2px;
      color: ${({ theme }) => theme['light-color']};
    }
  }
  .package-user-type{
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme['gray-color']};
  }
  .pricing-title{
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  button{
    padding: 0px 29.32px;
    height: 44px;
    border-radius: 6px;
    &.ant-btn-white{
      border: 1px solid #E3E6EF;
      span{
        color: #272b41;
      }
    }
  }
`;

const ListGroup = Styled.div`
  margin: 28px 0 15px;
  min-height: 210px;
  .list-single{
    display: flex;
    align-items: center;
    &:not(:last-child){
      margin-bottom: 12px;
    }
    .icon{
      display: inline-block;
      margin: ${({ theme }) => (theme.rtl ? '0px 0 -4px 10px' : '0px 10px -4px 0')};
    }
  }
`;

const Badge = Styled.span`
  display: inline-block;
  margin-bottom: 32px;
  padding: 5px 20px;
  border-radius: 16px;
  background: ${({ type, theme }) => theme[`${type}-color`]}10;
  color: ${({ type, theme }) => theme[`${type}-color`]};
  font-size: 13px;
  font-weight: 500;
`;

const GalleryNav = Styled.nav`
  background: #fff;
  margin-bottom: 25px;
  border-radius: 10px;
  padding: 0px 16px;
  @media only screen and (max-width: 767px){
    padding: 0 12px;
  }
  @media only screen and (max-width: 575px){
    text-align: center;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: inline-block;
      a {
        position: relative;
        display: block;
        padding: 15px 0;
        margin: 0 12px;
        color: ${({ theme }) => theme['light-color']};
        @media only screen and (max-width: 767px){
          margin: 0 10px;
        }
        &:after{
          position: absolute;
          ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          border-radius: 10px;
          opacity: 0;
          visibility: hidden;
          background: ${({ theme }) => theme['primary-color']};
          content: "";
        }
        &.active{
          color: ${({ theme }) => theme['primary-color']};
          &:after{
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
`;

const GalleryCard = Styled.nav`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 5px 20px ${({ theme }) => theme['light-color']}03;
  figure{
    margin-bottom: 0;
  }
  .gallery-single-content{
    padding: 18px 25px 20px;
    .gallery-single-title{
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    p{
      font-size: 13px;
      margin-bottom: 0px;
      color: ${({ theme }) => theme['light-color']};
    }
  }
`;

const UsercardWrapper = Styled.nav`
  .user-card-pagination{
    margin: 15px 0 40px 0;
    text-align: ${({ theme }) => (!theme.rtl ? 'right' : 'left')};
    @media only screen and (max-width: 991px){
      text-align: center;
    }
  }
`;

const UserTableStyleWrapper = Styled.nav`
  table{
    tbody{
      td{
        .user-info{
          .user-name{
            font-size: 14px;
          }
        }
        span.status-text{
          font-size: 12px;
          padding: 0 12.41px;
          line-height: 1.9;
          font-weight: 500;
          border-radius: 12px;
          text-transform: capitalize;
          display: inline-block !important;
          background: #ddd;
          &.active{
            background-color: ${({ theme }) => theme['success-color']}15;
            color: ${({ theme }) => theme['success-color']};
          }
          &.deactivate{
            background-color: ${({ theme }) => theme['warning-color']}15;
            color: ${({ theme }) => theme['warning-color']};
          }
          &.blocked{
            background-color: ${({ theme }) => theme['danger-color']}15;
            color: ${({ theme }) => theme['danger-color']};
          }
        }
      }
    }
  }
  .ant-table-pagination.ant-pagination{
    width: 100%;
    text-align: ${({ theme }) => (!theme.rtl ? 'right' : 'left')};
    border-top: 1px solid ${({ theme }) => theme['border-color-light']};
    margin-top: 0 !important;
    padding-top: 30px;
    @media only screen and (max-width: 767px){
      text-align: center;
    }
  }
  .contact-table{
    table{
      tr{
        th{
          &:first-child{
            ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 20px;
          }
          &:last-child{
            ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 20px;
          }
        }
      }
      .table-actions{
        button{
          width: auto;
          height: auto;
          padding: 0;
          background-color: transparent;
          &:hover{
            background-color: transparent;
          }
          &.ant-btn-primary{
            &:hover{
              color: #ADB4D2;
            }
          }
        }
      }
      tbody >tr.ant-table-row-selected >td{
        background-color: ${({ theme }) => theme['primary-color']}10;
      }
    }
  }
`;

const UserCard = Styled.div`
  text-align: center;
  .user-card{
    &.theme-list{
      .ant-card-body{
        padding: 30px 25px 30px 30px !important;
        @media only screen and (max-width: 479px){
          padding: 25px 20px 25px 20px !important;
        }
      }
      figure{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        @media only screen and (max-width: 479px){
          flex-flow: column;
        }
        img{
          max-width: 80px;
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}:20px;
          @media only screen and (max-width: 479px){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}:0px;
          }
        }
      }
      figcaption{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        text-align: left;
        @media only screen and (max-width: 379px){
          flex-flow: column;
        }
      }
      .card__content{
        p{
          max-width: 400px;
          font-size: 15px;
          color: ${({ theme }) => theme['gray-color']};
        }
        .card__designation{
            font-size: 13px;
            margin-bottom: 15px;
            color: ${({ theme }) => theme['light-color']};
        }
        .card-text{
          margin-bottom: 12px;
        }
        .card-info{
          margin-bottom: 0;
          .user-meta{
            font-size: 14px;
            strong{
              font-weight: 600;
              color: ${({ theme }) => theme['dark-color']};
            }
          }
          .user-meta + .user-meta{
            ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
          }
        }
      }
      .card__actions{
        text-align: ${({ theme }) => (theme.rtl ? 'left' : 'right')}
        @media only screen and (max-width: 379px){
          margin-top: 15px;
        }
        button{
          padding: 0px 19.05px;
          min-width: 114px;
        }
      }
    }
    &.theme-grid-2{
      .ant-card-body{
        padding: 0 !important;
      }
      figure{
        position: relative;
      }
      .user-card__img{
        margin-bottom: 0;
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        width: 132px;
        height: 132px;
        border-radius: 50%;
        background-color: #fff;
        z-index: 22;
        img{
          position: relative;
          top: 6px;
        }
      }
      .user-card__bg{
        background-size: cover !important;
        background-position: center !important;
        border-radius: 10px 10px 0 0;
      }
      .card__bottom{
        position: relative;
        background-color: #fff;
        top: -26px;
        padding-top: 102px;
        border-radius: 30px 30px 10px 10px;
      }
    }
    &.theme-grid-3{
      .ant-card{
        text-align: left;
      }
      .ant-card-body{
        padding: 0 !important;
      }
      .card__top,
      .card__content,
      .card__info{
        padding: 0 30px;
      }
      .card__top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 30px;
        margin-bottom: 10px;
        .user-card__img{
          margin-right: 12px;
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 12px;
          img{
            max-width: 70px;
          }
        }
        .user-card__info{
          width: 100%;
          position: relative;
          .action-more{
            position: absolute;
            right: 0;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 0;
            top: 0;
            color: #ADB4D2;
          }
          .card__designation{
            margin-bottom: 0;
          }
        }
      }
      .card__content{
        p{
          font-size: 15px;
          margin-bottom: 26px;
        }
        .image-group{
          margin: -3px;
        }
        img{
          max-width: 34px;
          margin: 3px;
        }
      }
      .card__info{
        padding-bottom: 30px;
        padding-top: 18px;
        .ant-progress-inner{
          position: relative !important;
        }
        p{
          font-size: 12px;
          color: ${({ theme }) => theme['light-color']};
        }
        h2{
          font-size: 14px;
          font-weight: 500;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        .info-line{
          display: flex;
          justify-content: space-between;
          .success{
            color: ${({ theme }) => theme['success-color']};
          }
        }
        .completed-count{
          margin-top: 4px;
        }
        .project-progress{
          display: flex;
          justify-content: space-between;
          .progress-percentage{
            ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
            span{
              font-size: 12px;
              color: ${({ theme }) => theme['gray-color']};
            }
          }
        }
      }
    }
  }
  .card{
    position: relative;
    box-shadow: 0 5px 20px ${({ theme }) => theme['light-color']}03;
    .ant-card-body{
      padding: 30px !important;
      div{
        position: static;
      }
    }
    figure{
      margin-bottom: 0;
      img{
        margin-bottom: 20px;
        width: 100%;
        border-radius: 50%;
        max-width: 150px;
      }      
    }
    .card__more_actions{
      position: absolute;
      ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 24px;
      top: 20px;
      line-height: .5;
      padding: 5px 3px;
      color: ${({ theme }) => theme['extra-light-color']};
      box-shadow: 0 10px 20px #9299B815;
      svg,
      img{
        width: 20px;
      }
    }
    .card__name{
      font-size: 16px;
      margin-bottom: 6px;
      font-weight: 500;
      a{
        color: ${({ theme }) => theme['dark-color']};
        &:hover{
          color: ${({ theme }) => theme['primary-color']};
        }
      }
    }
    .card__designation{
      font-size: 13px;
      margin-bottom: 25px;
      color: ${({ theme }) => theme['light-color']};
    }
    .card__social{
      margin-top: 16px;
      a{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 20px ${({ theme }) => theme['light-color']}15;
        background: #fff;
        &:not(:last-child){
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
        }
        &.facebook span.fa{
          color: #3B5998;
        }
        &.twitter span.fa{
          color: #1DA1F2;
        }
        &.dribble span.fa{
          color: #C2185B;
        }
        &.instagram span.fa{
          color: #FF0300;
        }
      }
    }
  }

  .user-card{
    .ant-card-body{
      padding: 30px 25px 18px 25px !important;
      @media only screen and (max-width: 1599px){
        padding: 20px  20px 20px !important;
      }
      @media only screen and (max-width: 767px){
        padding: 15px  15px 15px !important;
      }
    }
    figure{
      img{
        margin-bottom: 18px;
        max-width: 120px;
      }      
    }
    .card__actions{
      margin: -5px;
      .ant-btn-white{
        color: ${({ theme }) => theme['gray-color']};
        border: 1px solid ${({ theme }) => theme['border-color-light']};
        &:hover{
          border: 1px solid ${({ theme }) => theme['primary-color']};
        }
      }
      button{
        font-size: 13px;
        padding: 0px 22.7px;
        height: 38px;
        border-radius: 6px;
        box-shadow: 0px 3px 5px ${({ theme }) => theme['light-color']}05;
        margin: 5px;
        &:hover{
          color: #fff !important;
          background-color: ${({ theme }) => theme['primary-color']} !important;
          svg,
          i{
            color: #fff;
          }
        }
        svg,
        i{
          color: ${({ theme }) => theme['light-color']};
        }
      }
    }
    .card__info{
      padding-top: 20px;
      margin-top: 18px;
      border-top: 1px solid ${({ theme }) => theme['border-color-light']};
      .info-single{
        text-align: center;
      }
      .info-single__title{
        font-size: 16px;
        font-weight: 600;
        line-height: 1.5;
        margin-bottom: 4px;
      }
      p{
        margin-bottom: 0;
        color: ${({ theme }) => theme['light-color']};
      }
    }
  }
`;

const FaqCategoryBox = Styled.div`
  .faq-badge{
    font-weight: 400;
    color: ${({ theme }) => theme['light-color']};
    background: ${({ theme }) => theme['bg-color-light']};
  }
  ul{
    li{
      a{
        display: inline-block;
        font-weight: 500;
        position: relative;
        padding: ${({ theme }) => (!theme.rtl ? '12px 0 12px 20px' : '12px 20px 12px 0')};
        transition: all .3s ease;
        color: ${({ theme }) => theme['gray-color']};
        &.active{
          padding-left: 28px;
          &:before{
            opacity: 1;
            visibility: visible;
            ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: -15px;
          }
          &:after{
            ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 5px;
          }
          &.primary{
            &:after{
              background: ${({ theme }) => theme['primary-color']};
            }
          }
          &.secondary{
            &:after{
              background: ${({ theme }) => theme['secondary-color']};
            }
          }
          &.success{
            &:after{
              background: ${({ theme }) => theme['success-color']};
            }
          }
          &.warning{
            &:after{
              background: ${({ theme }) => theme['warning-color']};
            }
          }
          &.info{
            &:after{
              background: ${({ theme }) => theme['info-color']};
            }
          }
          &.danger{
            &:after{
              background: ${({ theme }) => theme['danger-color']}5;
            }
          }
        }
        &:before{
          position: absolute;
          ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: -25px;
          top: 0;
          height: 100%;
          width: 2px;
          border-radius: 10px;
          opacity: 0;
          visibility: hidden;
          content: '';
          background: ${({ theme }) => theme['primary-color']};
          transition: all .3s ease;
        }
        &:after{
          position: absolute;
          ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 0;
          top: 50%;
          transform: translatey(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          content: '';
          background: ${({ theme }) => theme['primary-color']}50;
          transition: all .3s ease;
        }
        &.secondary{
          &:after{
            background: ${({ theme }) => theme['secondary-color']}50;
          }
          &:before{
            background: ${({ theme }) => theme['secondary-color']};
          }
        }
        &.success{
          &:after{
            background: ${({ theme }) => theme['success-color']}50;
          }
          &:before{
            background: ${({ theme }) => theme['success-color']};
          }
        }
        &.warning{
          &:after{
            background: ${({ theme }) => theme['warning-color']}50;
          }
          &:before{
            background: ${({ theme }) => theme['warning-color']};
          }
        }
        &.info{
          &:after{
            background: ${({ theme }) => theme['info-color']}50;
          }
          &:before{
            background: ${({ theme }) => theme['info-color']};
          }
        }
        &.danger{
          &:after{
            background: ${({ theme }) => theme['danger-color']}50;
          }
          &:before{
            background: ${({ theme }) => theme['danger-color']};
          }
        }
      }
    }
  }
`;

const FaqSupportBox = Styled.div`
  text-align: center;
  .ant-card-body{
    padding: 30px 50px 40px 50px !important;
    @media only screen and (max-width: 1599px){
      padding: 30px !important;
    }
    @media only screen and (max-width: 991px){
      padding: 25px !important;
    }
  }
  figure{
    margin-bottom: 30px;
    img{
      width: 100%;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    color: ${({ theme }) => theme['dark-color']};
  }
  button{
    padding: 0 30px;
    border-radius: 6px;
    height: 44px;
  }
`;

const FaqWrapper = Styled.div`
  .ant-card{
    .ant-card-body{
      h1{
        font-weight: 500;
      }
    }
  }
  .ant-collapse{
    margin-top: 25px;
    &.ant-collapse-borderless{
      background: #fff;
    }
    &.ant-collapse-icon-position-left{
      .ant-collapse-header{
        color: ${({ theme }) => theme['dark-color']} !important;
      }
    }
  }
  .ant-collapse-item{
    border: 1px solid ${({ theme }) => theme['border-color-light']} !important;
    &.ant-collapse-item-active{
      box-shadow: 0px 15px 40px ${({ theme }) => theme['light-color']}15;
    }
    .ant-collapse-header{
      font-weight: 500;
      font-size: 15px;
      background-color: #fff;
      padding: 18px 25px !important;
      border-radius: 5px !important;
      @media only screen and (max-width: 575px){        
        padding: ${({ theme }) => (!theme.rtl ? '15px 45px 15px 15px' : '15px 15px 15px 45px')} !important;
      }
      .ant-collapse-arrow{
        ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: auto !important;
        ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 25px !important;
        top: 22px !important;
        transform: translateY(0) !important;
      }
    }
  }

  .ant-collapse-content{
    box-shadow: 0 15px 40px ${({ theme }) => theme['light-color']}15;
    .ant-collapse-content-box{
      border-top: 1px solid ${({ theme }) => theme['border-color-light']} !important;
      padding: 20px 25px 30px !important;
      P{
        font-size: 15px;
        margin-bottom: 35px;
        line-height: 1.667;
        color: ${({ theme }) => theme['gray-color']};
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6{
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 12px;
        color: ${({ theme }) => theme['dark-color']};
      }
      .panel-actions{
        button{
          height: 36px;
          padding: 0 15px;
          &:not(:last-child){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
          }
        }
      }
    }
  }
`;

const SearchResultWrapper = Styled.div`
  .ant-select{
    @media only screen and (max-width: 575px){
      width: 100% !important;
    }
  }
  .ant-select-selector{
    height: 48px !important;
    .ant-select-selection-search{
      height: 48px;
      width: 100% !important;
      input{
        height: 46px !important;
      }
    }
    .ant-input-affix-wrapper{
      border: 0 none;
    }
    .ant-select-selection-search-input {
      border-radius: 100px;
    }
  }
  .search-filter-menu{
    margin: 22px 0 20px;
    @media only screen and (max-width: 575px){
      text-align: center;
    }
    ul{
      li{
        display: inline-block;
        margin-bottom: 10px;
        &:not(:last-child){
          ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
        }
        a{
          font-size: 13px;
          font-weight: 500;
          display: block;
          padding: 5px 15px;
          border-radius: 5px;
          color: ${({ theme }) => theme['light-color']};
          box-shadow: 0 3px 6px ${({ theme }) => theme['light-color']}05;
          background: #fff;
          &.active{
            color: #fff;
            background: ${({ theme }) => theme['primary-color']};
          }
        }
      }
    }
  }
`;

const ResultList = Styled.div`
  .result-list-top{
    max-width: 1000px;
    border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
    margin-bottom: 20px;
    padding-bottom: 24px;
  }
  .search-found-text{
    font-size: 16px;
    margin-bottom: 0;
    color: ${({ theme }) => theme['light-color']};
    .result-count{
      ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 5px;
    }
    .result-keyword{
      ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 4px;
    }
    .result-count,
    .result-keyword{
      font-weight: 600;
      color: ${({ theme }) => theme['dark-color']};
    }
  }
  .result-limit{
    text-align: ${({ theme }) => (!theme.rtl ? 'right' : 'left')};
    margin-bottom: 0;
    color: ${({ theme }) => theme['light-color']};
    @media only screen and (max-width: 767px){
      text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
      margin-top: 10px;
    }
  }
  .result-list-content{
    border-bottom: 1px solid ${({ theme }) => theme['border-color-light']};
    padding-bottom: 14px;
    margin-bottom: 30px;
    ul{
      li{
        &:not(:last-child){
          margin-bottom: 35px;
        }
        .result-list-title{
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
          .search-keyword{
            font-weight: 600;
            color: ${({ theme }) => theme['primary-color']};
          }
        }
        p{
          color: ${({ theme }) => theme['gray-color']};
        }
      }
    }
  }
  .ant-pagination{
    @media only screen and (max-width: 575px){
      text-align: center;
    }
  }
`;

const MaintananceWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  img{
    margin-bottom: 72px;
    max-width: 400px;
    width: 100%;
    @media only screen and (max-width: 575px){
      margin-bottom: 30px;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  p{
    color: ${({ theme }) => theme['gray-color']};
  }
`;

const ErrorWrapper = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  img{
    margin-bottom: 100px;
    max-width: 400px;
    width: 100%;
    @media only screen and (max-width: 575px){
      margin-bottom: 30px;
    }
  }
  .error-text{
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 35px;
    color: ${({ theme }) => theme['extra-light-color']};
  }
  p{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 26px;
  }
  button{
    height: 44px;
  }
`;

const ComingsoonStyleWrapper = Styled.div`
  text-align: center;
  background: #fff;
  padding: 75px 0 30px;
  margin-bottom: 30px;
  @media only screen and (max-width: 1150px){
    padding: 50px 0 6px;
  }
  @media only screen and (max-width: 991px){
    padding: 20px 0 0px;
  }
  .strikingDash-logo{
    margin-bottom: 55px;
    @media only screen and (max-width: 1150px){
      margin-bottom: 30px;
    }
    @media only screen and (max-width: 767px){
      margin-bottom: 25px;
    }
    img{
      max-width: 170px;
    }
  }
  .coming-soon-content{
    h1{
      font-size: 58px;
      font-weight: 600;
      line-height: 1.5;
      margin-bottom: 25px;
      color: ${({ theme }) => theme['dark-color']};
      @media only screen and (max-width: 991px){
        font-size: 48px;
        margin-bottom: 15px;
      }
      @media only screen and (max-width: 767px){
        font-size: 40px;
        line-height: 1.45;
      }
      @media only screen and (max-width: 479px){
        font-size: 30px;
      }
      @media only screen and (max-width: 375px){
        font-size: 20px;
      }
    }
    p{
      font-size: 17px;
      max-width: 580px;
      margin: 0 auto 25px;
      color: ${({ theme }) => theme['gray-color']};
      @media only screen and (max-width: 991px){
        margin-bottom: 15px;
      }
      @media only screen and (max-width: 767px){
        font-size: 16px;
      }
      @media only screen and (max-width: 375px){
        font-size: 15px;
      }
    }
  }
  .countdwon-data{
    display: flex;
    justify-content: center;
    >span{
      &:not(:last-child){
        margin-right: 50px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 50px;
        @media only screen and (max-width: 575px){
          margin-right: 20px;
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
        }
      }
    }
  }
  .strikingDash-countdown{
    .countdown-time{
      font-size: 42px;
      font-weight: 600;
      line-height: 1.45;
      color: ${({ theme }) => theme['dark-color']};
      @media only screen and (max-width: 991px){
        font-size: 32px;
      }
      @media only screen and (max-width: 575px){
        font-size: 26px;
      }
      @media only screen and (max-width: 375px){
        font-size: 20px;
      }
    }
    .countdown-title{
      font-size: 16px;
      font-weight: 400;
      display: block;
      color: ${({ theme }) => theme['gray-color']};
      @media only screen and (max-width: 375px){
        font-size: 15px;
      }
    }
  }
  .subscription-form{
    margin-top: 40px;
    @media only screen and (max-width: 991px){
      margin-top: 25px;
    }
    @media only screen and (max-width: 1150px){
      margin-top: 35px;
    }
    .subscription-form-inner{
      display: flex;
      justify-content: center;
      @media only screen and (max-width: 375px){
        flex-flow: column;
        margin-bottom: 20px;
      }
      .ant-form-item-control-input{
        margin-right: 20px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
        @media only screen and (max-width: 375px){
          margin-right: 0;
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
        }
        .ant-input{
          min-width: 320px;
          padding: 12px 20px;
          @media only screen and (max-width: 767px){
            min-width: 100%;
          }
          &::placeholder{
            color: ${({ theme }) => theme['extra-light-color']};
          }
        }
      }
      button{
        font-size: 14px;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }
  .coming-soon-social{
    margin-top: 50px;
    @media only screen and (max-width: 1150px){
      margin-top: 25px;
    }
    @media only screen and (max-width: 767px){
      margin-top: 30px;
    }
    ul{
      margin-bottom: 30px;
      li{
        display: inline-block;
        &:not(:last-child){
          margin-right: 15px;
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          i,
          span,
          svg{
            color: #fff;
          }
          &.facebook{
            background-color: #3B5998;
          }
          &.twitter{
            background-color: #1DA1F2;
          }
          &.globe{
            background-color: #DD3E7C;
          }
          &.github{
            background-color: #23282D;
          }
        }
      }
    }
    p{
      font-size: 14px;
      color: ${({ theme }) => theme['light-color']};
    }
  }
`;

const AddUser = Styled.div`
  .form-title{
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 36px;
  }
  .add-user-wrap{
   $: 
  }
  .add-user-bottom{
    margin-top: 20px;
    button + button{
      ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
    }
    .ant-btn-light{
      background: ${({ theme }) => theme['bg-color-light']};
      border: 1px solid #F1F2F6;
    }
    &.text-right{
      @media only screen and (max-width: 767px){
        text-align: ${({ theme }) => (!theme.rtl ? 'left' : 'right')} !important;
      }
    }
  }
  .card-nav{
    ul{
      flex-wrap: wrap;
      margin-bottom: -4px -10px;
      @media only screen and (max-width: 575px){
        justify-content: center;
      }
      li{
        margin: 4px 10px !important;
        &:not(:last-child){
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 26px;
          @media only screen and (max-width: 575px){
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
          }
        }
        a{
          position: relative;
          padding: 22px 0;
          font-size: 14px;
          font-weight: 500;
          color: ${({ theme }) => theme['gray-color']};
          @media only screen and (max-width: 575px){
            padding: 0;
          }
          &:after{
            position: absolute;
            ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 0;
            bottom: -4px;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            content: '';
            opacity: 0;
            visibility: hidden;
            background-color: ${({ theme }) => theme['primary-color']};
            @media only screen and (max-width: 575px){
              display: none;
            }
          }
          &.active{
            color: ${({ theme }) => theme['primary-color']};
            &:after{
              opacity: 1;
              visibility: visible;
            }
            svg,
            img,
            i,
            span{
              color: ${({ theme }) => theme['primary-color']};
            }
          }
          svg,
          img,
          i,
          span{
            color: ${({ theme }) => theme['light-color']};
            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
          }
        }
      }
    }
  }

  /* // Photo Upload */
  .photo-upload{
    position: relative;
    max-width: 260px;
    margin-bottom: 30px;
    .ant-upload-select{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      position: absolute;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: 85px;
      bottom: 5px;
      z-index: 10;
      background-color: ${({ theme }) => theme['white-color']};
      span{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        z-index: -1;
        background-color: ${({ theme }) => theme['primary-color']};
      }
      svg,
      i,
      span{
        color: ${({ theme }) => theme['white-color']};
      }
      a{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    img{
      border-radius: 50%;
    }
    .info{
      background-color: transparent;
    }
    figcaption{
      ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
      .info{
        h1,
        h2,
        h3,
        h4,
        h5,
        h6{
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
  }

  .user-work-form{
    .ant-picker{
      padding: 0 15px 0 0;
    }
  }
  .user-info-form{
    .ant-select-single .ant-select-selector .ant-select-selection-item{
      color: ${({ theme }) => theme['gray-color']};
    }
  }
  .social-form{
    .ant-form-item-control-input-content{
      .ant-input-prefix{
        width: 44px;
        height: 44px;
        border-radius: 4px;
      }
    }
    .ant-form-item-control-input{
      height: 44px;
      .ant-input-affix-wrapper{
        &:hover,
        &:focus,
        &.ant-input-affix-wrapper-focused{
          border-color: #E3E6EF;
        }
        .ant-input{
          height: 42px;
          ${({ theme }) => (!theme.rtl ? 'padding-left' : 'padding-right')}: 0;
        }
      }
    }
    .ant-input-prefix{
      position: relative;
      ${({ theme }) => (!theme.rtl ? 'left' : 'right')}: -11px;
      span{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme['primary-color']};
        i,
        svg,
        span.fa{
          color: #fff;
          font-size: 16px;
        }
        .fa-facebook{
          background-color: #3B5998;
        }
        .fa-twitter{
          background-color: #38B8FF;
        }
        .fa-linkedin{
          background-color: #2CAAE1;
        }
        .fa-instagram{
          background-color: #FF0300;
        }
        .fa-github{
          background-color: #292929;
        }
        .fa-youtube{
          background-color: #FE0909;
        }
      }
    }
  }
`;
const ChangelogWrapper = Styled.div`
   .ant-card-head{
     .ant-card-head-title{
       .v-num{
        $: 0;
         font-size: 18px;
         color: ${({ theme }) => theme['dark-color']};
       }
       .sign{
         font-size: 18px;
         color: ${({ theme }) => theme['dark-color']};
         display: inline-block;
         margin: 0 8px;
       }
       .rl-date{
        $: 0;
         font-weight: 400;
         font-size: 16px;
       }
     }
   }
  .version-list{
    .version-list__single{
      &:not(:last-child){
        margin-bottom: 30px;
      }
      ul{
        li{
          position: relative;
          ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 20px;
          font-size: 16px;
          color: ${({ theme }) => theme['gray-color']};
          &:not(:last-child){
            margin-bottom: 12px;
          }
          &:after{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            content: "";
          }
        }
        &.version-primary{
          li{
            &:after{
              background-color: ${({ theme }) => theme['primary-color']};
            }
          }
        }
        &.version-success{
          li{
            &:after{
              background-color: ${({ theme }) => theme['success-color']};
            }
          }
        }
        &.version-info{
          li{
            &:after{
              background-color: ${({ theme }) => theme['info-color']};
            }
          }
        }
      }
    }
    .version-list__top{
      .badge{
        font-size: 12px;
        line-height: 1.2;
        letter-spacing: 1.4px;
        font-weight: 500;
        display: inline-block;
        padding: 5px 8px;
        height: auto;
        border-radius: 4px;
        margin-bottom: 14px;
        color: #fff;
        &.badge-primary{
          background-color: ${({ theme }) => theme['primary-color']};
        }
        &.badge-info{
          background-color: ${({ theme }) => theme['info-color']};
        }
        &.badge-success{
          background-color: ${({ theme }) => theme['success-color']};
        }
      }
    }
  }

  .changelog-accordion{
    margin-top: 30px;
    .ant-collapse{
      background-color: transparent;
      border: 0 none;
    }
    .ant-collapse-item{
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme['border-color-normal']};
      &:not(:last-child){
        margin-bottom: 20px;
      }
      &:last-child{
        border-radius: 6px;
        .ant-collapse-header{
          border-radius: 6px;
        }
      }
    }
    .ant-collapse-header{
      border-radius: 6px;
      padding: 20px 30px 18px 30px !important;
      @media only screen and (max-width: 575px){
        padding: 16px 20px 14px 20px !important;
      }
      .ant-collapse-arrow{
        left: auto !important;
        right: 30px;
        svg,
        img{
          width: 14px;
        }
      }
      .v-num{
        font-size: 18px;
        font-weight: 500;
        color: ${({ theme }) => theme['dark-color']};
        @media only screen and (max-width: 575px){
          font-size: 16px;
        }
      }
      .rl-date{
        font-size: 16px;
        font-weight: 400;
        @media only screen and (max-width: 575px){
          font-size: 14px;
        }
      }
    }
    .ant-collapse-content{
      border-radius: 0 0 6px 6px;
      > .ant-collapse-content-box{
        padding: 30px 30px 25px;
      }
    }
  }
`;
const VersionHistoryList = Styled.div`
  .history-title{
    font-size: 11px;
    margin-bottom: 24px;
    color: ${({ theme }) => theme['light-gray-color']};
  }
  .v-history-list{
    li{
      display: flex;
      justify-content: space-between;
      &:not(:last-child){
        margin-bottom: 24px;
      }
      .version-name{
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme['dark-color']};
      }
      .version-date{
        font-size: 14px;
        color: ${({ theme }) => theme['light-gray-color']};
      }
    }
  }
`;

const TestimonialWrapper = Styled.div`
  position: relative;
  padding: 0 150px;
  .button-group {
      width: 100%;   
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 50%;
      left: 0;
  }
`;

const UserCarrdTop = Styled.div`
  .ant-page-header-heading-extra{
    .btn-add_new{
      margin-right: 15px;
      @media only screen and (max-width: 575px){
        margin-right: 6px;
      }
    }
    .action-btn{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      color: ${({ theme }) => theme['light-color']};
      @media only screen and (max-width: 575px){
        height: 30px;
        width: 30px;
      }
      &.active{
        background-color: #fff;
        color: ${({ theme }) => theme['primary-color']};
      }
    }
  }
`;

const SupportTopWrap = Styled.div`
  background-color: ${({ theme }) => theme['bg-color-light']};
  border-radius: 10px;
  box-shadow: 0 5px 20px #9299B810;
  margin-bottom: 50px;
  .sDash-support-container{
    max-width: 1110px;
    margin: 0 auto;
    @media only screen and (max-width: 1599px){
      max-width: 990px;
    }
    @media only screen and (max-width: 1399px){
      max-width: 790px;
    }
    @media only screen and (max-width: 1150px){
      max-width: 100%;
      padding: 30px
    }
  }
  .sDash_support-content{
    .sDash_support-content__title{
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 10px;
      color: ${({ theme }) => theme['dark-color']};
      @media only screen and (max-width: 767px){
        font-size: 26px;
      }
    }
    p{
      color: ${({ theme }) => theme['gray-color']};
    }
    .btn-ticket{
      margin-top: 15px;
      height: 46px;
      font-size: 14px;
      font-weight: 500;
      @media only screen and (max-width: 575px){
        margin-top: 0;
      }
    }
  }
  .sDash_support-img{
    margin-top: 50px;
    @media only screen and (max-width: 1150px){
      margin-top: 0;
    }
    img{
      width: 100%;
      @media only screen and (max-width: 575px){
        margin-top: 30px;
      }
    }
  }
`;

const SupportContentWrap = Styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 20px #9299B810;
  padding: 100px 0 50px 0;
  @media only screen and (max-width: 1599px){
    padding: 50px 0 20px 0;
  }
  @media only screen and (max-width: 1199px){
    margin-bottom: 30px;
  }
  .sDash-support-container{
    max-width: 1110px;
    margin: 0 auto;
    @media only screen and (max-width: 1599px){
      max-width: 990px;
    }
    @media only screen and (max-width: 1399px){
      max-width: 790px;
    }
    @media only screen and (max-width: 1150px){
      max-width: 100%;
      padding: 30px
    }
  }
  .sDash-support-link-item{
    max-width: 350px;
    margin: 0 auto 30px;
    padding: 30px;
    text-align: center;
    border-radius: 6px;
    transiiton: .35s;
    border: 1px solid ${({ theme }) => theme['border-color-light']};
    &:hover{
      box-shadow: 0 15px 25px #9299BB15;
      border-color: #fff;
    }
    .sDash-support-link-item__icon{
      height: 80px;
      width: 80px;
      margin: 0 auto 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      &.primary{
        background-color: ${({ theme }) => theme['primary-color']};
      }
      &.success{
        background-color: ${({ theme }) => theme['success-color']};
      }
      &.info{
        background-color: ${({ theme }) => theme['info-color']};
      }
    }
    .sDash-support-link-item__title{
      font-size: 20px;
      font-weight: 500;
      color: ${({ theme }) => theme['dark-color']};
    }
    .sDash-support-link-item__content{
      .btn-link{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        background-color: #EFEFFE;
        border-radius: 20px; 
        margin: 36px auto 0;
        font-size: 15px;
        padding: 0 24.5px;
        width: fit-content;
      }
    }
  }
  .sDash_faq-block{
    margin-top: 70px;
    @media only screen and (max-width: 1150px){
      margin-top: 20px;
    }
    .ant-card{
      border: 1px solid ${({ theme }) => theme['border-color-normal']};
      .ant-card-body{
        h1{
          color: ${({ theme }) => theme['dark-color']};
        }
      }
    }
    .ant-collapse-item {
      &.ant-collapse-item-active{
        box-shadow: 0 0;
      }
      .ant-collapse-header{
        background-color: #fff !important;
        padding: 19.5px 25px !important
        .ant-collapse-arrow{
          color: #9299B8;
        }
      }
      .ant-collapse-content{
        box-shadow: 0 0;
      }
    }
  }
`;

const SettingWrapper = Styled.div`
    .cover-image{
        position: relative;
        .ant-upload-select{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 20px;
            top: 20px;
            border: 1px solid #ffffff50;
            border-radius: 6px;
            @media only screen and (max-width: 991px){
                top: 50%;
                ${({ theme }) => (theme.rtl ? 'left' : 'right')}: auto;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            a{
                color: #fff;
                padding: 8px 17.35px;
                display: inline-flex;
                align-items: center;
                @media only screen and (max-width: 479px){
                    padding: 5px 10px;
                }
                i,
                svg,
                img
                {
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 8px;
                }
            }
        }
        .ant-upload-list {
            display: none;
        }
    }
    .coverWrapper{
        position: relative;
        z-index: 1;
        margin-bottom: 25px;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
        nav{
            padding: 0 25px;
            ul{
                margin: 0;
                @media only screen and (max-width: 375px){
                    text-align: center;
                    padding: 10px 0;
                }
                li{
                    display: inline-block;
                    @media only screen and (max-width: 375px){
                        display: block;
                    }
                    &:not(:last-child){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 22px;
                        @media only screen and (max-width: 375px){
                            ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0;
                        }
                    }
                    a{
                        position: relative;
                        display: block;
                        padding: 20px 5px;
                        color: ${({ theme }) => theme['light-color']};
                        @media only screen and (max-width: 375px){
                            padding: 10px 5px;
                        }
                        &:after{
                            position: absolute;
                            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
                            bottom: 0;
                            width: 100%;
                            height: 1.5px;
                            content: '';
                            opacity: 0;
                            visibility: hidden;
                            background-color: ${({ theme }) => theme['primary-color']};
                            @media only screen and (max-width: 375px){
                                display: none;
                            }
                        }
                        &.active{
                            font-weight: 500;
                            color: ${({ theme }) => theme['primary-color']};
                            &:after{
                                opacity: 1;
                                visibility: visible;
                            }
                        }
                    }
                }
            }
        }

    }
    .setting-card-title{
        @media only screen and (max-width: 479px){
            text-align: center;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6{
            margin-bottom: 0;
            font-size: 16px;
            font-weight: 500;
        }
        span{
            font-size: 13px;
            font-weight: 400;
            margin: 0;
            color: ${({ theme }) => theme['light-color']};
        }
    }
`;

export {
  Main,
  ButtonsGroupWrapper,
  BlockButtonsWrapper,
  ButtonSizeWrapper,
  BtnWithIcon,
  AlertList,
  AutoCompleteWrapper,
  CalendarWrapper,
  DatePickerWrapper,
  NotificationListWrapper,
  TagInput,
  PageHeaderWrapper,
  MessageStyleWrapper,
  BasicFormWrapper,
  CardToolbox,
  FormGroupWrapper,
  DragDropStyle,
  BannerCardStyleWrap,
  FileCardWrapper,
  TableWrapper,
  ImportStyleWrap,
  ExportStyleWrap,
  TestimonialWrapper,
  PricingCard,
  ListGroup,
  Badge,
  GalleryNav,
  UserCard,
  GalleryCard,
  UsercardWrapper,
  UserTableStyleWrapper,
  FaqCategoryBox,
  FaqSupportBox,
  FaqWrapper,
  SearchResultWrapper,
  ResultList,
  MaintananceWrapper,
  ErrorWrapper,
  ComingsoonStyleWrapper,
  AddUser,
  ChangelogWrapper,
  VersionHistoryList,
  UserCarrdTop,
  SupportTopWrap,
  SupportContentWrap,
  SettingWrapper,
};
