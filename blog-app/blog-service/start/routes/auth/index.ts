import Route from '@ioc:Adonis/Core/Route';

export default function AuthRoutes() {
    const path = "AuthController";
    Route.group(() => {
        Route.post("/sign_up", `${path}.signUp`);
        Route.post("/sign_in", `${path}.signIn`);
        Route.post("/sign_out", `${path}.signOut`).middleware('auth:any');

        // user can only access when user is not verified
        Route.post("/verify_email/send_code", `${path}.verifyEmailSendCode`).middleware("auth:no_verify");
        Route.post("/verify_email/verify_code", `${path}.verifyEmailVerifyCode`).middleware("auth:no_verify");
    }).prefix('/auth')
}       