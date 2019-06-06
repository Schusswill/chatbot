import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Times} from "./Times";

//need to add days set


@Entity()
export class Faculty {

    @PrimaryGeneratedColumn({type: "int", unsigned: true})
    @OneToMany(type => Times, times => times.faculty_idfaculty)
    idfaculty: Times[];
  
    @Column({type: "text",
            nullable: false})
    firstname: string;
  
    @Column({type: "text",
            nullable: false})
    lastname: string;
  
    @Column({type: "text",
            nullable: true})
    location: string;
  
    @Column({type: "text",
            nullable: true})
    department: string;
  
    @Column({type: "text",
            nullable: true})
    title: string;
  
    @Column({type: "bigint", unsigned: true,
            nullable: true})
    phone: BigInt;
  
    @Column({type: "text",
            nullable: true})
    email: string;
  

}