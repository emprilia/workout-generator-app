import { observer } from 'mobx-react-lite';
import { MainLoaderWrapper, MainLoader, MainEmojiWrapper } from './Loader.style';

interface LoaderAppPropsType {
    isSignedUp: boolean;
    createdExercisesCount?: number;
    initialExercisesCount?: number;
}

export const LoaderApp = observer((props: LoaderAppPropsType) => {
    const { isSignedUp, createdExercisesCount, initialExercisesCount } = props;

    return (
        <MainLoaderWrapper>
            {isSignedUp ?
                <>
                    Setting you up...
                    <div>Creating exercise {createdExercisesCount} out of {initialExercisesCount}</div>
                </> : 'Loading your workout...'
            }
            <MainLoader>
                <MainEmojiWrapper>🏋🏻‍♀️</MainEmojiWrapper>
                <MainEmojiWrapper>🚴🏻</MainEmojiWrapper>
                <MainEmojiWrapper>💃</MainEmojiWrapper>
                <MainEmojiWrapper>🏃🏼</MainEmojiWrapper>
                <MainEmojiWrapper>💪🏻</MainEmojiWrapper>
                <MainEmojiWrapper>🤸🏼</MainEmojiWrapper>
                <MainEmojiWrapper>🧘🏻‍♀️</MainEmojiWrapper>
                <MainEmojiWrapper>🏇</MainEmojiWrapper>
                <MainEmojiWrapper>🤾🏽</MainEmojiWrapper>
            </MainLoader>
        </MainLoaderWrapper>
    );
});
