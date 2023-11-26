export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    if (parts !== undefined) {
      return ((parts).pop() as string).split(";").shift();
    }
  }
  return "";
}
