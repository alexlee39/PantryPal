interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    instructions: string;
    createdDate: string;
    updatedDate?: string;
}

interface AuthContextType{
    user : any,
    isAuthenticated: boolean,
    loading : boolean,
    login: (email: string, password: string) => Promise<boolean | void>;
    signup: (email: string, password: string) => Promise<boolean | void>;
    logout: () => Promise<void>;
}

interface ErrorFormProps{
    message: string
}

interface ButtonProps{
    name?: string,
    href: string
}