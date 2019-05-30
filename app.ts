import express = require('express');
import cors = require('cors');
import { ORIGIN } from './constants/origin';

const expressApp = express();

(function () {
	expressApp.use(express.json({ limit: '10mb' }));
	expressApp.use(express.urlencoded({ extended: false }));
	expressApp.use(cors({ credentials: true, origin: ORIGIN, optionsSuccessStatus: 200 }));
	expressApp.listen(3000);

})();
