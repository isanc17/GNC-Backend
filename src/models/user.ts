import * as bcrypt from 'bcrypt';

export interface UserAttr {
    id: number;
    name: string;
    email: string;
    password?: string;
    status: number;
    department_id: number;
    createdAt: Date;
}

export interface UserCreationAttr extends Omit<UserAttr, "id" | "status" | "createdAt" > {
    password: string;
}

export class User {
    public id!: number;
    public name!: string;
    public email!: string;
    public password?: string;
    public department_id!: number;
    public status!: number;
    public createdAt!: Date;

    public static async create(userData: UserCreationAttr): Promise<User> {
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.department_id = userData.department_id;
        user.status = 1;
        
        await user.setPassword(userData.password);
        
        user.createdAt = new Date();
        return user;
    }

    public async setPassword(plainPassword: string): Promise<void> {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(plainPassword, salt);
    }

    public async validPassword(password: string): Promise<boolean> {
        if (!this.password) return false;
        return bcrypt.compare(password, this.password);
    }

    public toJSON(): Omit<UserAttr, 'password'> {
        const { password, ...safeData } = this;
        return safeData;
    }
}