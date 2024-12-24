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

export async function updateUserPassword(email: string, newPasswordHash: string): Promise<UserDocument | null> {
    // Update user's password in the database
    return await UserModel.findOneAndUpdate({ email }, { password: newPasswordHash });
}

export async function updateUserStatus(_id: string, status: string): Promise<UserDocument | null> {
    return await UserModel.findOneAndUpdate(
        { _id },
        { $set: { status } },
        { new: true, upsert: false } // Update existing only, no upsert
    );
}

export async function getUserByEmail(email: string): Promise<UserDocument | null> {
    return await UserModel.findOne({ email });
}
