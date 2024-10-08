const { createHelia, globSource } = require("../helia-cjs");
const PeerId = require("peer-id");
const last = require("it-last");
const fsPath = require("path");

module.exports = {
  name: "IPFS",
  builder: async (options) => {
    const { host, port, protocol, timeout, headers } = options;

    return createHelia({ host, port, protocol, timeout, headers });
  },
  upload: async (api, options) => {
    const { path, pattern, pin, timeout, key, verbose } = options;
    const { cid } = await last(
      api.addAll(globSource(fsPath.dirname(path), pattern), {
        pin,
        timeout,
      })
    );

    if (!cid) throw new Error("Content hash is not found.");

    let _key;
    if (key) {
      const keys = await api.key.list();

      _key = keys.find((k) => k.name === key);
      if (!_key) {
        _key = await api.key.gen(key, {
          type: "rsa",
          size: 2048,
        });

        if (verbose) console.log(`Created IPNS key ${JSON.stringify(_key)}`);
      }

      await api.name.publish(cid, { key });
    }

    return {
      cid: cid.toString(),
      ipfs: cid.toString(),
      ipns: _key && PeerId.parse(_key.id).toB58String(),
    };
  },
};