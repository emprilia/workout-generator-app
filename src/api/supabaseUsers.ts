import { supabase } from "./supabase";
import { AuthError, Session } from '@supabase/supabase-js';

export const isUserAuth = async (): Promise<Session | null> => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session === null) {
        return null;
    } else {
        return session;
    }
}

export const signUpUser = async (userEmail: string, userPassword: string): Promise<Session | null> => {
    const { data: { session }, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword
    })

    if (error) {
        return null;
        // TODO: error handling
    }

    return session;
}

export const signInUser = async (userEmail: string, userPassword: string): Promise<Session | null> => {
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
    });

    if (error) {
        return null;
        // TODO: error handling
    }

    if (session) {
        return session;
    }

    return null;
};

export const signOutUser = async (): Promise<boolean | AuthError> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        return error;
        // TODO: error handling
    }

    return true;
};

// TODO: reset password
