import { supabase } from './supabase';
import { AuthError, Session } from '@supabase/supabase-js';

interface ResponseType {
    session: Session | null;
    error: Error | null;
}

export const isUserAuth = async (): Promise<Session | null> => {
    const { data: { session } } = await supabase.auth.getSession();

    return session;
};

export const signUpUser = async (userEmail: string, userPassword: string): Promise<ResponseType> => {
    const response: ResponseType = { session: null, error: null };

    const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword
    });

    if (error) {
        response.error = error;
    } else {
        response.session = data.session;
    }

    return response;
};

export const signInUser = async (userEmail: string, userPassword: string): Promise<ResponseType> => {
    const response: ResponseType = { session: null, error: null };

    const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
    });

    if (error) {
        response.error = error;
    } else {
        response.session = data.session;
    }

    return response;
};

export const signOutUser = async (): Promise<AuthError | null> => {
    const { error } = await supabase.auth.signOut();

    return error;
};

// TODO: reset password
