import {Entity, PrimaryColumn, Column, Index} from "typeorm";



@Entity()
@Index(["subject","number"], { unique: true })
export class Course {

    @PrimaryColumn({type: "varchar", width: 45,
                   nullable: false, default: null})
    subject: string;
  
    @PrimaryColumn({type: "int", width: 250,
                   nullable: false, default: null})
    number: number;
  
    @Column({type: "text",
            nullable: false, default: null})
    name: string;
  
    @Column({type: "text",
            nullable: false, default: null})
    description: string;
  
    //add goal set type

}