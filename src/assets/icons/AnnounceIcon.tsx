import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

const SvgElement = styled("svg")`
  height: auto;
`;

interface IconPropsType {
  className?: string;
  onClick?: () => void;
}

export const AnnouncementIcon = observer(
  ({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width="800"
            height="800"
            fill="#fff"
            stroke="#000"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            onClick={onClick}
            viewBox="0 0 483.656 483.656"
        >
            <path d="M173.062 92.822a40.167 40.167 0 0 0-7.117 9.665c-1.271 2.402-22.561 55.043-22.561 55.043-16.308 39.85-40.015 75.493-70.461 105.939l-14.875 14.875c-30.985 30.985-31.393 81.136-.91 111.796 14.871 14.957 34.665 23.192 55.735 23.192h.065c11.676 0 22.961-2.539 33.237-7.341l27.615 27.615a7.474 7.474 0 0 0 5.303 2.197 7.476 7.476 0 0 0 4.932-1.861l38.884 38.884c7.22 7.22 16.704 10.83 26.188 10.83 9.484 0 18.968-3.61 26.188-10.83 14.44-14.44 14.44-37.935 0-52.375l-38.866-38.866 5.254-5.254a7.497 7.497 0 0 0 0-10.606l-21.867-21.867c21.578-16.055 45.081-29.328 70.271-39.637 0 0 52.504-21.121 56.655-23.442 4.351-2.432 8.057-6.231 8.057-6.231 28.427-26.493 9.089-88.913-41.862-139.864-50.952-50.952-112.388-69.34-139.865-41.862zM159.476 398.08a79.692 79.692 0 0 0 9.039-7.777l15.621-15.621a329.29 329.29 0 0 1 7.22-6.977l18.864 18.865-31.127 31.127-19.617-19.617zm74.04 64.14-38.866-38.866 14.772-14.772 38.869 38.87a21.885 21.885 0 0 1 6.452 15.578v.051c-.008 3.13-2.667 5.579-5.797 5.562-5.593-.031-11.172-2.165-15.43-6.423zm31.162-31.162c6.711 6.711 8.155 16.702 4.381 24.852-1.39-7.178-4.877-13.78-10.161-19.064l-38.87-38.87 5.784-5.784 38.866 38.866zm-38.915-60.03-4.936 4.936-18.3-18.3a317.988 317.988 0 0 1 5.363-4.508l17.873 17.872zm58.631-80.69c-41.703 17.067-79.003 41.876-110.864 73.738l-15.621 15.621c-12.018 12.018-27.987 18.635-44.977 18.635h-.053c-17.052 0-33.071-6.665-45.104-18.768-24.668-24.811-24.274-65.46.879-90.613l14.875-14.875c31.862-31.862 56.67-69.162 73.737-110.864l5.902-14.421c6.597 26.437 24.522 56.664 51.755 83.896 23.677 23.677 50.77 41.268 76.291 49.533 2.59.839 5.136 1.571 7.638 2.201l-14.458 5.917zm-58.816-115.495c.114.385.22.767.346 1.156 3.029 9.352 9.4 19.205 17.941 27.746 9.326 9.326 19.522 15.562 28.88 18.299l-21.893 21.893c-8.685-6.409-17.204-13.74-25.322-21.858-8.119-8.119-15.452-16.639-21.861-25.327l21.909-21.909zm61.937 32.433-.001-.001-.016.016c-3.789 3.736-18.864.01-33.027-14.152-6.795-6.795-11.999-14.727-14.277-21.761-1.681-5.192-1.627-9.515.141-11.283.909-.909 2.492-1.365 4.523-1.365 1.919 0 4.237.408 6.76 1.225 7.034 2.278 14.965 7.482 21.761 14.277 14.181 14.181 17.899 29.28 14.136 33.044zm56.666 56.666c-1.73 1.73-2.546 2.479-5.479 4.098a31.99 31.99 0 0 1-5.832 2.457c-9.679 2.964-22.5 2.159-37.034-2.548-10.586-3.428-21.513-8.677-32.353-15.431l34.615-34.615.024-.021c11.436-11.437 5.358-34.762-14.137-54.257-8.541-8.541-18.394-14.912-27.746-17.941-11.06-3.582-20.477-2.231-26.512 3.804l-.004-.004-34.636 34.636c-6.752-10.839-11.999-21.764-15.427-32.348-4.715-14.558-5.516-27.398-2.535-37.083 0 0 .974-3.228 2.14-5.229 1.166-2.001 2.661-4.292 4.402-6.033 5.725-5.725 13.985-8.424 23.861-8.424 26.024 0 63.254 18.75 94.791 50.286 43.504 43.505 62.674 97.841 41.862 118.653zM441.617 176.572h-68.6a7.5 7.5 0 0 0 0 15h68.6a7.5 7.5 0 0 0 0-15zM341.779 145.392a7.5 7.5 0 0 0 9.967 3.627l75.91-35.4a7.5 7.5 0 1 0-6.34-13.594l-75.91 35.4a7.501 7.501 0 0 0-3.627 9.967zM315.146 116.937a7.47 7.47 0 0 0 4.817 1.755c2.14 0 4.266-.911 5.749-2.679l56.35-67.15a7.5 7.5 0 0 0-.924-10.566 7.5 7.5 0 0 0-10.566.924l-56.35 67.15a7.5 7.5 0 0 0 .924 10.566zM283.326 92.646a7.504 7.504 0 0 0 9.186-5.304l20.87-77.9a7.5 7.5 0 0 0-14.49-3.882l-20.87 77.9a7.5 7.5 0 0 0 5.304 9.186z"/>
        </SvgElement>
    );
  }
);
