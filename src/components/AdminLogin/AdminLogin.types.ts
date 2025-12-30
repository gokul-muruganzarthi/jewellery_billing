export interface LoginFormData {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface AdminLoginProps {
    onSubmit?: (formData: LoginFormData) => void;
    onNavigateToSignup?: () => void;
    onNavigateToForgotPassword?: () => void;
}

