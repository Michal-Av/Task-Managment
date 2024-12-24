import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    getUserByEmail,
    updateUserPassword,
    updateUserStatus
  } from '../data-access/user.da';
  
  export async function createUserUC(body: any): Promise<any> {
    return await createUser(body);
  }
  
  export async function deleteUserUC(params: { id: string }): Promise<any> {
    const { id } = params;
    return await deleteUser(id);
  }
  
  export async function updateUserUC(params: { id: string }, body: any): Promise<any> {
    const { id } = params;
    return await updateUser(id, body);
  }

  export async function updateUserStatusUC(id: string, status: string): Promise<any> {
    return await updateUserStatus(id, status);
  }
  
  export async function getAllUsersUC(): Promise<any> {
    return await getAllUsers();
  }
  
  export async function getUserUC(params: { id: string }): Promise<any> {
    const { id } = params;
    return await getUser(id);
  }

  export async function getUserByEmailUC(email: string): Promise<any> {
    return await getUserByEmail(email);
}

  export async function updateUserPasswordUC(email: string, pass: string): Promise<any> {
    return await updateUserPassword(email, pass);
}
  