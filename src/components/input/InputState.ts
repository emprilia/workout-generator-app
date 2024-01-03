import { observable, computed, makeAutoObservable } from 'mobx';

class InputModel<T> {
    @observable public value: T;

    constructor(initialValue: T) {
        makeAutoObservable(this);
        this.value = initialValue;
    }

    public updateValue(newValue: T): void {
        this.value = newValue;
    }
}

export class InputState<K> {
    private readonly inputModel: InputModel<K>;

    constructor(initialValue: K) {
        this.inputModel = new InputModel(initialValue);
    }

    public setValue(newValue: K): void {
        this.inputModel.updateValue(newValue);
    }

    @computed public get value(): K {
        return this.inputModel.value;
    }
}
