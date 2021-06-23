import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity("tags")
class Tag {
    @PrimaryColumn()
    readonly ID: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.ID) {
            this.ID = uuid()
        }
    }
}

export { Tag };