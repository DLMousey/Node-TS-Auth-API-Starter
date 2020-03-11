import { getManager, Repository } from "typeorm";
import { validate } from "class-validator";
import bcrypt from "bcrypt";

import { User } from "../entities/user.entity";
import EntityValidationFailureError from "./../errors/EntityValidationFailureError";

export class UserService {

    private readonly userRepo: Repository<User>;

    constructor() {
        this.userRepo = getManager().getRepository(User);
    }

    public async find(id: number): Promise<User> {
        return this.userRepo.findOne(id);
    }

    public async findByEmail(email: string): Promise<User> {
        return this.userRepo.findOne({
            where: {
                email
            }
        });
    }

    public async create(user: User): Promise<User> {
        const errors = await validate(user);
        if (errors.length > 0) {
            throw new EntityValidationFailureError("Validation failed", errors);
        }

        const password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));

        user.password = password;

        await this.userRepo.create(user);
        await this.userRepo.save(user);

        return user as User;
    }

    public async validateCredentials(email: string, password: string): Promise<boolean> {
        const user: User = await this.userRepo.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return false;
        }

        return await bcrypt.compare(password, user.password);
    }
}
