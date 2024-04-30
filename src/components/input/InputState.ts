import { observable, action, computed, makeAutoObservable } from 'mobx';

export type ValidationFunction = (value: string) => string | null;

class InputModel {
    @observable public value: string;
    @observable public error: string | null = null;
    constructor(initialValue: string) {
        makeAutoObservable(this);
        this.value = initialValue;
    }
    public updateValue(newValue: string): void {
        this.value = newValue;
    }
    @action public setError(error: string | null): InputModel {
        this.error = error;
        return this;
    }
    @action public clearError(): void {
        this.error = null;
    }
}

export class InputState {
    private readonly inputModel: InputModel;
    @observable public validations: ValidationFunction[] = [];

    constructor(initialValue: string) {
        this.inputModel = new InputModel(initialValue);
    }

    public setValue(newValue: string): void {
        this.inputModel.updateValue(newValue);
        this.validate();
    }

    public checkError(validationFn: ValidationFunction): InputState {
        this.validations.push(validationFn);
        return this;
    }

    @action public validate = (): void => {
        for (const validation of this.validations) {
            const error = validation(this.inputModel.value);
            if (error) {
                this.inputModel.setError(error);
                return;
            }
        }
        this.inputModel.clearError();
    }

    @computed public get error(): string | null {
        return this.inputModel.error;
    }

    @computed public get value(): string {
        return this.inputModel.value;
    }
}
