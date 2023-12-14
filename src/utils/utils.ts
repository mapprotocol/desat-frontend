import { signIn, signInPrepare } from "@/api";

export function ellipsizeString(str: string, frontChars: number, backChars: number) {
  if (str.length > frontChars + backChars) {
    return str.substring(0, frontChars) +
      '...' +
      str.substring(str.length - backChars);
  }
  return str;
}

export function formatDate(timestamp: string | number | Date) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const signInFun = async () => {
  let resPre = await signInPrepare({
    address: window.unisat._selectedAddress
  })
  let signature = await window.unisat.signMessage(resPre.data.sign_message)
  let pubkey = await window.unisat.getPublicKey();
  let singInRes = await signIn({
    address: window.unisat._selectedAddress,
    pubkey: pubkey,
    signature
  })
  localStorage.setItem('accessToken', singInRes.data.access_token);
  localStorage.setItem('address', window.unisat._selectedAddress);

  localStorage.setItem('at_expires', singInRes.data.at_expires);
} 