export interface LoginResponse {
    data: {
      token: string;
      email: string;
      name: string;
      role: string;
    };
    success: boolean;
    message: string;
    errors: string[];
}  