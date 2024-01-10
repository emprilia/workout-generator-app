import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface IconPropsType {
    className?: string;
    onClick?: () => void;
}

export const ExitIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='800'
            height='800'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox="0 0 471.851 471.851"
        >
            <path d="M340.109 355.875c-5.707 0-11.023 2.153-14.578 5.926-3.438 3.646-5.094 8.516-4.764 14.062 1.087 18.758 1.366 37.374 1.438 54.903-24.923.365-53.802.558-83.906.558-56.414.006-107.818-.665-145.585-1.878-.317-75.389-2.133-151.893-3.89-225.927-1.246-52.654-2.541-107.049-3.285-160.649 29.66-1.623 68.789-2.381 122.435-2.381 26.509 0 52.722.183 76.279.348 9.282.068 18.159.124 26.481.178.544 11.656 1.468 23.237 2.519 35.878.036.421.102.815.193 1.3a19.336 19.336 0 0 0-.208 2.798v12.022c0 11.154 9.074 20.225 20.23 20.225s20.23-9.071 20.23-20.225V80.989c0-.317-.021-.63-.061-.932.137-1.34.152-2.656.04-4.009-1.411-16.955-2.874-34.489-2.985-52.206-.03-4.522-1.407-8.653-3.977-11.989-3.184-7.021-9.76-11.192-17.742-11.212-15.335-.031-32.275-.15-50.16-.287C255.363.183 230.286 0 205.056 0 143.074 0 98.469 1.166 64.68 3.662c-6.807.505-12.454 3.89-15.942 9.551-2.61 3.385-3.963 7.607-3.905 12.226.686 59.694 2.143 120.355 3.552 179.026 1.902 79.232 3.867 161.16 3.966 241.737.013 8.196 4.296 14.817 11.535 17.936 3.468 3.271 7.939 5.093 13.004 5.281 41.172 1.569 97.814 2.432 159.484 2.432 37.234 0 74.959-.319 106.219-.919 8.709-.162 15.757-5.312 18.474-13.456 1.102-2.514 1.655-5.302 1.655-8.277-.005-26.329-.116-50.069-1.508-73.945-.752-12.727-11.182-19.379-21.105-19.379z"/>
            <path d="M406.383 142.679h-117.84c-.152-16.618-.645-33.215-2.356-49.777-.091-.942-.33-1.78-.533-2.643-.797-14.117-18.54-26.015-30.554-12.659-41.36 45.956-82.726 91.911-124.083 137.867-7 3.146-12.299 10.836-11.832 18.943-.467 8.104 4.832 15.797 11.832 18.94 41.357 45.956 82.723 91.911 124.083 137.872 12.014 13.351 29.757 1.447 30.554-12.659.203-.863.442-1.706.533-2.646 1.712-16.56 2.204-33.159 2.356-49.779h117.84c8.805 0 14.31-5.113 16.508-11.518 2.504-2.858 4.129-6.672 4.129-11.552V165.745c0-4.888-1.625-8.694-4.124-11.547-2.204-6.401-7.708-11.519-16.513-11.519zM390.6 227.796v61.923H275.264c-1.721 0-3.265.244-4.737.6-9.146-.051-18.332 5.814-18.337 17.61 0 8.49-.056 16.98-.198 25.477a593598.974 593598.974 0 0 0-89.09-98.995c29.696-33 59.392-65.996 89.09-98.995.138 8.487.198 16.978.198 25.479 0 11.793 9.191 17.661 18.337 17.608 1.468.358 3.017.602 4.737.602H390.6v48.691z"/>
        </SvgElement>
    );
});
// 