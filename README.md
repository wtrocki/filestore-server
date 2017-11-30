# FileStore template

Server-side [express](https://expressjs.com/) module to support file uploads from the `@raincatcher/filestore-client` module.

## Running

    ts-node ./example/index.ts

## Usage

In order to include this module in an existing express application, use the `createRouter` function and supply an implementation of the `FileStorage` interface.

```typescript
import { createRouter, FileStorage, GridFsStorage } from '@raincatcher/filestore';

//...

const storage: FileStorage = new GridFsStorage(mongoDbConnectionUrl);
expressApp.use('/file', createRouter(storage));
```

## FileStorage Interface

The `FileStorage` is an interface that should be implemented in order to supply an alternative place for file data to be transferred to, based on manipulating [NodeJS Streams](https://nodejs.org/api/stream.html) to allow storage and retrieval of the uploaded binary data.

## Implementations

The [current implementations](./src/impl/) support:

- GridFS (MongoDB's API for storing larger files - GridFsStorage)
- Amazon S3 (S3Storage)
- Local file storage (LocalStorage)

See individual storage implementations for the list of required parameters.

