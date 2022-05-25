# Encrypted-Access-Control

Encrypted access control uses proxy re-encryption to grant access to encrypted data stored on google cloud. It comprises of:

- EAC server: http server which support REST APIs for interacting with google cloud and proxy server.
- eac : CLI tool for encrypting data and making REST call to the express server.

## EAC Server

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
- `save` : send encrypted data to the server for it be stored in google cloud. arguments
    - `data` : location of encrypted data
    - on success it returns `uid` of the data stored on the cloud
    - Example : `eac save --data ./data/hello`
- `list-data` : list of the `uids` of data stored by the user
    - returns `uids`
    - Example : `eac list-data`
- `grant-access` : grant access to an user, arguments
    - `pub` : public key of the recipient.
    - `id` : uid of the data.
    - Example : `enc grant-access --id <data_uid> --pub <pub_of_recipient>`
- `list-access` : get list of public key to which access it been given for a data. Arguments
    - `id` : uid of the data
    - Return, list of public keys
    - Example : `eac list-access --id <uid_of_data>`
- `view-data` : recipient user calls this command to view the content of the data
    - `id` : uid of the data
    - Return, original message
    - Example: `eac view-data --id <udi_of_data>`
