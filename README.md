# Encrypted-Access-Control

Encrypted access control uses proxy re-encryption to grant access to encrypted data stored on google cloud. It comprises of:

- EAC server: http server which support REST APIs for interacting with google cloud and proxy server.
- eac : CLI tool for encrypting data and making REST call to the express server.

## EAC Server

HTTP server written using express.js, supporting following endpoints

- `POST /data` : store encrypted data on the google cloud
    - Body : `{"data" : "<base64_encoded_data>"}`
- `GET /data` : get uids of the the data stored.
- `GET /data/{id}/access` : get public key of the users who has access to a give data.
- `POST /data/{id}/grant_access` : grant access to a public key
    - Body : `{"pub_key" : "pub_key_of_recipient"}`
- `GET /data/{id}` : get data for a given uid

## EAC CLI

### CLI configuration

private key stored on user's device are provided in a form of configuration to the cli. cli configuration is a yaml file containing following details.

```yaml
key_location: <location_of_prv_pub_key>
eac_server: <address_of_eac_server>
```

location of configuration can be provided using:
- argument : `--config <location_of_the_config.yaml>`
- or environment variable : `EAC_CONFIG=<location_of_the_config.yaml>`

### CLI Commands

- `gen` : generates private-public key pair. Arguments
    - `output` : output location of public and private keys
    - Example: `eac gen --output config.json`
    - example of `config.json` : `{"prv" : "priv_key", "pub": "pub_key"}`
- `enc` : encrypts message provide to it using the private key of the user and return data. it will take arguments:
    - `msg` : string message to be encrypted
    - `output` : location of output file
    - Example: `eac enc --msg "hello this Encrypted-Access-Control" --output ./data/hello`
- `grant-access` : grant access to an user, arguments
    - `pub` : public key of the recipient.
    - `id` : uid of the data.
    - Example : `enc grant-access --id <data_uid> --pub <pub_of_recipient>`
- `view-data` : recipient user calls this command to view the content of the data
    - `id` : uid of the data
    - Return, original message
    - Example: `eac view-data --id <udi_of_data>`
