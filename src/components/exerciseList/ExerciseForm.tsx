import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExerciseFormState } from './ExerciseFormState';
import { ExerciseFormWrapper, ExerciseFormFieldsWrapper, ExerciseInputWrapper, ExerciseFormHeader } from './ExerciseForm.style';
import { ImgUpload } from '../imgUpload/ImgUpload';
import { Input } from '../input/Input';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';

export const ExerciseForm = observer(() => {
    const [exerciseFormState] = React.useState(() => new ExerciseFormState());

    const {
        label,
        isBothSides,
        setBothSides,
        isSelected,
        setSelected,
        isFavorite,
        setFavorite,
        onImgChangeCB,
        handleCreateExercise,
        isClearImgForm,
        onClearFormCB
    } = exerciseFormState;

    return (
        <>
            <ExerciseFormWrapper>
                <ExerciseFormHeader>CREATE NEW EXERCISE</ExerciseFormHeader>
                <ExerciseInputWrapper>
                    <Input
                        placeholder='Exercise name'
                        stateValue={label}
                    />
                </ExerciseInputWrapper>
                <ExerciseFormFieldsWrapper>
                    <ImgUpload
                        previewSize='56'
                        isClearImgForm={isClearImgForm}
                        onChangeCB={onImgChangeCB}
                        onClearFormCB={onClearFormCB}
                    />
                    <div>
                        <Checkbox
                            label='Done on both sides'
                            isChecked={isBothSides}
                            onChange={setBothSides}
                        />
                        <Checkbox
                            label='Add to favorites'
                            isChecked={isFavorite}
                            onChange={setFavorite}
                        />
                        <Checkbox
                            label='Add to selected'
                            isChecked={isSelected}
                            onChange={setSelected}

                        />
                    </div>
                </ExerciseFormFieldsWrapper>
                <Button width='full' onClick={handleCreateExercise}>
                    CREATE EXERCISE
                </Button>
            </ExerciseFormWrapper>
        </>
  );
});
