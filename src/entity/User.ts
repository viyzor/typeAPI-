import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    constructor(username: string, password: string, id: number) {
        this.username = username;
        this.password = password;
        this.id = id;
    }
    @BeforeInsert()
    private async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}