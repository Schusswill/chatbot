import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import {Program} from "./Program";
import {Faculty} from "./Faculty";


export enum degreetype {
    AS   = "AS",
    BS   = "BS",
    BA   = "BA",
    AA   = "AA",
    CERT = "certificate"
}

@Entity()
export class Study {

    @PrimaryGeneratedColumn({type: "int", unsigned: true})
    @ManyToMany(type => Faculty)
    @JoinTable({
      name: "study_has_faculty",
      joinColumn: {
            name: "study_idstudy",
            referencedColumnName: "idstudy"
        },
      inverseJoinColumn: {
            name: "faculty_idfaculty",
            referencedColumnName: "idfaculty"
        }
    })
    idstudy: Faculty[];
  
    @Column({type: "enum", enum: degreetype, 
             nullable: false, default: null})
    type: degreetype;
  
    @Column({type: "varchar", width: 45,
            nullable: false, default: null})
    @ManyToOne(type => Program, program => program.name)
    name: Program;
  
    @Column({type: "int", width: 10, unsigned: true,
            nullable: false, default: null})
    program: number;

}