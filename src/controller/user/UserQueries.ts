import UserModelDto from "@/dto/modeldto/UserModelDto";

export async function createUserMutation(dto: UserModelDto) {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(dto),
      headers: { "Content-Type": "application/json" },
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.statusMessage);
    return body.body;
  } catch (error) {
    throw error;
  }
}
