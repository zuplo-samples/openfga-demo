# Zuplo + OpenFGA Sample

This sample demonstrates how to use Zuplo + OpenFGA (or Okta FGA) to perform authorizations on an API in the gateway.


## API Keys

This sample uses API keys. The API key metadata is used to determine the organization the key belongs. When creating the API key set the metadata as follows.

```json
{
  "organization": "acme"
}
```