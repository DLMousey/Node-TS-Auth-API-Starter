import { getManager, Repository } from "typeorm";
import { RefreshToken } from "../entities/refresh-token.entity";
import { User } from "../entities/user.entity";

export class RefreshTokenService {

    private readonly refreshTokenRepo: Repository<RefreshToken>;

    constructor() {
        this.refreshTokenRepo = getManager().getRepository(RefreshToken);
    }

    public async findAllByUser(user: User): Promise<RefreshToken[]> {
        return this.refreshTokenRepo.find({
            where: {
                owner: user
            }
        });
    }
}
