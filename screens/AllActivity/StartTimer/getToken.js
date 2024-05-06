import React from 'react';
import * as GoogleSignIn from 'expo-auth-session/providers/google';

const getToken = () => {
    const iosKey =
        "860210111844-7f56c79ti04is1ld9juuhhb2mhlf4olq.apps.googleusercontent.com";
    const androidkey =
        "860210111844-mkvdh1hlg762mm3fms4vnbgiahje7pd2.apps.googleusercontent.com";
    const webClientExpoKey =
        "860210111844-b9qc0fi6hm6s82vs1n8ksf07u00b4k7p.apps.googleusercontent.com";

    const [req, res, promptAsync] = GoogleSignIn.useAuthRequest({
        androidClientId: androidkey,
        iosClientId: iosKey,
        webClientId: webClientExpoKey,
        clientId: webClientExpoKey,
        expoClientId: webClientExpoKey,
        scopes: [
            "https://www.googleapis.com/auth/fitness.activity.read",
            "https://www.googleapis.com/auth/fitness.location.read",
        ],
    });

    return { promptAsync };
};

export default getToken;
