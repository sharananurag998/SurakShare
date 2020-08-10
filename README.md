# SurakShare

A P2P files sharing app for Android made using React Native.

## Folder Structure

    .
    ├── routes                   # All app navigation and routing files are placed here
    ├── screens                  # Different app screens are placed here
    ├── shared                   # Files for shared components (eg. header) are placed here
    ├── styles                   # External stylesheets are placed here
    ├── assets                   # Static assets (eg. images) are placed here

## Setup

#### - React Native

- Set up the react native development environment: [React Native Docs](https://reactnative.dev/docs/environment-setup).

#### - install packages

`npm install` make sure the postinstall script is also executed, it runs by default on most environments: `npm run postinstall` .

### prerequisites:

#### - truffle

- Install: `npm install -g truffle`
- Build contract abi and bytecode: `truffle compile`

#### - textile&#46;io

- Installation: download and install the latest Hub CLI binary for your platform from the [latest releases](https://github.com/textileio/textile/releases/latest).
- Unix distribution includes an install script: `./install`
- Initialize accout: `hub init` follow the on-terminal instructions and verify email.
- Share your email credentials in the official group channel and your account will be added to the `SurakShare textile org`.

#### - environment variables

- Edit the `.env` file to include:
  - `USER_API_KEY` - shared in the offical group channel.
  - `TEST_WALLET_ADDRESS`- funded with sufficient ether.
  - `CONTRACT_ADDRESS` - `0x12FA8Ec7300f3f8C2A4b1cD41901DdEA70D80B16`
