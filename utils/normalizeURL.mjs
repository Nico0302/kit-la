const COMBINING = /[\u0300-\u036F]/g;

export function normalizeURL(url) {
  
  return url.replace(/\s/g, '-').replace('ß', 'ss').toLowerCase().normalize('NFKD').replace(COMBINING, '');
}

export function pageResolver(name) {
    const image = wikiLinkTransclusionFormat(name)[1];
    let heading = "";
    if (!image && !name.startsWith("#") && name.match(/#/)) {
        [, heading] = name.split("#");
        name = name.replace(`#${heading}`, "");
    }
    return image ? [`assets/${name}`] : [normalizeURL(name.replace('Module/LA1', ''))];
}

function wikiLinkTransclusionFormat(extension) {
    const transclusionFormats = [
      /\.jpe?g$/,
      /\.a?png$/,
      /\.webp$/,
      /\.avif$/,
      /\.gif$/,
      /\.svg$/,
      /\.bmp$/,
      /\.ico$/,
      /\.pdf$/,
    ];
  
    const supportedFormat = extension.match(
      transclusionFormats.filter((r) => extension.match(r))[0]
    )[0];
    const strippedExtension = extension.match(/\.[0-9a-z]{1,4}$/gi);
  
    if (!supportedFormat)
      return [false, strippedExtension && strippedExtension[0].replace(".", "")];
  
    return [true, supportedFormat.replace(".", "")];
  }