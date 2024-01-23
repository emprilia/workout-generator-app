import React from 'react';
import { observer } from 'mobx-react-lite';
import { MainLoaderWrapper, MainLoader, MainEmojiWrapper } from './Loader.style';

interface LoaderAppPropsType {
    isSignedUp?: boolean;
}

export const LoaderApp = observer((props: LoaderAppPropsType) => {
    const { isSignedUp } = props;

    return (
        <MainLoaderWrapper>
            {isSignedUp ? 'Setting you up...' : 'Loading your workout...'}
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
