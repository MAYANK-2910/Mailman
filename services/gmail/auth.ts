const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

let authState: AuthState = {
  token: null,
  isAuthenticated: false,
};

export async function authenticate(interactive: boolean = true): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive }, (token) => {
      if (chrome.runtime.lastError) {
        authState = { token: null, isAuthenticated: false };
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!token) {
        authState = { token: null, isAuthenticated: false };
        reject(new Error('No token received'));
        return;
      }
      authState = { token, isAuthenticated: true };
      resolve(token);
    });
  });
}
