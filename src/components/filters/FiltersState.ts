import { makeAutoObservable, action, observable } from 'mobx';
import { ExerciseType } from '../../api/supabaseExercises';

export type TabType = 'sort' | 'filter' | '';
type SortOptionType = 'alphabet' | 'newest' | 'oldest' | 'last-updated' | 'alphabet-reversed' | 'oldest' | 'default';
type FilterOptionType = 'active' | 'inactive' | 'favorites' | 'all' | 'non-favorites';

export interface FiltersType {
    label: string;
    value: FilterOptionType;
}

export interface SortType {
    label: string;
    value: SortOptionType;
}

export class FiltersState {
    @observable public openTab: '' | TabType = '';
    @observable public sortOption: SortOptionType = 'oldest';
    @observable public filterOption: FilterOptionType = 'all';
    @observable public filteredExercises: Array<ExerciseType> = this.allExercises;

    public constructor(
        private allExercises: Array<ExerciseType>,
        private updateShowing: (showing: Array<ExerciseType>, type: TabType) => void,
    ) {
        makeAutoObservable(this);
    }

    @action sortExercises = (sortBy: SortOptionType): void => {
        if (sortBy === 'alphabet') {
            this.updateShowing(this.filteredExercises.sort((a, b) => {
                if (a.label.toLowerCase() < b.label.toLowerCase()) {
                    return -1;
                }
                if (a.label.toLowerCase() > b.label.toLowerCase()) {
                    return 1;
                }
                return 0;
            }), 'sort');
        } else if (sortBy === 'alphabet-reversed') { 
            this.updateShowing(this.filteredExercises.sort((a, b) => {
                if (a.label.toLowerCase() > b.label.toLowerCase()) {
                    return -1;
                }
                if (a.label.toLowerCase() < b.label.toLowerCase()) {
                    return 1;
                }
                return 0;
            }), 'sort');
        } else if (sortBy === 'last-updated') {
            // TODO
        } else if (sortBy === 'newest') {
            this.updateShowing(this.filteredExercises.sort((a, b) => b.id - a.id), 'sort');
        } else if (sortBy === 'oldest') {
            this.updateShowing(this.filteredExercises.sort((a, b) => a.id - b.id), 'sort');
        } else {
            this.updateShowing(this.filteredExercises, 'sort');
        }
        this.sortOption = sortBy;
    }

    @action showOnly = (show: FilterOptionType): void => {
        if (show === 'active') {
            this.updateShowing(this.allExercises.filter((exercise) => exercise.isActive === true), 'filter');
            this.filteredExercises = this.allExercises.filter((exercise) => exercise.isActive === true);
        } else if (show === 'inactive') {
            this.updateShowing(this.allExercises.filter((exercise) => exercise.isActive === false), 'filter');
            this.filteredExercises = this.allExercises.filter((exercise) => exercise.isActive === false);
        } else if (show === 'favorites') {
            this.updateShowing(this.allExercises.filter((exercise) => exercise.isFavorite === true), 'filter');
            this.filteredExercises = this.allExercises.filter((exercise) => exercise.isFavorite === true);
        } else if (show === 'non-favorites') {
            this.updateShowing(this.allExercises.filter((exercise) => exercise.isFavorite === false), 'filter');
            this.filteredExercises = this.allExercises.filter((exercise) => exercise.isFavorite === false);
        } else {
            this.updateShowing(this.allExercises, 'filter')
            this.filteredExercises = this.allExercises;
        }
        this.filterOption = show;
    }

    @action setOpen = (openTab: TabType): void => {
        if (this.openTab === openTab) {
            this.openTab = '';
        } else {
            this.openTab = openTab;
        }
    }
}
