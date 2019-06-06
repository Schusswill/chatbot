import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from "typeorm";
import {Program} from "./Program";
import {Faculty} from "./Faculty";



@Entity()
export class Pathway {

    @PrimaryGeneratedColumn({type: "int", unsigned: true})
    @ManyToMany(type => Faculty)
    @JoinTable({
      name: "pathway_has_advisor",
      joinColumn: {
            name: "pathway_idpathway",
            referencedColumnName: "idpathway"
        },
      inverseJoinColumn: {
            name: "faculty_idfaculty",
            referencedColumnName: "idfaculty"
        }
    })
    idpathway: Faculty[];
  
    @Column({type: "varchar", width: 45,
            nullable: false, default: null})
    @OneToMany(type => Program, program => program.pathway)
    name: Program[];
  
    @Column({type: "varchar", width: 45,
            nullable: false, default: null})
    url: string;
  
    @Column({type: "varchar", width: 45,
            nullable: false, default: null})
    img_url: string;

}