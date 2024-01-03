import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
	height: auto;
`;

interface IconPropsType {
	className?: string;
	onClick?: () => void;
}

export const BreakIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
	return (
		<SvgElement
			className={className}
			width="1000"
			height="1000"
			fill="fill" // TODO
			xmlns="http://www.w3.org/2000/svg"
			onClick={() => onClick}
			viewBox="0 0 1000 1000"
		>
            <path d="M577.42 11.6c-83.91 6.38-168.22 30.5-241.17 68.96-29.1 15.35-78.73 48.63-103.44 69.36l-20.73 17.34-7.77-4.39c-14.95-8.37-35.08-2.39-42.25 12.76-4.39 9.37-3.99 20.13 1 29.1l4.19 7.38-17.34 20.73c-33.09 39.26-69.56 98.86-89.49 145.9-65.41 153.87-67.2 319.71-5.21 474.77 13.16 33.09 49.23 100.26 52.02 97.07.8-.8 4.19-7.97 7.37-15.95 25.51-61.19 79.53-111.22 144.7-134.14l15.75-5.58 6.38-17.54c12.76-35.68 31.29-64.78 57.8-91.29 26.51-26.51 55.61-44.85 91.49-57.8l17.74-6.38 6.38-17.74c9.97-27.9 25.51-55.81 40.86-73.35l6.58-7.38 233.4 233.2c175.6 175.6 234.59 233.4 237.98 233.4 5.98 0 16.34-10.37 16.34-16.34 0-3.39-57.8-62.39-233.4-237.99L523.4 502.32l7.38-6.58c17.54-15.35 45.44-30.89 73.35-40.86l17.74-6.38 6.38-17.74c12.96-35.88 31.29-64.98 57.8-91.49s55.61-44.85 91.49-57.8l17.74-6.38 5.38-15.75c23.52-68.76 73.35-119.99 146.5-150.08l5.78-2.39-9.77-6.18C836.93 34.52 703.38 2.03 577.42 11.6zm110.42 32.69c64.38 7.57 133.94 27.51 184.17 52.62l14.75 7.38-16.74 12.16c-40.06 29.1-74.15 72.15-92.28 116.4-3.79 9.17-7.97 17.54-9.57 18.54-1.79 1.2-8.97-2.59-23.52-12.16-129.36-87.1-269.68-131.95-382.49-122.38-15.55 1.4-29.7 2.99-31.69 3.59-13.95 4.58 43.25-24.92 69.76-35.88 50.83-20.93 116.6-37.27 170.22-41.86 23.71-2.2 94.07-1.2 117.39 1.59zM261.5 203.74c65.18 13.55 174 82.92 300.57 191.94l33.68 28.9-10.76 4.39c-72.95 29.9-126.17 83.12-156.06 156.06l-4.39 10.77-28.9-33.68C286.61 435.55 217.25 326.72 203.7 261.54c-4.98-24.52-3.19-38.27 6.58-49.03 10.16-11.36 25.71-13.95 51.22-8.77zM118.99 340.87c-14.75 105.64 20.93 242.57 95.07 364.75 5.78 9.57 16.94 26.91 24.72 38.67 9.97 14.95 13.75 22.12 12.56 23.92-1 1.59-9.37 5.78-18.54 9.57-44.05 17.94-87.3 52.42-116.4 92.28l-12.16 16.74-7.38-14.75c-25.51-50.83-45.24-120.19-52.82-186.16-4.38-38.07-2.99-114.41 2.99-151.28 7.57-46.84 20.53-93.08 37.47-134.34 6.98-16.94 34.68-72.55 35.48-71.55.4.39-.19 5.77-.99 12.15z"/>
        </SvgElement>
	);
});
