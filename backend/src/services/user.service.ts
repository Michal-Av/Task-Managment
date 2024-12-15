import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
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
  
  export async function getAllUsersUC(): Promise<any> {
    return await getAllUsers();
  }
  
  export async function getUserUC(params: { id: string }): Promise<any> {
    const { id } = params;
    return await getUser(id);
  }
  