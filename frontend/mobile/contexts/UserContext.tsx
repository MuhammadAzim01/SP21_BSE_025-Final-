import React, { createContext, useContext, useState, ReactNode, Component } from 'react';
import { View, Text } from 'react-native';
import { Role } from '../constants/constants';

export const UserContext = createContext<UserContextType | null>(null);

export type UserT = {
    name: string,
    email: string,
    phone: string
}

export type UserContextType = {
    userDetails: UserT,
    initializeData: (token: string) => Promise<void>,
    updateUserDetails: (token: string, userData: Partial<UserT>) => Promise<void>
}

type UserContextProviderProps = {
    children: ReactNode
}

export class UserContextProvider extends Component<UserContextProviderProps, { userDetails: UserT }> {
    constructor(props: UserContextProviderProps) {
        super(props);
        this.state = {
            userDetails: {
                name: "",
                email: "",
                phone: "",
            }
        };
    }

    initializeData = async (token: string) => {
        try {
            const response = await fetch("http://10.0.2.2:8000/api/user/me", {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();

            this.setState({
                userDetails: {
                    name: responseData['name'],
                    email: responseData['email'],
                    phone: responseData['phone']
                }
            });
        } catch (err) {
            console.log("Error while initializing data", err);
        }
    }

    updateUserDetails = async (token: string, userData: Partial<UserT>) => {
        try {
            const response = await fetch("http://10.0.2.2:8000/api/user/me/", {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            this.setState({
                userDetails: {
                    name: responseData['name'],
                    email: responseData['email'],
                    phone: responseData['phone']
                }
            });
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    render() {
        const { children } = this.props;
        const { userDetails } = this.state;

        return (
            <UserContext.Provider value={{ userDetails, initializeData: this.initializeData, updateUserDetails: this.updateUserDetails }}>
                {children}
            </UserContext.Provider>
        );
    }
}


export const useUserContext = (): UserContextType => {
    const value = useContext(UserContext);

    if (!value) {
        throw new Error("This component is not under Context Provider");
    }

    return value;
}
