import UserModel, { UserDocument } from '../models/user.model';

export async function getAllUsers(): Promise<UserDocument[]> {
    return await UserModel.find();
}

export async function getUser(id: string): Promise<UserDocument | null> {
    return await UserModel.findById(id);
}

export async function createUser(input: any): Promise<UserDocument> {
    return await UserModel.create(input);
}

export async function deleteUser(id: string): Promise<UserDocument | null> {
    return await UserModel.findByIdAndDelete(id);
}

export async function updateUser(id: string, input: any): Promise<UserDocument | null> {
    return await UserModel.findByIdAndUpdate(id, input, { new: true });
}
