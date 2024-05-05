import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

const SvgElement = styled('svg')`
    height: auto;
`;

interface IconPropsType {
    className?: string;
    onClick?: () => void;
}

export const KeyboardIcon = observer(({ className, onClick }: IconPropsType): JSX.Element => {
    return (
        <SvgElement
            width='24'
            height='24'
            fill='#fff'
            stroke='#000'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            onClick={onClick}
            viewBox='0 0 512 512'
        >
            <path d="M459.576 99.307H52.423C23.524 99.307 0 122.837 0 151.736v192.879c0 37.536 30.537 68.078 68.068 68.078H443.93c37.532 0 68.069-30.542 68.069-68.078V151.736c.001-28.899-23.524-52.429-52.423-52.429zm25.939 245.308c0 22.934-18.655 41.589-41.584 41.589H68.068c-22.929 0-41.584-18.655-41.584-41.589V151.736c0-14.306 11.638-25.938 25.938-25.938h407.154c14.301 0 25.938 11.633 25.938 25.938v192.879z" className="st0"/>
            <path d="M189.792 233.929h44.138v44.142h-44.138zM256.002 233.929h44.134v44.142h-44.134zM322.207 233.929h44.138v44.142h-44.138zM410.484 300.139h44.134v44.134h-44.134zM189.792 167.729h44.138v44.134h-44.138zM123.587 233.929h44.138v44.142h-44.138zM123.587 167.729h44.138v44.134h-44.138zM57.382 300.139h44.134v44.134H57.382zM57.382 233.929h44.134v44.142H57.382zM57.382 167.729h44.134v44.134H57.382zM256.002 167.729h44.134v44.134h-44.134zM322.207 167.729h44.138v44.134h-44.138zM123.587 300.139h264.825v44.134H123.587zM388.412 167.729h66.205v110.343h-66.205z" className="st0"/>
        </SvgElement>
    );
});
