import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.refreshTokens)
    owner: User;

    @Column()
    code: string;

    @Column()
    userAgent: string;

    @Column()
    identifier: string;

    @Column({
        default: false
    })
    revoked: boolean;

    @Column()
    expiresAt: Date;

    @Column({
        nullable: true,
        default: null
    })
    revokedAt: Date;

    @Column({
        nullable: true,
        default: null
    })
    lastUsedAt: Date;

    @Column()
    createdAt: Date;
}
