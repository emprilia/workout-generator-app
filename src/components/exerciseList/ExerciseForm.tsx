import React from 'react';
import { observer } from 'mobx-react-lite';
import { ExerciseFormState } from './ExerciseFormState';
import { ExerciseType } from '../../api/supabaseExercises';
import { ExerciseFormWrapper, ExerciseFormFieldsWrapper, ExerciseInputWrapper, ExerciseFormHeader, OverlayWrapper } from './ExerciseForm.style';
import { ImgUpload } from '../imgUpload/ImgUpload';
import { Input } from '../input/Input';
import { Checkbox } from '../checkbox/Checkbox';
import { Button } from '../button/Button';
import { BackButton } from './ExerciseList.style';

interface ExerciseFormPropsType {
    exercise?: ExerciseType;
    isEditMode: boolean;
    getExerciseList: () => Promise<void>;
    closePopup: () => void;
    userId: string;
}

export const ExerciseForm = observer((props: ExerciseFormPropsType) => {
    const { exercise, isEditMode, getExerciseList, closePopup, userId } = props;
    const [exerciseFormState] = React.useState(() => new ExerciseFormState(exercise ?? null, getExerciseList, closePopup, userId));

    const {
        label,
        isBothSides,
        setBothSides,
        isActive,
        setActive,
        isFavorite,
        setFavorite,
        onImgChangeCB,
        handleCreateExercise,
        handleUpdateExercise,
        isClearImgForm,
        onClearFormCB,
        setClosePopup
    } = exerciseFormState;

    return (
        <>
            <OverlayWrapper onClick={setClosePopup} />
            <ExerciseFormWrapper>
                <ExerciseFormHeader>{isEditMode ? 'EDIT EXERCISE' : 'CREATE NEW EXERCISE'}</ExerciseFormHeader>
                <ExerciseInputWrapper>
                    <Input
                        placeholder='Exercise name'
                        stateValue={label}
                    />
                </ExerciseInputWrapper>
                <ExerciseFormFieldsWrapper>
                    <ImgUpload
                        previewSize='56'
                        editImgUrl={exercise?.imgUrl}
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
                            label='Set as active'
                            isChecked={isActive}
                            onChange={setActive}

                        />
                    </div>
                </ExerciseFormFieldsWrapper>
                <Button width='full' onClick={isEditMode ? handleUpdateExercise : handleCreateExercise}>
                    {isEditMode ? 'UPDATE EXERCISE' : 'CREATE EXERCISE'}
                </Button>
            </ExerciseFormWrapper>
            <BackButton onClick={setClosePopup}>Back to all exercises</BackButton>
        </>
  );
});
