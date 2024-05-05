import styled from '@emotion/styled';
import { keyframes } from '@emotion/react'
import { AppLogoLarge } from '../common/common.style';

export const MainLoaderWrapper = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const MainLoader = styled('div')`
	display: grid;
    grid-template-columns: repeat(3, 1fr);
	grid-gap: 2px;
	width: 200px;
	height: 200px;
`;

const animateScale = keyframes`
	0%   { transform: scale(0.0); }
	40%  { transform: scale(1.0); }
	80%  { transform: scale(1.0); }
	100% { transform: scale(0.0); }
`;

export const MainEmojiWrapper = styled('div')`
		width: 100%;
		height: 100%;
		animation: ${animateScale} 2s infinite ease-in-out;
        font-size: 32px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
		
		&:nth-of-type(1) {
            animation-delay: 0.5s;
        }
		&:nth-of-type(5) {
            animation-delay: 0.8s;
        }
		&:nth-of-type(9) {
			animation-delay: 0.1s;
		}
		&:nth-of-type(4) {
            animation-delay: 0.4s;
        }
		&:nth-of-type(8) {
			animation-delay: 0.2s;
		}
		&:nth-of-type(2) {
            animation-delay: 0.7s;
        }
		&:nth-of-type(6) {
			animation-delay: 0.3s;
		}
		&:nth-of-type(3) {
			animation-delay: 0.6s;
		}
`;

const spinnerAnimation = keyframes`to { transform: rotate(1turn) }`;

export const Spinner = styled('div')`
    width:20px;
    height:20px;
    border-radius:50%;
    background:conic-gradient(#0000 10%,var(--colorPrimary));
    mask:radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 0);
    -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 0);
    animation: ${spinnerAnimation} 1s infinite linear;
`;

export const AppLogoWrapper = styled(AppLogoLarge)`
    margin-bottom: 32px;
`;
