const toChars = (value: string) => value.split('').map((char) => char.charCodeAt(0));
const toHex = (value: number) => (`0${Number(value).toString(16)}`).slice(-2);

const getSalt = (fallback = '') => process.env.CRYPTO_JS_SALT ?? fallback;

export const snHash = {
  encode: (text: unknown, salt = '') => {
    const source = typeof text === 'object' ? JSON.stringify(text) : String(text);
    const saltChars = toChars(getSalt(salt));

    return source
      .split('')
      .map((char) => char.charCodeAt(0))
      .map((code) => saltChars.reduce((acc, current) => acc ^ current, code))
      .map(toHex)
      .join('');
  },

  decode: (encoded: string, salt = '') => {
    const saltChars = toChars(getSalt(salt));

    return encoded
      .match(/.{1,2}/g)
      ?.map((hex) => Number.parseInt(hex, 16))
      .map((code) => saltChars.reduce((acc, current) => acc ^ current, code))
      .map((charCode) => String.fromCharCode(charCode))
      .join('') ?? '';
  },
};
