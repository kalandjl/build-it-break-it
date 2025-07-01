
export const setToken = (accessToken: string) => {

    window.localStorage.setItem("accessToken", accessToken)
}