
### Zero Knowledge Salary Equality

A zero-knowledge proof application built on Aleo that enables women to anonymously compare salaries and bridge the gender pay gap.

## Problem Statement
Women often face challenges in salary negotiations due to lack of transparency and fear of discrimination. This application provides a secure, private way to compare salaries and gain insights for better negotiation.

## Solution
Using zero-knowledge proofs on Aleo, women can:
- Submit their salary data privately
- Compare against industry averages
- Get proof of pay discrepancy without revealing personal data
- Contribute to aggregate statistics anonymously


# React + Aleo + Leo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/AleoHQ/sdk/tree/testnet3/create-aleo-app/template-react)


This template provides a minimal setup to get React and Aleo working in Vite
with HMR and some ESLint rules.

This template includes a Leo program that is loaded by the web app located in
the `helloworld` directory.

Note: Webpack is currently used for production builds due to a
[bug](https://github.com/vitejs/vite/issues/13367) with Vite related to nested
workers.

### Start in development mode

```bash
npm run dev
```

Your app should be running on http://localhost:5173/

### Build Leo program

1. Copy the `helloworld/.env.example` to `helloworld/.env` (this will be ignored
   by Git):

   ```bash
   cd helloworld
   cp .env.example .env
   ```

2. Replace `PRIVATE_KEY=user1PrivateKey` in the `.env` with your own key (you
   can use an existing one or generate your own at https://aleo.tools/account)

3. Follow instructions to install Leo here: https://github.com/AleoHQ/leo

4. You can edit `helloworld/src/main.leo` and run `leo run` to compile and update the
   Aleo instructions under `build` which are loaded by the web app.

## Deploy program from web app

> [!WARNING]  
> This is for demonstration purposes or local testing only, in production applications you
> should avoid building a public facing web app with private key information

Information on generating a private key, seeding a wallet with funds, and finding a spendable record can be found here
if you are unfamiliar: https://developer.aleo.org/testnet/getting_started/deploy_execute_demo

Aleo programs deployed require unique names, make sure to edit the program's name to something unique in `helloworld/src/main.leo`, `helloworld/program.json`, rename `helloworld/inputs/helloworld.in` and rebuild.




```

We've included a `_headers` file that works with some web hosts (e.g. Netlify)
but depending on your host / server setup you may need to configure the headers
manually.
