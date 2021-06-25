import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Expose } from 'class-transformer'

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

    @Expose({name: 'name_custom'}) //expor entidade com o nome, criar uma nova nao referenciada na tabela
    nameCustom(): string {
        return `#${this.name}`
    }

    constructor() {
        if(!this.ID) {
            this.ID = uuid()
        }
    }
}

export { Tag };