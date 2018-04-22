import * as express from 'express';
import chalk from 'chalk';
import { Server } from './app';

const port: number = 80;
const app: express.Application = new Server().app;
app.set('port', port);
app.listen(app.get('port'), () => {
	console.log(chalk.rgb(0, 153, 255)`
  **********************************************************************************************************************************                                                             
    tf        tf    tf                  tftftftftftf    tftftftftftf    tftftftftftf   tf        tf   tftftftftftf    tftftftftftf
    tf        tf    tf                  tf              tf              tf        tf   tf        tf   tf              tf        tf
    tf        tf    tf                  tf              tf              tf        tf   tf        tf   tf              tf        tf
    tftftftftftf    tftftttftftf        tftftftftftf    tftftftftftf    tftftftftftf    tf      tf    tftftftftftf    tftftftftftf
    ft        tf    tf        tf                  tf    tf              tf   tf.         tf    tf     tf              tf   tf.
    ft        tf    tf        tf                  tf    tf              tf     tf.        tf  tf      tf              tf     tf.
    ft        tf    tftftftftftf        tftftftftftf    tftftftftftf    tf       tf.       tftf       tftftftftftf    tf       tf.
  **********************************************************************************************************************************                                  
      `);
	console.log('H6 server listening on port ' + port);
}).on('error', err => {
	console.error(err);
});