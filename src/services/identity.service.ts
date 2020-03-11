import { User } from "../entities/user.entity";
import { getManager, Repository } from "typeorm";

export interface UserIdentity {
    email: string;
    username: string;
    id: number;
}

export class IdentityService {

    private static instance: IdentityService;

    private static identity: UserIdentity;

    private constructor() {}

    public static GetInstance(): IdentityService {
        if (!IdentityService.instance) {
            IdentityService.instance = new IdentityService();
        }

        return IdentityService.instance;
    }

    public setIdentity(user: UserIdentity): void {
        IdentityService.identity = user;
    }

    public getIdentity(): UserIdentity {
        return IdentityService.identity;
    }

    public async getUser(): Promise<User> {
        const userRepo: Repository<User> = getManager().getRepository(User);
        return await userRepo.findOne(this.getIdentity().id);
    }

}
