import { XzReadableStream } from "xzwasm";
import tarball from "tarballjs";
import { decompress } from "bz2";
import { ungzip } from "pako";

const bz2Decompress = (data) => {
  // hmmmmm, the bz2 library has strange exports depending on the environment...  :-/
  if (typeof window !== "undefined") {
    return window.bz2.decompress(new Uint8Array(data));
  } else {
    return decompress(new Uint8Array(data));
  }
};

export default async function reader({ data, name }) {
  while (typeof data !== "string") {
    // xz archive
    if (name.match(/\.xz$/i)) {
      const stream = new ReadableStream({
        start: (controller) => {
          controller.enqueue(new Uint8Array(data));
          controller.close();
        }
      });

      const decompressedResponse = new Response(
        new XzReadableStream(stream)
      );

      data = new Uint8Array(await decompressedResponse.arrayBuffer());
      name = name.replace(/\.xz$/i, "");
    } else if (name.match(/\.bz2$/i)) {
      data = bz2Decompress(data);
      name = name.replace(/\.bz2$/i, "");
    } else if (name.match(/\.gz$/i)) {
      data = ungzip(new Uint8Array(data));
      name = name.replace(/\.gz$/i, "");
    } else if (name.match(/\.tar$/i)) {
      const tarReader = new tarball.TarReader();
      tarReader.readArrayBuffer(data.buffer);
      return tarReader.getTextFile("YaST2/y2log");
    } else {
      const decoder = new TextDecoder("utf-8");
      return decoder.decode(data);
    }
  }

  return data;
}
