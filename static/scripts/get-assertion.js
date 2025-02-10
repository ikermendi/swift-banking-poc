/**
 * Swift API Sandbox 2.0 - Setup - Generate Token - Pre-request Script.
 * 
 * Version: 3.0
 */

// ----- Utility Functions -----

/**
 * Generate a JTI (not technically a secure random but good enough for non-prod)
 * @returns {string} Secure random JTI
 */
function generateSecureJTI() {
  let newJti = "";
  let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 12; i++) {
    newJti += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return newJti;
}

const sandboxPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC9k/gqzUpzvXMo
8nVVxZfhYT7cNbTix+yz0tiOoIUwKvLokou9kI5wQbS0bNtQERpvstP/CjyKuSJ8
yRM7JivgTUZL8QutIDnjnml/+Q77oiDxPKCzigunOPJ180azo0SX/Rug8MjAfE8i
YC3zrsguJpBtnMoSQX8COV1yPBfTa3jDSZ3Y8LrD3Plz6+c/1vfYmzsI1s2lxIhp
qthe6Hyk+7KXs7AwrXXd9AsT26DNJaBFrJqqPbuCFJtWgefriQBAyQpuHDEGKOrY
k01Zf3wZBVN36KlBXII0VecEkkiAd1UtcSpt8XD/aJQm5SZP7fuxI30AMAO3i1SY
/OahDAuRAgMBAAECggEBAIrwSj4cTMd8fkzxPVtKQGC2o5pCZjqaqXi1O290Z4iA
wZv/4xhgPHQ7Q5PEAAuzLTvVxRcyymIlAwiPWV/NPvTZzX5Uv+j3KFYQwGNBBmEX
VqtWcrSCpL2+t7wIOrXnH5uAreIK9iZUNK8N7D+exilErC8ZbONqSwo3Pqw9LH0O
EP0QnrdiXTcyLKoO4mOHKr0xKlKPL95GMBJv49qaaVu1YiDx7Oq5pZPkWfYS01yu
k2oomVsXbNUiOVmJXIriqUoSKsE6etFUm9AM2BjH1Kk0wOKsu5Jpc/fdkO6Tz644
uu7nIJp+oTyP1fYI0Y2aIcG5LJFL/2cNlefB0p9Hz5ECgYEA3b9rFiOvC+tMHr4r
rk2YFCOduiV9hAB7/7TjId8/ePYygAthjF+/sgL6cr18o5kdK/yFTlyMgprSb7Pl
4EqF86i62MJk8jSflJRoYfftqCN57n28Z/SKNCVkEG7o6Tpwji203zsTbjxeuXEn
e60qJn8SIGZ2OMvULEADS/4JMsUCgYEA2tx2TiUq+XYhnsjl80sFz2zClCrypHF1
47itLdvkfwVooEMerjgiPzPBXu6kUAmnx7imQNnoKceLmmWdojib4gUtXTl6n3oi
eCUXRHITopaTBWIjx3wSI5Uw7eF8ayHjO0Gqe9+PTkObEdvnccY3O9LKgoqeKgLW
KsltL6DD0l0CgYEA1yquVkU5zW775bjR2cghESmeGsnWCQgPSgfTfUKK7Gy4g9aH
SRZ/g9OwATYsgvJHhC77ixXyoahpGUqOfBzT7aKD62B1Yy/8yMdYofdY/BWwcuI+
twBqOj8t4WQ9TFIQdWWUZCeGqyiZIYfSsAdPJxuWEypY/LOLpYRXrp1Jf6ECgYEA
0ZqkXvDvuFwvlK+YsqneFap2q4p6OY1EN2SNzsayjgfzDNFbV8UA34DEqBNrIBAv
NHKeHqvS0fh+tc6t6kfG2u7UZF0BGCzTSDdVkkKilWsZwOUdmRY1FQj0BE6YZs3c
nsqj6ODRkUXkBHWTsf4AtfWJ5v20vk1bKT0hqaSRBi0CgYALldsijmjapH58psSe
7irTjE9fDYjlUtyHFSsV4DJ5q0EFN9uG9dLsXfoMY75mgAslE6/DdHuQkTf/DVe4
O2eCS3EYqa+TmxduF3VLeIqBanYpeyshy+T8hwRe2ofD2AV4igb4zkBZjWNXfaWL
SMSCfzhQD7I6I/VOqyd3cqZvEg==
-----END PRIVATE KEY-----`;

const sandboxCertificate = `MIIDqTCCApGgAwIBAgIUAT3MDEXQcHr/CRS5/VEdlCvWmK4wDQYJKoZIhvcNAQEL
BQAwZDELMAkGA1UEBhMCR0IxDzANBgNVBAgMBkxvbmRvbjEPMA0GA1UEBwwGTG9u
ZG9uMQ0wCwYDVQQKDAREZW1vMSQwIgYDVQQDDBtkZW1vLXN3aWZ0LXNhbmRib3gt
Y29uc3VtZXIwHhcNMjUwMTI0MTExMTI1WhcNMzUwMTIyMTExMTI1WjBkMQswCQYD
VQQGEwJHQjEPMA0GA1UECAwGTG9uZG9uMQ8wDQYDVQQHDAZMb25kb24xDTALBgNV
BAoMBERlbW8xJDAiBgNVBAMMG2RlbW8tc3dpZnQtc2FuZGJveC1jb25zdW1lcjCC
ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL2T+CrNSnO9cyjydVXFl+Fh
Ptw1tOLH7LPS2I6ghTAq8uiSi72QjnBBtLRs21ARGm+y0/8KPIq5InzJEzsmK+BN
RkvxC60gOeOeaX/5DvuiIPE8oLOKC6c48nXzRrOjRJf9G6DwyMB8TyJgLfOuyC4m
kG2cyhJBfwI5XXI8F9NreMNJndjwusPc+XPr5z/W99ibOwjWzaXEiGmq2F7ofKT7
spezsDCtdd30CxPboM0loEWsmqo9u4IUm1aB5+uJAEDJCm4cMQYo6tiTTVl/fBkF
U3foqUFcgjRV5wSSSIB3VS1xKm3xcP9olCblJk/t+7EjfQAwA7eLVJj85qEMC5EC
AwEAAaNTMFEwHQYDVR0OBBYEFIzooI+eOXfcp2hu3INDN3o77faTMB8GA1UdIwQY
MBaAFIzooI+eOXfcp2hu3INDN3o77faTMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZI
hvcNAQELBQADggEBAG3YgyvqMkG6RWCU2WHbVLZXb21UedCN6Aj5sW0HKsOxotZk
n2/0/PhU7qvauy6WUYAycoiWc60AjJ1z+69+9sjWIOOctvcuHrZ1LOHXWaocdyUC
0dkfkYrFsFX1MVgd8Hf7tSQdqVsS+4t6mmW9ZmSAPB8fXMX9uswItNXT9bvFDmMu
zDLvWDcOr5/Qs0IEAPC6LFiQCorH9jwmg3RlIMHimDQrhQ10VLT/1/wJM3aM06Lt
jmlvoX7pClDK3XMJrZiv3fp0SzruB2iMHCNoSZ1SXYeAE8XFXBKyf8a92l4ljsZK
7iGXp27wlxq2l8SOTcL/9n4KUjiEGF5hjhq+J04=`;
/**
 * Convert a PEM-formatted key to an ArrayBuffer.
 * @param {string} pem - The PEM string.
 * @returns {ArrayBuffer} The ArrayBuffer representation.
 */
function pemToArrayBuffer(pem) {
  console.log('Converting PEM to ArrayBuffer');
  const b64Lines = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, '');
  console.log('Base64 lines:', b64Lines);
  const binaryString = atob(b64Lines);
  console.log('Binary string:', binaryString);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  console.log('ArrayBuffer:', bytes.buffer);
  return bytes.buffer;
}

/**
 * Base64url-encode a string.
 * @param {string} input - The input string.
 * @returns {string} The base64url encoded string.
 */
function base64UrlEncode(input) {
  return btoa(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Base64url-encode an ArrayBuffer.
 * @param {ArrayBuffer} buffer - The ArrayBuffer to encode.
 * @returns {string} The base64url encoded string.
 */
function base64UrlEncodeBuffer(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncode(binary);
}

/**
 * Import a PEM-formatted private key for use with the Web Crypto API.
 * @param {string} pemKey - The PEM-formatted private key.
 * @returns {Promise<CryptoKey>} A promise that resolves with the CryptoKey.
 */
async function importPrivateKey(pemKey) {
  const keyBuffer = pemToArrayBuffer(pemKey);
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Web Crypto API is not available in this environment.");
  }
  return crypto.subtle.importKey(
    "pkcs8",
    keyBuffer,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: { name: "SHA-256" }
    },
    false,
    ["sign"]
  );
}

// ----- JWT Creation -----

/**
 * Create JWT with configurable parameters.
 * @param {Object} options - JWT generation options.
 * @returns {Promise<string>} Generated JWT.
 */
async function createJWT(options) {
  const {
    privateKey,
    certificate,
    consumerKey,
    audience = 'sandbox.swift.com/oauth2/v1/token',
    subject = 'CN=demo-swift-sandbox-consumer, O=Demo, L=London, S=London, C=GB',
    expirationTime = 900, // 15 minutes
  } = options;

  console.log('Creating JWT with options:', options);

  const currentTime = Date.now();
  const issuedAt = Math.ceil(currentTime / 1000) - 1;
  const payload = {
    iss: consumerKey,
    aud: audience,
    sub: subject,
    jti: generateSecureJTI(),
    exp: Math.ceil((currentTime + expirationTime * 1000) / 1000),
    iat: issuedAt,
    nbf: issuedAt
  };

  console.log('JWT payload:', payload);

  const header = {
    typ: 'JWT',
    alg: 'RS256',
    x5c: [certificate.replace(/\s+/g, '')]
  };

  console.log('JWT header:', header);

  // Build the JWT signing input
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  console.log('JWT signing input:', signingInput);

  // Import the private key
  const cryptoKey = await importPrivateKey(privateKey);

  console.log('Private key imported successfully');

  // Sign the JWT using RSASSA-PKCS1-v1_5 with SHA-256
  const encoder = new TextEncoder();
  const data = encoder.encode(signingInput);
  const signatureBuffer = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    cryptoKey,
    data
  );
  const encodedSignature = base64UrlEncodeBuffer(signatureBuffer);

  console.log('JWT signature:', encodedSignature);

  return `${signingInput}.${encodedSignature}`;
}

/**
 * Main execution function.
 * Fetches the security credentials from the sandbox server, creates the JWT,
 * and (in this example) logs it to the console.
 */
export async function generateJWT(consumerKey) {
  try {
    // Fetch credentials from the sandbox server
    // const { privateKey, certificate } = await fetchSecurityCredentials(server);

    const privateKey = sandboxPrivateKey;
    const certificate = sandboxCertificate;

    // Create the JWT using the fetched credentials and hardcoded consumer key
    const jwt = await createJWT({
      privateKey,
      certificate,
      consumerKey
    });

    // In Postman these would be stored in collection variables.
    // Here we log the final JWT and its payload (JTI portion) to the console.
    console.log('JWT generated successfully');
    console.log('sandbox-dynamic-jwt:', jwt);
    console.log('jti:', jwt.split('.')[1]); // the payload portion (base64url encoded)

    return jwt;
  } catch (error) {
    console.error('JWT generation failed:', error);
    throw error;
  }
}
