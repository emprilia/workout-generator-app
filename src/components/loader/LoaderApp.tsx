import React from 'react';
import { observer } from 'mobx-react-lite';
import { EmojiWrapper, Loader, LoaderWrapper } from './Loader.style';

interface LoaderAppPropsType {
    isSignedUp: boolean;
}

export const LoaderApp = observer((props: LoaderAppPropsType) => {
    const { isSignedUp } = props;

    return (
        <LoaderWrapper>
            {isSignedUp ? 'Setting you up...' : 'Loading your workout...'}
            <Loader>
                <EmojiWrapper>🏋🏻‍♀️</EmojiWrapper>
                <EmojiWrapper>🚴🏻</EmojiWrapper>
                <EmojiWrapper>💃</EmojiWrapper>
                <EmojiWrapper>🏃🏼</EmojiWrapper>
                <EmojiWrapper>💪🏻</EmojiWrapper>
                <EmojiWrapper>🤸🏼</EmojiWrapper>
                <EmojiWrapper>🧘🏻‍♀️</EmojiWrapper>
                <EmojiWrapper>🏇</EmojiWrapper>
                <EmojiWrapper>🤾🏽</EmojiWrapper>
            </Loader>
        </LoaderWrapper>
    );
});
