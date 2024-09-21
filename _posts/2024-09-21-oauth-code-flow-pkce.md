---
layout: post
title: "Tackling the PKCE Puzzle in Robot Framework API Testing"
date: 2024-09-21 14:25 +0200
categories: Keycloak Oauth Robot-Framework Test-Automation
tags: oauth keycloak pkce authorization-flow robot-framework test-automation python
image:
  path: /assets/img/headers/pkce-keycloak.webp
---
## The Security Upgrade & the Testing Headache

Testing APIs secured with the PKCE flow using Robot Framework and libraries like REST or the RequestsLibrary can be quite challenging. PKCE, designed primarily for browser-based interactions, poses compatibility issues with traditional API testing tools.

##  Stumbling Upon a Solution

After some head-scratching and digging around, a collegue stumbled upon a blog post by Stefaan Lippens ([https://www.stefaanlippens.net/oauth-code-flow-pkce.html](https://www.stefaanlippens.net/oauth-code-flow-pkce.html)) that offered a glimmer of hope. He provided a Python script to handle the PKCE flow with Keycloak 7. With some tweaks to the regex, I was able to adapt the script to work with Keycloak 25, our current version. 

## Sharing the Solution

In the following sections, I'll delve into the Python script that helped me successfully implement the PKCE flow within Robot Framework. I'll provide the adapted code and explain its inner workings.

Hopefully, this post saves fellow testers some frustration and empowers them to seamlessly test their secure APIs with Robot Framework. 

## The Python Script

```python
import base64
import hashlib
import html
import json
import os
import re
import urllib.parse
import requests
```
Importing essential libraries for base64 encoding/decoding, hashing, HTML handling, JSON parsing, file operations, regular expressions, URL parsing, and making HTTP requests.

```python
provider = "https://<YOUR_URL>/auth/realms/<YOUR_REALM>"
client_id = "<CLIENT_ID>"
username = "<USERNAME>"
password = "<PASSWORD>"
redirect_uri = "http://localhost/foobar"
```
Defining key variables, including the authorization server URL, client ID, user credentials, and the redirect URI used in the OAuth flow.  Remember to replace the placeholders (<YOUR_URL>, <YOUR_REALM>, <CLIENT_ID>, <USERNAME>, <PASSWORD>) with your actual values when implementing this script.

```python
code_verifier = base64.urlsafe_b64encode(os.urandom(40)).decode('utf-8')
code_verifier = re.sub('[^a-zA-Z0-9]+', '', code_verifier)
code_verifier, len(code_verifier)
```

Generates a code verifier using `os.urandom` for secure random bytes. Encodes it using URL-safe base64 and removes any non-alphanumeric characters using regex. Finally, prints the code verifier and its length for verification.

```python
code_challenge = hashlib.sha256(code_verifier.encode('utf-8')).digest()
code_challenge = base64.urlsafe_b64encode(code_challenge).decode('utf-8')
code_challenge = code_challenge.replace('=', '')
code_challenge, len(code_challenge)
```

Computes the code challenge by hashing the code verifier using SHA-256. Encodes the hash using URL-safe base64, removes padding characters ('='), and prints the code challenge and its length.

```python
state = "fooobarbaz"
resp = requests.get(
    url=provider + "/protocol/openid-connect/auth",
    params={
        "response_type": "code",
        "client_id": client_id,
        "scope": "openid",
        "redirect_uri": redirect_uri,
        "state": state,
        "code_challenge": code_challenge,
        "code_challenge_method": "S256",
    },
    allow_redirects=False
)
resp.status_code
```

Initiates the authorization request by sending a GET request to the authorization endpoint with the necessary parameters including 'code_challenge' (computed earlier), 'state' for security, and 'code_challenge_method' set to 'S256'. Redirects are disabled to capture the intermediate response. Finally, the status code of the response is retrieved.

```python
cookie = resp.headers['Set-Cookie']
cookie = '; '.join(c.split(';')[0] for c in cookie.split(', '))
cookie
```

Extracts the 'Set-Cookie' header from the response, parses it to keep only the essential cookie name-value pairs, and formats them into a semicolon-separated string for further use in requests.

```python
page = resp.text
form_action = html.unescape(re.search('"loginAction": "(.*?)"', page, re.DOTALL).group(1))
form_action
```

Extracts the login form action URL from the HTML response using regular expressions. The `html.unescape` function ensures any HTML entities are properly decoded.

```python
resp = requests.post(
    url=form_action, 
    data={
        "username": username,
        "password": password,
    }, 
    headers={"Cookie": cookie},
    allow_redirects=False
)
resp.status_code
```

Submits the login form using a POST request to the extracted `form_action` URL. Includes user credentials and the previously obtained cookie in the request headers. Redirects are again disabled to capture the response. The status code of this response is then retrieved.

```python
redirect = resp.headers['Location']
redirect
```

Extracts the 'Location' header from the response, which contains the redirect URL after successful login. This URL will be used to obtain the authorization code.

```python
assert redirect.startswith(redirect_uri)
```

Verifies that the redirect URL starts with the expected `redirect_uri` to ensure the flow is proceeding as intended.

```python
query = urllib.parse.urlparse(redirect).query
redirect_params = urllib.parse.parse_qs(query)
redirect_params
```

Parses the query parameters from the redirect URL using `urllib.parse`. The `urlparse` function extracts the query string, and `parse_qs` converts it into a dictionary where keys are parameter names and values are lists of corresponding values.

```python
auth_code = redirect_params['code'][0]
auth_code
```

Extracts the authorization code from the parsed query parameters. The authorization code is essential for the next step in the OAuth flow, exchanging it for an access token.

```python
resp = requests.post(
    url=provider + "/protocol/openid-connect/token",
    data={
        "grant_type": "authorization_code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "code": auth_code,
        "code_verifier": code_verifier,
    },
    allow_redirects=False
)
resp.status_code
```

Exchanges the obtained authorization code for an access token by sending a POST request to the token endpoint. Includes necessary parameters like 'grant_type', 'client_id', 'redirect_uri', 'code', and 'code_verifier'. Redirects are disabled, and the status code of the response is retrieved to check if the token exchange was successful.

```python
result = resp.json()
result
```

Parses the JSON response from the token endpoint, which should contain the access token and potentially other information like refresh token and token expiration time. The `result` variable now holds a Python dictionary representing the parsed JSON data.

```python
def _b64_decode(data):
    data += '=' * (4 - len(data) % 4)
    return base64.b64decode(data).decode('utf-8')
```

Defines a helper function `_b64_decode` to handle base64 decoding. It adds padding characters ('=') if necessary to ensure the input data has the correct length for decoding, then decodes it using base64 and returns the result as a UTF-8 string.

```python
def jwt_payload_decode(jwt):
    _, payload, _ = jwt.split('.')
    return json.loads(_b64_decode(payload))
```

Defines a function `jwt_payload_decode` to extract and decode the payload from a JWT (JSON Web Token). It splits the JWT into its header, payload, and signature parts, decodes the base64-encoded payload using the `_b64_decode` helper function, and parses the decoded payload as JSON, returning the resulting Python dictionary.

```python
print(jwt_payload_decode(result['access_token']))
```

Decodes and prints the payload of the obtained access token using the `jwt_payload_decode` function. This allows you to inspect the claims and information embedded within the access token.

```python
print(jwt_payload_decode(result['id_token']))
```

Decodes and prints the payload of the obtained ID token using the `jwt_payload_decode` function. This allows you to inspect the claims and user information embedded within the ID token.

## Wrapping It Up
Hopefully, this Python script and the accompanying breakdown make the process of obtaining an access token for API testing with Robot Framework using PKCE and Keycloak a bit smoother. Remember to replace the placeholders in the code with your actual Keycloak configuration details.

Happy testing!