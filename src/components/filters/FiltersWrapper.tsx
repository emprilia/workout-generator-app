import { observer } from 'mobx-react-lite';
import { FiltersState, FiltersType, SortType, TabType } from './FiltersState';
import {
    ItemsWrapper,
    Item,
    SortIconWrapper,
    ItemsContainer,
    ShowHideIconWrapper
} from './Filters.style';

interface FiltersPropsType {
    filtersState: FiltersState;
    type: TabType;
}

export const sortOptions: Array<SortType> = [
    {
        label: 'A-Z',
        value: 'alphabet'
    },
    {
        label: 'Z-A',
        value: 'alphabet-reversed'
    },
    {
        label: 'New',
        value: 'newest'
    },
    {
        label: 'Old',
        value: 'oldest'
    },
    // {
    //     label: 'Last updated',
    //     value: 'last-updated'
    // }, // TODO
];

export const filtersOptions: Array<FiltersType> = [
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Inactive',
        value: 'inactive'
    },
    {
        label: 'Favorites',
        value: 'favorites'
    },
    // { // TODO
    //     label: 'Non-favorites',
    //     value: 'non-favorites'
    // },
    {
        label: 'All',
        value: 'all'
    },
];

export const FiltersWrapper = observer((props: FiltersPropsType) => {
    const { filtersState, type } = props;
    const {
        showOnly,
        sortExercises,
        filterOption,
        sortOption,
        openTab,
        setOpen
    } = filtersState;

    return (
        <ItemsContainer>
            <ItemsWrapper isOpen={openTab === type}>
                {type === 'sort' ? <>{sortOptions.map((option) => (
                    <Item key={option.value}  isActive={sortOption === option.value} onClick={() => sortExercises(option.value)}>{option.label}</Item>
                ))}</> : <>{filtersOptions.map((option) => (
                    <Item key={option.value} isActive={filterOption === option.value} onClick={() => showOnly(option.value)}>{option.label}</Item>
                ))}</>}
            </ItemsWrapper>
            {type === 'sort' ? <SortIconWrapper onClick={() => setOpen('sort')} /> : <ShowHideIconWrapper onClick={() => setOpen('filter')} />}
        </ItemsContainer>
    );
});
