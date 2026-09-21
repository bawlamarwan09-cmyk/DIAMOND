import { requireChatGPTUser } from "../chatgpt-auth";

export async function requireCatalogOwner(returnTo: string) {
  const user = await requireChatGPTUser(returnTo);
  return user.email.toLowerCase() === "bawlamarwan09@gmail.com";
}
