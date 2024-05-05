import { observer } from 'mobx-react-lite';
import { MainLoaderWrapper, MainLoader, MainEmojiWrapper, AppLogoWrapper } from './Loader.style';

interface LoaderAppPropsType {
    isSignedUp: boolean;
    createdExercisesCount?: number;
    initialExercisesCount?: number;
}

export const LoaderApp = observer((props: LoaderAppPropsType) => {
    const { isSignedUp } = props;

    return (
        <MainLoaderWrapper>
            <AppLogoWrapper />
            {isSignedUp ? <>
                Hang on! I'm setting up your account...
                (it will take less than a minute!)</> : <>
                Loading your workout...
            </>}
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
