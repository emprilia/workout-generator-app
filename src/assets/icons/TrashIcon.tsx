import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface IconPropsType {
    className?: string;
    onClick?: () => void;
}

export const TrashIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='16'
            height='16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox="0 0 16 16"
        >
            <path fill='#fill' fillRule='evenodd' d='M9.34 6.047c.335 0 .606.272.606.606v4.714a.606.606 0 1 1-1.212 0V6.653c0-.334.271-.606.606-.606ZM6.647 6.047c.334 0 .606.272.606.606v4.714a.606.606 0 1 1-1.212 0V6.653c0-.334.27-.606.606-.606Z' clipRule='evenodd'/>
            <path fill='#fill' fillRule='evenodd' d='M3.347 3.96c0-.335.271-.606.606-.606h8.08c.335 0 .607.27.607.606v9.427a1.28 1.28 0 0 1-1.28 1.28H4.626a1.28 1.28 0 0 1-1.28-1.28V3.96Zm1.212.606v8.821c0 .037.03.068.067.068h6.734c.037 0 .068-.03.068-.068V4.566h-6.87Z' clipRule='evenodd'/>
            <path fill='#fill' fillRule='evenodd' d='M2 3.96c0-.335.271-.606.606-.606H13.38a.606.606 0 0 1 0 1.212H2.607A.606.606 0 0 1 2 3.96Z' clipRule='evenodd'/>
            <path fill='#fill' fillRule='evenodd' d='M4.693 2.613c0-.707.573-1.28 1.28-1.28h4.04c.707 0 1.28.573 1.28 1.28V3.96a.606.606 0 0 1-.606.606H5.299a.606.606 0 0 1-.606-.606V2.613Zm1.28-.068a.067.067 0 0 0-.068.068v.74h4.176v-.74a.067.067 0 0 0-.068-.068h-4.04Z' clipRule='evenodd'/>
        </SvgElement>
    );
});
// 