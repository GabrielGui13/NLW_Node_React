import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from "uuid"

/* "experimentalDecorators": true,
"emitDecoratorMetadata": true, em tsconfig.json
"strictPropertyInitialization": false, */

@Entity("users") //define a tabela referenciada
class User {
    @PrimaryColumn()
    readonly id: string; //propriedade de leitura apenas

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
       if(!this.id) { //null, undefined ou ""
          this.id = uuid();
       } 
    }
}

export { User };
