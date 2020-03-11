import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MinLength } from "class-validator";
import { RefreshToken } from "./refresh-token.entity";

export interface IUserViewModel {
    username: string;
    email: string;
    createdAt: Date;
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(1)
    username: string;

    @Index({ unique: true })
    @Column()
    @MinLength(1)
    @IsEmail()
    email: string;

    @Column()
    @MinLength(8)
    password: string;

    @Column({
        default: null,
        nullable: true
    })
    firstName: string;

    @Column({
        default: null,
        nullable: true
    })
    lastName: string;

    @OneToMany(type => RefreshToken, refreshToken => refreshToken.owner)
    refreshTokens: RefreshToken[];

    @Column({
        default: new Date()
    })
    createdAt: Date;

    @Column({
        default: null,
        nullable: true
    })
    updatedAt: Date;

    @Column({
        default: null,
        nullable: true
    })
    deletedAt: Date;

    public static ToViewModel(user: User): IUserViewModel {
        return {
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }
    }
}
