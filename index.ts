import { BunyanLogger, getLogger, setLogger } from '@raincatcher/logger';
import { createRouter, FileMetadata, FileStorage, GridFsStorage } from './src/index';

// Create express middleware
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

const app = express();
setLogger(new BunyanLogger({ name: 'Filestore example', level: 'debug' }));

// If you wish to see logs;
process.env.DEBUG = 'fh-mbaas-api:sync';

let mongodbConnectionString;
if (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD && process.env.MONGODB_SERVICE_PORT) {
  // Openshift/Kubernetes
  mongodbConnectionString = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_SERVICE_PORT}/filestore`;
} else {
  getLogger().error('Missing mongo configuration: MONGODB_USER, MONGODB_PASSWORD, MONGODB_SERVICE_PORT');
}

// middleware
app.use(bodyParser.json());
app.use(cors());

const engine: FileStorage = new GridFsStorage(mongodbConnectionString);
const router = createRouter(engine);

app.use('/', router);
app.listen(3000, function() {
  getLogger().info('Server listening on port 3000!');
});

