"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
/* 따로 설정하지 않았으면 3000 port를 사용한다. */
const port = 80;
const app = new app_1.Server().app;
app.set('port', port);
app.listen(app.get('port'), () => {
    console.log(`
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
//# sourceMappingURL=server.js.map