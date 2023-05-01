# ENVIRONMENT VARIABLES

-   This file contains setup rules for the environment variables of this Project.
-   All the environemnt variable are stored in `.env.local` file, which is not tracked by Git, **you need to manually create this file**.
-   The keys of those variables are stored in `.env.example` file, for referencing purpose.
-   For working with the environment variables, you have to create your own by following the given steps.
-   ⚠️ Never keep any environment variables inside `.env.example` since it's tracked by Git and the history stays forever in VCS, instead always use `env.local`.

## Table of Contents

-   **[SERVER: ](#server)**
    -   [CONNECTION_URL](#connection_url)
    -   [USER](#user)
    -   [PASS](#pass)
    -   [BASE_URL](#base_url)
    -   [TOKEN_SECRET](#token_secret)
-   **[CLIENT: ](#client)**
    -   [REACT_APP_CLIENT_ID](#react_app_client_id)

## SERVER

All the references to the environment variables of Server is stored in _[server/.env.example](../server/.env.example)_

-   ### CONNECTION_URL

    -   Go to [Mongo DB Atlas](https://www.mongodb.com/cloud) and create an account for free.
    -   Create a new Project.
    -   Build a new Database using M0 configuration as it is FREE.
    -   Add Username, password, Current IP address and finish creating the database.
    -   Click on Connect and Select Drivers option.
    -   Copy the Connection URL, it might look like this:  
        `mongodb+srv://username:<password>@cluster0.abcdefg.mongodb.net/?retryWrites=true&w=majority`
    -   Paste it in .env.local corresponding to the variable name

-   ### USER

    -   This email account will be used to send reset password links.
    -   You can use your own email or create a new Email ID for this specific puropse.

-   ### PASS

    -   Read this [article](https://community.nodemailer.com/using-gmail) to generate an app specific password for the above email account.

-   ### BASE_URL

    -   This variable is used to determine the domain of the client for appending it in the beginnning of the passwoed reset link.
    -   The 2 possible options are already given in `.env.example`

-   ### TOKEN_SECRET

    -   Used to encode the JWT token for authenticaltion
    -   Any random string can be a TOKEN_SECRET

## CLIENT

All the references to the environment variables of Client is stored in _[client/.env.example](../client/.env.example)_

-   ### REACT_APP_CLIENT_ID

    -   This variable is used for Google SignIn authentication.
    -   Log into [Google Cloud Platform](https://console.cloud.google.com)
    -   Create a **new Project** By Clicking on the dropbox in top Left corner
    -   Click Create Credentials.
    -   Select OAuth Client ID.
    -   Configure Consent Screen.
    -   Select External Users.
    -   Continue the rest and create OAuth Credentials.
    -   Use the OAuth Client ID genrerated for this variable.
