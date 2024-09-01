const { createHelia, globSource, ipns } = require("helia");
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
      const keys = await helia.libp2p.keychain.listKeys();

      _key = keys.find((k) => k.name === key);
      if (!_key) {
        _key = await helia.libp2p.keychain.createKey(key, {
          type: "rsa",
          size: 2048,
        });

        if (verbose) console.log(`Created IPNS key ${JSON.stringify(_key)}`);
      }

      const peerId = await helia.libp2p.keychain.exportPeerId(_key.name)

      const name = ipns(helia, [
        // configure routings here
      ])

      await name.publish(peerId, cid)
    }

    return {
      cid: cid.toString(),
      ipfs: cid.toString(),
      ipns: _key && PeerId.parse(_key.id).toB58String(),
    };
  },
};
