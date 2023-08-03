import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store/hooks/hooks';
import * as actions from "./actions";
import { AddCommentPayload, CommentState } from './types';

export const useBlogs = () => {
    const dispatch = useAppDispatch();
    const state = useSelector((state: any) => state.blogs) as CommentState;
    const addComment = (payload: AddCommentPayload) => dispatch(actions.addComment(payload));
    
    return {
        state,
        addComment
    }
}